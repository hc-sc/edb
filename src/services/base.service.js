//TODO: add comments for the file
'use strict';

const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const Q = require('bluebird');
const _ = require('lodash');

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const PicklistService = require('./picklist.service');
const SchemaLoader = require('../models/mongoose.schema.loader');
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');
const BACKEND_CONST = require('../constants/backend');

module.exports = class BaseService {
  constructor(modelClassName, inmem, version) {
    this.modelClassName = modelClassName;
    this.inmem = inmem;
    this.version = version ? version : '01.00.00';
  }

  edb_get(obj) {
    return new Q((res, rej) => {
      let self = this;
      let query = obj ? (obj ? obj : {}) : {};
      let entityClass;

      try {
        entityClass = require('mongoose').model(self.modelClassName);

        entityClass
          .find(query, (err, rows) => {
            if (err)
              rej(new RVHelper('EDB10000', err));
            else
              res(new RVHelper('EDB00000', rows));
          });
      } catch (err) {
        rej(new RVHelper('EDB13001'));
      }
    });
  }

  edb_put(obj) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      if (obj && typeof obj === 'object') {
        entityClass = require('mongoose').model(self.modelClassName);
        if (!entityClass) 
          rej(new RVHelper('EDB13001'));
        else {
          entityClass
            .create(obj, (err, rows) => {
              if (err)
                rej(new RVHelper('EDB10000', err));
              else
                res(new RVHelper('EDB00000', rows));
            });
        }
      } else {
        rej(new RVHelper('EDB11004', obj));
      }
    });
  }

  edb_delete(id) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      if (id && typeof id === 'string') {
        try {
          entityClass = require('mongoose').model(self.modelClassName);

          entityClass
            ._remove_status(id, (err, rows) => {
              if (err)
                rej(new RVHelper('EDB10000', err));
              else
                res(new RVHelper('EDB00000', rows));
            });
        } catch (err) {
          rej(new RVHelper('EDB13001'));
        }
      } else {
        rej(new RVHelper('EDB11005', id));
      }
    });
  }

  edb_post(obj) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      if (obj && typeof obj === 'object' && obj.hasOwnProperty('_id')) {
        try {
          entityClass = require('mongoose').model(self.modelClassName);

          entityClass
            .update(obj, (err, rows) => {
              if (err)
                rej(new RVHelper('EDB10000', err));
              else
                res(new RVHelper('EDB00000', rows));
            });
        } catch (err) {
          rej(new RVHelper('EDB13001'));
        }
      } else {
        rej(new RVHelper('EDB11006', obj));
      }
    });
  }

  jsonObjClassifierFromXml(obj, picklistInst) {
    return new Q((res, rej) => {
      let self = this;
      let entities = obj;
      let entityClass, retVal;
      let picklistII = picklistInst ? picklistInst : new PicklistService();
      let tdb; // = new TingoDBWrap(self.dbName),
      let rows;

      if (self.modelClassName) {
        try {
          //          entityClass = moduleClasses[self.modelClassName];
        } catch (err) {
          rej(new RVHelper('EDB10000', err));
        }
      }

      if (entities && entities.constructor === Array) {
        // let processAry = [];
        // retVal = [];
        // entities.map(item => {
        //   processAry.push(self._save(self._remove_status(item, self.modelClassName, entityClass, picklistII)));
        // });
        // /*      for (var i = 0; i < entities.length; i++) {
        //         let item = yield self._save(self._remove_status(entities[i], self.modelClassName, entityClass, picklistII));
        //         if (item.code !== 'EDB00000') {
        //           retVal = item;
        //           return retVal;
        //         } else if (item.data.length === 0) {
        //           continue;
        //         } else 
        //           retVal.push(item.data[0]);
        //       }*/
        // //      retVal = yield processAry;
        // return retVal;
      } else if (entities && typeof entities === 'object') {
        // //      retVal = yield self._save(self._remove_status(entities, self.modelClassName, entityClass, picklistII));
        // return retVal;
        rows = tdb.consum(entities).next().value;
        rows
          .then(result => {
            console.log(result);
          });

      } else if (entities) {
        // //      entities = yield self._save(entities);
        // return entities;
      } else {
        rej(new RVHelper('EDB11007', obj));
      }

    });
  }

  /*  _save(obj) {
      let entity = obj,
        db_entity, self = this;
      db_entity = yield self.edb_get({
        data: entity
      });
      if (db_entity.code === 'EDB00000' && db_entity.data.length === 1) {
        return db_entity;
      } else {
        db_entity = yield super.edb_put(entity);
        if (db_entity.code === 'EDB00000' && db_entity.data.length === 1) {
          entity = yield self.edb_get({
            data: db_entity.data[0]
          });
          return entity;
        }
      }
    }
  */
  _remove_status(obj, mcn, cls, pkli) {
    let retVal = {};
    if (mcn && cls) {
      retVal = new cls();
      retVal.jsonObjClassifierFromXml(obj, pkli);
    } else {
      retVal = obj;
    }
    delete retVal.METADATA_STATUS;
    return retVal;
  }

  initFromXSD(standardname) {
    return new Q((res, rej) => {
      let self = this, data;
      let filename = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.STANDARD_DIR_NAME, standardname.endsWith('.xsd') ? standardname : standardname + '.xsd');

      let dbmodel = require('mongoose').model(self.modelClassName);

      global.modulesInMemory[this.modelClassName.toLowerCase()] = [];

      if (dbmodel) {
        try {
          data = fs.readFileSync(filename, {
            encoding: 'utf8'
          });
          xml2js.parseString(data, {
            attrkey: 'attr$',
            explicitArray: false
          }, (err, obj) => {
            if (err)
              rej(new RVHelper('EDB10000', err));

            const COMPLEX_TYPES = obj['xs:schema']['xs:complexType'].map(type => {
              return type['xs:simpleContent']['xs:extension'].attr$.base;
            });

            for (const item of obj['xs:schema']['xs:simpleType']) {
              const INDEX = COMPLEX_TYPES.indexOf(item.attr$.name);
              const OTHER_VALUE = self.getOtherValue();

              for (const enumeration of item['xs:restriction']['xs:enumeration']) {
                const APP_INFO = enumeration['xs:annotation']['xs:appinfo'];
                if (enumeration.attr$.value !== OTHER_VALUE) {

                  let type = {};

                  type.TYPE_NAME = INDEX >= 0 ?
                    `EXTENSION_${item.attr$.name}` : item.attr$.name;
                  type.value = enumeration.attr$.value;
                  type.valuedecode = APP_INFO.DECODE;
                  type.status = APP_INFO.STATUS;
                  type.isExt = false;
                  dbmodel.create(type, (err, result) => {
                    if (err)
                      rej(new RVHelper('EDB10000', err));
                    else
                      global.modulesInMemory[self.modelClassName.toLowerCase()].push(result);
                  });
                }
              }
            }
            res(new RVHelper('EDB20001', `${global.modulesInMemory[self.modelClassName.toLowerCase()].length} added.`));
          });
        } catch (err) {
          rej(new RVHelper('EDB10000', err));
        }
      } else {
        rej('EDB13001');
      }
    });
  }

  static edb_getSync(obj) {
    let retVal = [];
    let classname = this.prototype.constructor.name;
    classname = classname.slice(0, classname.indexOf('Service')).toLowerCase();
    if (!global.modulesInMemory[classname])
      return new RVHelper('EDB10002');
    else
      retVal = _.filter(global.modulesInMemory[classname], obj);
    return retVal;
  }

  initMongoose() {
    return new Q((res, rej) => {
      let self = this;
      try {
        let jschema = SchemaLoader.loadSchema(self.modelClassNamePre + '.' + self.modelClassName, self.version);
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;
        let mschema = new Schema(jschema);
        mschema.plugin(ServiceLevelPlugin, { url: self.modelClassName.toLowerCase() });
        let mmodule = mongoose.model(self.modelClassName, mschema);
        mmodule.find({})
          .then(result => {
            if (self.inmem) {
              global.modulesInMemory[self.modelClassName.toLowerCase()] = result;
            }
            res(new RVHelper('EDB00000'));
          })
          .catch(err => {
            rej(new RVHelper('EDB10000', err));
          });
      } catch (err) {
        rej(new RVHelper('EDB10000', err));
      }
    });
  }
};
