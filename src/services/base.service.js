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
const GhstsPid = require('../utils/pid');
const NestedPropertyProc = require('../utils/nested-property.process');
const NoNeedIdServiceNames = ['PRODUCT', 'DOSSIER', 'TOC'];

module.exports = class BaseService {
  constructor(modelClassName, inmem, version) {
    this.modelClassName = modelClassName;
    this.inmem = inmem;
    this.version = version ? version : '';
    this.schemaDir = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.STANDARD_DIR_NAME);
    this.defDir = path.join(this.schemaDir, this.version.replace(/\./g, '_'), BACKEND_CONST.DEF_SUB_DIR_NAME);
    this.productDir = path.resolve('./', BACKEND_CONST.PRODUCTS_DIR);
    this.referencedBy = undefined;
    this.pidField = undefined;
  }

  edb_post(obj) {
    return new Q((res, rej) => {
      let self = this, obj2db = _.merge({}, obj);
      self._removeEmptyRefFields(obj);
      self._exist_check(obj)
        .then(ret => {
          if (JSON.parse(ret).length > 0) {
            return (new RVHelper('EDB10004', obj2db));
          } else {
            return self._create(obj2db);
          }
        })
        .then(result => {
          if (result.code !== 'EDB00000')
            rej(result);
          else
            res(result);
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  edb_put(obj) {
    let self = this;
    self._removeEmptyRefFields(obj);
    return self._update(obj);
  }

  /**
   *
   * @param {*} obj
   * @param {String} pop - comma separated string, for fields referenced
   * @param {*} where
   * @param {*} sort
   */
  edb_get(obj, pop, where, sort) {
    return new Q((res, rej) => {
      let self = this;
      let queryWhere = where ? where : obj.where ? obj.where : undefined;
      delete obj.where;
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
              pops.push({
                path: path
              });
          }
          // pops.push({ path: 'sender.toLegalEntityId', model: 'LEGALENTITY'});
          // pops.push({ path: 'toLegalEntityId'});
          dbquery = entityClass.find(query).populate(pops);
        } else
          dbquery = entityClass.find(query);

        if (queryWhere) {
          dbquery.where(queryWhere.fieldname ? queryWhere.fieldname : '_id').in(queryWhere.ids ? queryWhere.ids : queryWhere);
        }

        if (sort) {
          dbquery.sort(sort);
        } else {
          dbquery.sort('valuedecode');
        }
        dbquery
          .exec((err, rows) => {
            if (err)
              rej(err);
            else {
              res(new RVHelper('EDB00000', JSON.stringify(rows)));
            }
          });
      } catch (err) {
        rej(err);
      }
    });
  }

  _create(obj) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      entityClass = require('mongoose').model(self.modelClassName);
      if (obj && typeof obj === 'object') {
        if (!entityClass)
          rej(new RVHelper('EDB13001'));
        else {
          self._pid_check(obj);
          entityClass
            .create(obj, (err, rows) => {
              if (err)
                rej(err);
              else {
                if (self.inmem) {
                  if (!Array.isArray(global.modulesInMemory[self.modelClassName.toLowerCase()]))
                    global.modulesInMemory[self.modelClassName.toLowerCase()] = [];
                  global.modulesInMemory[self.modelClassName.toLowerCase()].push(self._format4InMem(rows));
                }
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
              }
            });
        }
      } else {
        rej(new RVHelper('EDB11004', obj));
      }
    });
  }

  _update(obj) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      if (obj && typeof obj === 'object' && obj.hasOwnProperty('_id')) {
        try {
          entityClass = require('mongoose').model(self.modelClassName);
          self._pid_check(obj);
          entityClass
            .update({ _id: obj._id }, obj, (err, rows) => {
              if (err)
                rej(err);
              else {
                entityClass.find({ _id: obj._id }, (err, rows) => {
                  if (err)
                    rej(err);
                  else {
                    if (self.inmem) {
                      _.remove(global.modulesInMemory[self.modelClassName.toLowerCase()], (item) => {
                        return item._id === obj._id;
                      });
                      global.modulesInMemory[self.modelClassName.toLowerCase()].push(self._format4InMem(rows[0]));
                    }
                    res(new RVHelper('EDB00000', JSON.stringify(rows[0])));
                  }
                });
              }
            });
        } catch (err) {
          rej(err);
        }
      } else {
        rej(new RVHelper('EDB11006', obj));
      }
    });
  }

  _reference_check(id) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass = require('mongoose').model(self.modelClassName);
      let refObj = self.referencedBy;
      if (refObj) {
        Q.coroutine(function* (id){

        });
        refObj.refName.map(item => {

        });
        refObj._id = id;
        entityClass.referenceCheck(refObj, (err, rets) => {
          if (err)
            rej(err);
          else
            res(rets);
        });
      } else
        res(0);
    });
  }

  _pid_check(obj) {
    let self = this;
    if (self.pidField) {
      let fields = Array.isArray(self.pidField) ? self.pidField : _.castArray(self.pidField);
      fields.map(field => {
        let pid = NestedPropertyProc.getValue(obj, field);
        let validPid = GhstsPid.validatePid(pid);
        NestedPropertyProc.setValue(obj, field, validPid);
      });
    }
  }

  _exist_check(obj) {
    return new Q((res, rej) => {
      let self = this;
      try {
        let rawObj = self._get_raw_data(obj);
        let firstLevel = _.merge({}, rawObj);
        let secondLevel = _.merge({}, rawObj);
        let keys = Object.keys(firstLevel);
        keys.map(key => {
          if (typeof firstLevel[key] === 'object' || !firstLevel[key])
            delete firstLevel[key];
          else
            delete secondLevel[key];

        });

        let entityClass = require('mongoose').model(self.modelClassName);

        let query = entityClass.find(firstLevel);
        keys = Object.keys(secondLevel);
        keys.map(key => {
          let subKeys = Object.keys(secondLevel[key]);
          subKeys.map(subkey => {
            if (secondLevel[key][subkey])
              query.where(key + '.' + subkey).equals(secondLevel[key][subkey]);
          });
        });
        query.exec((err, rets) => {
          if (err)
            rej(err);
          else
            res(JSON.stringify(rets));
        });
      } catch (err) {
        rej(err);
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
            return self._testDataPlkDecode(item);
          });
          return ret;
        } else
          return self._testDataPlkDecode(items);
      });

      let qAry = [];

      td.map(items => {
        qAry = [];
        if (items.constructor === Array) {
          items.map(item => {
            qAry.push(self._create(item));
          });
        } else
          qAry.push(self._create(items));
      });

      res(Q.all(qAry));
    });
  }

  _format4InMem(data) {
    let retVal, self = this;
    if (!data)
      return undefined;

    if (Array.isArray(data)) {
      retVal = data.map(ret => {
        let newRet = _.merge({}, ret.toObject());
        newRet = JSON.parse(JSON.stringify(newRet));
        if (!newRet.id && NoNeedIdServiceNames.indexOf(self.modelClassName) < 0)
          newRet.id = newRet._id;
        return newRet;
      });
    } else {
      retVal = _.merge({}, data.toObject());
      retVal = JSON.parse(JSON.stringify(retVal));
      if (!retVal.id && NoNeedIdServiceNames.indexOf(self.modelClassName) < 0)
        retVal.id = retVal._id;
    }
    return retVal;
  }

  _testDataPlkDecode(obj, plkInst) {
    let self = this;
    let retVal = {},
      picklistFieldsConfig, query, plEntity, dbOutput;
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
      } else if (plEntity && Array.isArray(plEntity)) {
        if (plEntity[0] && plEntity[0].hasOwnProperty('TYPE_NAME')) {
          retVal[key] = [];
          plEntity.map(subEnt => {
            retVal[key].push(self._testDataPlkDecode(subEnt, plkI));
          });
        } else
          retVal[key] = plEntity;
      } else if (plEntity && typeof plEntity === 'object') {
        retVal[key] = self._testDataPlkDecode(plEntity, plkI);
      } else {
        retVal[key] = plEntity;
      }
    });

    return retVal;
  }

  _removeEmptyRefFields(obj) {
    let self = this;
    let picklistFieldsConfig, plEntity;
    let keys = Object.keys(obj);

    keys.map(key => {
      picklistFieldsConfig = PicklistFieldsConfig[key];
      plEntity = obj[key];

      if ((picklistFieldsConfig || key === 'toLegalEntityId') && (!plEntity || plEntity === '')) { //this is picklist item
        delete obj[key];
      } else if (plEntity && Array.isArray(plEntity)) {
        plEntity.map(subEnt => {
          self._removeEmptyRefFields(subEnt);
        });
      } else if (plEntity && typeof plEntity === 'object') {
        self._removeEmptyRefFields(plEntity);
      }
    });
  }

  _getFieldNamebyTypeName(typeName) {
    let keys = Object.keys(PicklistFieldsConfig);
    let retVal = undefined;
    keys.every(key => {
      if (PicklistFieldsConfig[key].typename === typeName) {
        retVal = key;
        return false;
      } else
        return true;
    });
    return retVal;
  }

  _get_raw_data(obj) {
    let retVal, self = this;

    if (!Array.isArray(obj)) {
      retVal = obj;
      let keys = Object.keys(retVal);
      keys.map(key => {
        if ((key.startsWith('_') && key !== '_state' && key !== '_ghsts' && key !== '_dossier') || key === 'valuedecode' || key === 'id')
          delete retVal[key];
        else if (retVal[key]) {
          if (Array.isArray(retVal[key])) {
            delete retVal[key];
          } else if (typeof retVal[key] === 'object') {
            retVal[key] = self._get_raw_data(retVal[key]);
          }
        }
      });
      return retVal;
    }
  }

  _get_xml_jsonix(obj) {
    let retVal, self = this, picklistFieldsConfig, PickListService = require('./picklist.service');

    if (Array.isArray(obj)) {
      retVal = [];
      obj.map(item => {
        if (item) {
          if (Array.isArray(item) || typeof item === 'object')
            retVal.push(self._get_xml_jsonix(item));
          else
            retVal.push(item);
        }
      });
    } else {
      retVal = obj;
      let keys = Object.keys(retVal);
      keys.map(key => {
        if (key.startsWith('_') || key === 'valuedecode')
          delete retVal[key];
        else {
          picklistFieldsConfig = PicklistFieldsConfig[key];
          if (picklistFieldsConfig && retVal[key]) { //this is picklist item
            if (Array.isArray(retVal[key])) {
              let subRet = [];
              retVal[key].map(picklistId => {
                subRet.push(PickListService.toJsonix(picklistId));
              });
              retVal[key] = subRet;
            } else {
              retVal[key] = PickListService.toJsonix(retVal[key]);
            }
          } else if (retVal[key]) { //this is not picklist item
            if (key !== 'documentcontentstatushistory') {
              if (Array.isArray(retVal[key])) {
                if (retVal[key].length > 0) {
                  let subRet = self._get_xml_jsonix(retVal[key]);
                  retVal[key] = subRet;
                } else
                  delete retVal[key];
              } else if (typeof retVal[key] === 'object') {
                retVal[key] = self._get_xml_jsonix(retVal[key]);
              }
            }
          } else if (retVal[key] !== false)
            delete retVal[key];
        }
      });
    }
    return retVal;
  }

  edb_delete(id) {
    return new Q((res, rej) => {
      let self = this;
      let entityClass;

      if (id && typeof id === 'string') {
        try {
          entityClass = require('mongoose').model(self.modelClassName);

          entityClass
            .remove({ _id: id }, (err, rows) => {
              if (err)
                rej(err);
              else {
                if (self.inmem) {
                  _.remove(global.modulesInMemory[self.modelClassName.toLowerCase()], (item) => {
                    return item._id === id;
                  });
                }
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
              }
            });
        } catch (err) {
          rej(err);
        }
      } else {
        rej(new RVHelper('EDB11005', id));
      }
    });
  }

  initFromXSD(standardname) {
    return new Q((res, rej) => {
      let self = this,
        data;
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
                      rej(err);
                    else
                      global.modulesInMemory[self.modelClassName.toLowerCase()].push(self._format4InMem(result));
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
        rej(new RVHelper('EDB13001'));
      }
    });
  }

  static edb_getSync(obj) {
    let retVal = [];
    let classname = this.prototype.constructor.name;
    classname = classname.slice(0, classname.indexOf('Service')).toLowerCase();
    if (!global.modulesInMemory[classname])
      return new RVHelper('EDB10002');
    else if (Array.isArray(obj))
      retVal = _.filter(global.modulesInMemory[classname], p => {
        return _.includes(obj, p._id);
      });
    else if (obj && obj.hasOwnProperty('where')) {
      let condi = obj.where;
      let key = Object.keys(condi)[0];
      retVal =  _.filter(global.modulesInMemory[classname], p => {
        return _.includes(p[key].toString(), condi[key]);
      });
    }
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
        let options = {
          retainKeyOrder: true,
          validateBeforeSave: false,
          toJSON: {
            getters: true,
            virtuals: true
          },
          toObject: {
            getters: true,
            virtuals: true
          },
          id: false
        };

        let mschema = new Schema(jschema, options);
        let selfPlugin;
        mschema.plugin(ServiceLevelPlugin, {
          url: self.modelClassName.toLowerCase()
        });

        try {
          selfPlugin = require('../models/plugins/' + self.modelClassName.toLowerCase() + '.plugin.js');
        } catch (err) {
          selfPlugin = undefined;
        }
        if (selfPlugin)
          mschema.plugin(selfPlugin);
        let mmodule = mongoose.model(self.modelClassName, mschema);
        if (mmodule.schema._indexes.length > 0 && mmodule.schema._indexes[0].length > 1)
          mmodule.ensureIndexes();

        if (self.inmem) {
          mmodule.find({})
            .exec((err, result) => {
              if (err)
                rej(err);
              else {
                if (self.inmem && result.length > 0)
                  global.modulesInMemory[self.modelClassName.toLowerCase()] = self._format4InMem(result);
                res(new RVHelper('EDB00000'));
              }
            });
        } else
          res(new RVHelper('EDB00000'));
      } catch (err) {
        rej(err);
      }
    });
  }
};