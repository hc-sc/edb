//TODO: add comments for the file

const xml2js = require('xml2js');
const fs = require('fs');
const Q = require('bluebird');
const _ = require('lodash');

//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const Picklist = require('../models/picklist.model');
const PicklistService = require('./picklist.service');
const SchemaLoader = require('../models/mongoose.schema.loader');

var moduleInMemory = undefined;
var moduleTopClassName;

module.exports = class BaseService {
  constructor(modelClassName, version) {
    this.modelClassName = modelClassName;
    this.version = version;
  }

  edb_get(obj) {
    let self = this;
    let query = obj ? (obj.data ? obj.data : {}) : {};
    let entityClass = undefined,
      entity, classedRows = [];

    //    let tdb = new TingoDBWrap(self.dbName);
    try {
      //      mongoose.Promise = Q;

      //      mongoose.connect('tingodb://'+__dirname+'/../data');
      //      let rows = tdb.find(query).next().value;
      let clss = require('mongoose').model(self.modelClassName);

      clss
        .find({})
        .then(rows => {
          if (rows.code === 'EDB00000') {
            if (self.modelClassName !== 'Picklist') {
              try {
                rows.data.map(row => {
                  try {
                    if (entityClass) {
                      entity = new entityClass();
                      entity._initFromDB(row);
                    } else {
                      entity = row;
                    }
                    classedRows.push(entity);
                  } catch (err) {
                    return new RVHelper('EDB10000', err);
                  }
                });
              } catch (err) {
                return new RVHelper('EDB10000', err);
              }
              return new RVHelper('EDB00000', classedRows);
            } else {
              try {
                entityClass = Picklist;
                rows.data.map(row => {
                  try {
                    entity = new entityClass(row);
                    classedRows.push(entity);
                  } catch (err) {
                    return new RVHelper('EDB10000', err);
                  }
                });
              } catch (err) {
                return new RVHelper('EDB10000', err);
              }
              return new RVHelper('EDB00000', classedRows);
            }
          } else
            return rows;
        })
        .catch(err => {
          return err;
        });
    } catch (err) {
      console.log(err);
    }
  }

  edb_put(obj) {
    let self = this;
    if (obj && typeof obj === 'object') {
      let obj2DB = obj;
      let tdb;// = new TingoDBWrap(self.dbName);

      if (self.modelClassName !== 'Picklist' && obj2DB['beforeToDB'])
        obj2DB.beforeToDB();
      tdb.insert(obj2DB).next()
        .then(result => {
          return result;
        })
        .catch(err => {
          return err;
        });
    } else
      return new RVHelper('EDB11004', obj);
  }


  edb_delete(id) {
    let self = this;
    let tdb; // = new TingoDBWrap(self.dbName);

    if (id && typeof id === 'string') {
      tdb.remove(id)
        .then(result => {
          return result;
        })
        .catch(err => {
          return err;
        });
    } else {
      return new RVHelper('EDB11005', id);
    }
  }

  edb_post(obj) {
    let self = this;
    let tdb; // = new TingoDBWrap(self.dbName);

    if (obj && typeof obj === 'object' && obj.hasOwnProperty('_id')) {
      let obj2DB = obj;
      if (self.modelClassName !== 'Picklist' && obj2DB['beforeToDB'])
        obj2DB.beforeToDB();
      tdb.update(obj2DB)
        .then(result => {
          return result;
        })
        .catch(err => {
          return err;
        });
    } else
      return new RVHelper('EDB11006', obj);
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

  initFromXSD(filename) {
    return new Q((res, rej) => {
      let self = this,
        data, types = [];

      let dbmodel = require('mongoose').model(self.modelClassName);

      if (dbmodel) {
        dbmodel
          .find({})
          .then(result => {
            if (result.length === 0) {
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

                  types = [];

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
                        //                      let type = new Picklist(typename);
                        type.VALUE = enumeration.attr$.value;
                        type.VALUE_DECODE = APP_INFO.DECODE;
                        type.STATUS = APP_INFO.STATUS;
                        type.isExt = false;
                        dbmodel.create(type, (err, result) => {
                          if (err)
                            rej(new RVHelper('EDB10000', err));
                          else
                            types.push(result);
                        });
                      }
                    }
                  }
                  dbmodel
                    .find({})
                    .then(result => {
                      moduleInMemory = result;
                      res(new RVHelper('EDB20001', `${result.length} added.`));
                    })
                    .catch(err => {
                      rej(err);
                    });
                });
              } catch (err) {
                rej(new RVHelper('EDB10000', err));
              }
            }
          })
          .catch(err => {
            rej(new RVHelper('EDB10000', err));
          });
      } else {
        console.log('No model defined');
      }
      //      let tdb = new TingoDBWrap(self.dbName);

      //      let rows = tdb.consum();
      //      moduleClasses.connect('tingodb://'+__dirname+'/../data');
      //      .then((err, ret) => {
      //      });
      //      rows.next().value
      //     .then(result => {
      //       if (result.data.length === 0) {
      //         try {
      //           data = fs.readFileSync(filename, {
      //             encoding: 'utf8'
      //           });
      //         } catch (err) {
      //           rej(new RVHelper('EDB10000', err));
      //         }

      //         xml2js.parseString(data, {
      //           attrkey: 'attr$',
      //           explicitArray: false
      //         }, (err, obj) => {
      //           if (err)
      //             rej(new RVHelper('EDB10000', err));

      //           types = [];

      //           const COMPLEX_TYPES = obj['xs:schema']['xs:complexType'].map(type => {
      //             return type['xs:simpleContent']['xs:extension'].attr$.base;
      //           });

      //           for (const item of obj['xs:schema']['xs:simpleType']) {
      //             const INDEX = COMPLEX_TYPES.indexOf(item.attr$.name);
      //             const OTHER_VALUE = self.getOtherValue();

      //             for (const enumeration of item['xs:restriction']['xs:enumeration']) {
      //               const APP_INFO = enumeration['xs:annotation']['xs:appinfo'];
      //               if (enumeration.attr$.value !== OTHER_VALUE) {

      //                 let typename = INDEX >= 0 ?
      //                   `EXTENSION_${item.attr$.name}` : item.attr$.name;
      //                 let type = new Picklist(typename);
      //                 type.VALUE = enumeration.attr$.value;
      //                 type.VALUE_DECODE = APP_INFO.DECODE;
      //                 type.STATUS = APP_INFO.STATUS;
      //                 type.isExt = false;
      //                 types.push(type);
      //               }
      //             }
      //           }
      //         });
      //         let saved = rows.next(types).value;
      //         saved
      //           .then(result => {
      //             moduleInMemory = result.data;
      //             res(new RVHelper('EDB20001', `${result.data.length} added.`));
      //           })
      //           .catch(err => {
      //             rej(err);
      //           });
      //       }
      //       if (!moduleInMemory) {
      //         moduleInMemory = result.data;
      //         res(new RVHelper('EDB20001'));
      //       }
      //     })
      //     .catch(err => {
      //       rej(err);
      //     });
    });
  }

  static edb_getSync(obj) {
    let retVal = [];
    retVal = _.filter(moduleInMemory, obj);

    return retVal;
  }

  static isMongooseSet() {
    return moduleTopClassName;
  }

  initMongoose() {
    let self = this;
    moduleTopClassName = self.modelClassName;
    return SchemaLoader.loadSchema(moduleTopClassName, self.version);
  }

};
