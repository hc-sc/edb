//TODO: add comments for the file
'use strict';

const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const Q = require('bluebird');
const _ = require('lodash');

const PicklistFieldsConfig = require('../configs/picklist.fields');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const SchemaLoader = require('../models/mongoose.schema.loader');
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');
const BACKEND_CONST = require('../constants/backend');

module.exports = class BaseService {
  constructor(modelClassName, inmem, version) {
    this.modelClassName = modelClassName;
    this.inmem = inmem;
    this.version = version ? version : '01.00.00';
    this.schemaDir = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.STANDARD_DIR_NAME);
    this.defDir = path.join(this.schemaDir, this.version.replace(/\./g, '_'), BACKEND_CONST.DEF_SUB_DIR_NAME);
  }

  edb_get(obj, pop) {
    return new Q((res, rej) => {
      let self = this;
      let query = obj ? (obj ? obj : {}) : {};
      let entityClass;

      try {
        entityClass = require('mongoose').model(self.modelClassName);
        let dbquery;
        if (pop) {
          let pops = [];
          let paths = entityClass.schema.paths;
          for (var path in paths) {
            if (paths[path].caster)
              pops.push({path: path});
          }
          dbquery = entityClass.find(query).populate(pops).lean();
        }
        else
          dbquery = entityClass.find(query).lean();
        
        dbquery
          .exec((err, rows) => {
            if (err)
              rej(err);
            else
              res(new RVHelper('EDB00000', JSON.stringify(rows)));
          });
      } catch (err) {
        rej(err);
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
          rej(new Error(new RVHelper('EDB13001')));
        else {
          entityClass
            .create(obj, (err, rows) => {
              if (err)
                rej(new Error(err));
              else
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
            });
        }
      } else {
        rej(new Error(RVHelper('EDB11004', obj)));
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
                rej(new Error(err));
              else
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
            });
        } catch (err) {
          rej(new Error(new RVHelper('EDB13001')));
        }
      } else {
        rej(new Error(new RVHelper('EDB11005', id)));
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
            .update({_id: obj._id}, obj, (err, rows) => {
              if (err)
                rej(new Error(err));
              else
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
            });
        } catch (err) {
          rej(new Error(new RVHelper('EDB13001')));
        }
      } else {
        rej(new Error(new RVHelper('EDB11006', obj)));
      }
    });
  }

  initDbfromTestData() {
    return new Q((res, rej) => {
      let self = this;
      let tdPath = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, 'test', self.modelClassName.toLowerCase() + '.json');
      let td = require(tdPath)[self.modelClassName.toLowerCase()];

      td = td.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkdecode(item);
          });
          return ret;
        } else
          return self._testDataPlkdecode(items);
      });

      let qAry = [];

      td.map(items => {
        qAry = [];        
        if (items.constructor === Array) {
          items.map(item => {
            qAry.push(self.edb_put(item));
          });
        } else
          qAry.push(self.edb_put(items));
      });

      return Q.all(qAry);
    });
  }
  // _initDbFromTemplate(version, obj, pklInst) {
  //   return new Q((res, rej) => {
  //     let self = this;
  //     let entities = obj;
  //     let retVal;
  //     let picklistII = pklInst;
  //     let rows;

  //     if (entities && entities.constructor === Array) {
  //       let processAry = [];
  //       retVal = [];
  //       for (var i = 0; i < entities.length; i++) {
  //         processAry.push(self.edb_put(todb));
  //       }
  //       return Q.all(processAry);
  //       // /*      for (var i = 0; i < entities.length; i++) {
  //       //         let item = yield self._save(self._remove_status(entities[i], self.modelClassName, entityClass, picklistII));
  //       //         if (item.code !== 'EDB00000') {
  //       //           retVal = item;
  //       //           return retVal;
  //       //         } else if (item.data.length === 0) {
  //       //           continue;
  //       //         } else
  //       //           retVal.push(item.data[0]);
  //       //       }*/
  //       // //      retVal = yield processAry;
  //       // return retVal;
  //     } else if (entities && typeof entities === 'object') {
  //       // //      retVal = yield self._save(self._remove_status(entities, self.modelClassName, entityClass, picklistII));
  //       // return retVal;

  //     } else if (entities) {
  //       // //      entities = yield self._save(entities);
  //       // return entities;
  //     } else {
  //       rej(new RVHelper('EDB11007', obj));
  //     }

  //   });
  // }

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
  // _get_new_ext_plk(obj, pklInst) {
  //   let self = this, retVal = [];
  //   let keys = Object.keys(obj);
  //   if (!obj) {
  //     return retVal;
  //   }

  //   for (var i = 0; i < keys.length; i++) {
  //     let key = keys[i], item = obj[key];
  //     if (item.constructor === Array) {
  //       for (var j = 0; j < item.length; j++) {
  //         self._get_new_ext_plk(item[j]);
  //       } 
  //     } else if (typeof item === 'object') {
  //       let def = path.join(self.defDir, item.TYPE_NAME.replace('GHSTS.', '') + '.json');
  //       let isPickList = require(def);
  //       if (isPickList) {
  //         console.log(item.TYPE_NAME + 'is plk');
  //       } else {
  //         console.log(item.TYPE_NAME + 'is not plk');
  //       }
  //     }
  //   }

  //   return retVal;
  // }

  _testDataPlkdecode(obj, plkInst) {
    let self = this;
    let retVal = {}, picklistFieldsConfig, query, plEntity, dbOutput;
    let keys = Object.keys(obj);
    let plkI = plkInst ? plkInst : require('./picklist.service');

    keys.map(key => {
      picklistFieldsConfig = PicklistFieldsConfig[key];
      plEntity = obj[key];

      if (picklistFieldsConfig) { //this is picklist item
        query = {};
        if (!plEntity.value && !plEntity.valuedecode) {
          //TODO: modify this after XML import solution defined
          console.log('ERROR: XML has empty picklist item at ' + key);
        } else {
          query.TYPE_NAME = picklistFieldsConfig.typename;
          query.valuedecode = plEntity.valuedecode;
          if (plEntity.value) {
            if (typeof plEntity.value === 'string')
              query.value = plEntity.value;
            else if (plEntity.value.hasOwnProperty('otherValue'))
              query.value = plEntity.value.otherValue;
            else
              query.value = plEntity.value.value;
          } else
            query.value = plEntity.value;
          dbOutput = plkI.edb_getSync(query);
          retVal[key] = dbOutput[0]._id.toString();
        }
      } else if (plEntity && plEntity.constructor === Array) {
        if (plEntity[0].hasOwnProperty('TYPE_NAME')) {
          retVal[key] = [];
          plEntity.map(subEnt => {
            retVal[key].push(self._testDataPlkdecode(subEnt, plkI));
          });
        } else
          retVal[key] = plEntity;
      } else if (plEntity && typeof plEntity === 'object') {
        retVal[key] = self._testDataPlkdecode(plEntity, plkI);
      } else {
        retVal[key] = plEntity;
      }
    });

    return retVal;
  }

  initFromXSD(standardname) {
    return new Q((res, rej) => {
      let self = this, data;
      let filename = path.join(self.schemaDir, standardname.endsWith('.xsd') ? standardname : standardname + '.xsd');

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
              rej(err);

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
                      rej(new Error(err));
                    else
                      global.modulesInMemory[self.modelClassName.toLowerCase()].push(JSON.stringify(result));
                  });
                }
              }
            }
            res(new RVHelper('EDB20001', `${global.modulesInMemory[self.modelClassName.toLowerCase()].length} added.`));
          });
        } catch (err) {
          rej(err);
        }
      } else {
        rej(new Error('EDB13001'));
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
        //        console.log(JSON.stringify(jschema));
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;
        let mschema = new Schema(jschema);
        let selfPlugin;
        mschema.plugin(ServiceLevelPlugin, { 
          url: self.modelClassName.toLowerCase(),
          id: false,
          minimize: false
        });
        
        try { 
          selfPlugin = require('../models/plugins/' + self.modelClassName.toLowerCase() + '.plugin.js');
        } catch (err) {
          selfPlugin = undefined;
        }
        if (selfPlugin)
          mschema.plugin(selfPlugin);
        let mmodule = mongoose.model(self.modelClassName, mschema);
        if (self.inmem) {
          mmodule.find({})
            .lean()
            .exec()
            .then(result => {
              global.modulesInMemory[self.modelClassName.toLowerCase()] = result;
              res(new RVHelper('EDB00000'));
            })
            .catch(err => {
              rej(err);
            });
        } else
          res(new RVHelper('EDB00000'));
      } catch (err) {
        rej(err);
      }
    });
  }
};
