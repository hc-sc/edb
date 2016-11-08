// TODO: modify the comments
// Matches all types to one type, whose form is
// For non extensible types
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
// For types that are extensible
// <VALUE Other_Value='attr_value'>value</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>

const PicklistFieldsConfig = require('../configs/picklist.fields');
const Picklist = require('./picklist.model');
const BACKEND_CONST = require('../constants/backend');
const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const stdDir = path.resolve(basePath, 'resources', 'app', BACKEND_CONST.STANDARD_DIR_NAME);

module.exports = class BaseModel {
  constructor(url, version, identifier, state) {
    if (arguments.length === 1 && typeof arguments[0] !== 'string') {
      this._initFromDB(arguments[0]);
    } else {
      this._url = url ? url : this.constructor.name.toLowerCase();
      this._version = version ? version : BACKEND_CONST.DEFAULT_GHSTS_VERSION;
      this._identifier = identifier;
      this._state = state;
      this._createdAt = new Date();
      this._updatedAt = this._createdAt; 
      
      let defPath = path.resolve(stdDir, this._version, BACKEND_CONST.DEF_SUB_DIR_NAME);
      let defFileName = path.resolve(defPath, this._url.toUpperCase() + '.json');
      console.log(this.constructor.name);
      console.log(defFileName);
      let defs = require(defFileName).propertyInfos;
      defs.map(def => {
        if (def.typeInfo === 'AnyType') {
          this[def.elementName] = {};
        } else if (def.typeInfo) {
          let childDefFileName = path.resolve(defPath, def.typeInfo.slice(1) + '.json');
          console.log(childDefFileName);
          let property = require(childDefFileName).propertyInfos;
          if (property.length === 1 &&  property[0].collection)
            this[def.elementName] = [];
          else
            this[def.elementName] = {};
        } else if (def.type === 'attribute') {
          this._identifier[def.type.attributeName.localPart] = '';
        } else {
          console.log('def --- ' + def);
        }
      });
    }
  }

  static setMongooseModel() {
    return this._schema;
  }

  beforeToDB() {
    let keys = Object.keys(this);
    let picklistConf, entity;
    keys.map(key => {
      if (key[0] !== '_') { //not internal attribute 
        picklistConf = PicklistFieldsConfig[key];
        entity = this[key];
        if (entity) {
          if (picklistConf) { //it is a picklist item
/*            if (entity._id) {
              entity._pklid = entity._id;
              delete entity._id;
              this[key] = entity;
            }
*/          } else { //it is not a picklist item
            if (entity.constructor === Array) { //it is an array
              this[key] = entity.map(subObj => {
                try {
                  subObj.beforeToDB();
                  return subObj;
                } catch (err) {
                  console.log(err);
                }
              });
//              console.log(this[key]);
            } else if (entity && typeof entity === 'object') { //it is an sub-class JSON obj
              try {
                entity = this[key];
                entity.beforeToDB();
                this[key] = entity;
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      }
    });
  }

  _initFromDB(jsonDB) {
    let self = this;
    Object.assign(self, jsonDB);
    let keys = Object.keys(self);
    let entity, picklistConf;
    keys.map(key => {
      if (key[0] !== '_') { //not internal attribute 
        picklistConf = PicklistFieldsConfig[key];
        entity = self[key];
        if (picklistConf) { //it is a picklist item
          entity = new Picklist(picklistConf.typename, entity.VALUE, entity.VALUE_DECODE, entity.isExt ? entity.isExt : false, entity.STATUS, entity._pklid);
          self[key] = entity;
        } else { //it is not a picklist item
          if (entity.constructor === Array) { //it is an array
            self[key] = entity.map(subObj => {
              try {
                return self._jsonObjClassifierFromDB(key, subObj);
              } catch (err) {
                console.log(err);
              }
            });
//            console.log(this[key]);
          } else if (entity && typeof entity === 'object') { //it is an sub-class JSON obj
            try {
              self[key] = self._jsonObjClassifierFromDB(key, entity);
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    });
  }

  jsonObjClassifierFromXml(obj, picklistInst4FromXml) {
    let self = this, keys, subEntityClass, picklistFieldsConfig, dbOutput, query, plEntity, subClassName, subentity;
    keys = Object.keys(obj);
    keys.map(key => {
      if (key === 'attr$') {
        self._identifier = obj[key];
      } else {
        picklistFieldsConfig = PicklistFieldsConfig[key];
        if (picklistFieldsConfig) { //this is picklist item
          query = {};
          plEntity = obj[key];
          if (!plEntity.VALUE && !plEntity.VALUE_DECODE) {
            //TODO: modify this after XML import solution defined
            console.log('ERROR: XML has empty picklist item at ' + key);
          } else {
            query.TYPE_NAME = picklistFieldsConfig.typename;
            query.VALUE_DECODE = plEntity.VALUE_DECODE;
            if (plEntity.VALUE && typeof plEntity.VALUE === 'object') {
              if (plEntity.VALUE.attr$)
                query.VALUE = plEntity.VALUE.attr$.Other_Value;
            } else {
              query.VALUE = plEntity.VALUE;
            }
            dbOutput = picklistInst4FromXml.edb_getSync(query);
            if (dbOutput.constructor === Array) {
              subEntityClass = Picklist;
              if (dbOutput[0]) { 
                self[key] = new subEntityClass(dbOutput[0]);
              } else if (picklistFieldsConfig.isExt) {
                subentity = new subEntityClass(picklistFieldsConfig.typename);
                subentity.jsonObjClassifierFromXml(plEntity);
                subentity.isExt = true;
                self[key] = subentity;
              } else {
                //TODO: modify this after XML import solution defined
                console.log('ERROR: XML has new picklist item at [' + key + '] for no-extentable picklist with error :' + plEntity);
              }
            } else {
              //TODO: modify this after XML import solution defined
              console.log('ERROR: XML has new picklist item at [' + key + '] with error :' + dbOutput);
            }
          }
        } else if (obj[key].constructor === Array) {
          subClassName = BaseModel.getClassNameFromFieldName(key);
          subEntityClass = require('./' + self._url + '.model')[subClassName];
          obj[key].map(item => {
            subentity = new subEntityClass();
            subentity.jsonObjClassifierFromXml(item, picklistInst4FromXml);
            self[key].push(subentity);
          });
        } else if (typeof obj[key] === 'object') {
          subClassName = BaseModel.getClassNameFromFieldName(key);
          subEntityClass = require('./' + self._url + '.model')[subClassName];
          subentity = new subEntityClass();
          subentity.jsonObjClassifierFromXml(obj[key], picklistInst4FromXml);
          if (self[key].constructor === Array) {
            self[key].push(subentity);
          } else {
            self[key] = subentity;
          }
        } else {
          self[key] = obj[key];
        }
      }
    });
  }

  static getClassNameFromFieldName(fieldName) {
    let retVal = fieldName.toLowerCase().split('_').map(item => {
      return item.toLowerCase().charAt(0).toUpperCase() + item.slice(1);
    });
    if (fieldName.indexOf('_IDENTIFIER'))
      retVal.push('Struct');
    retVal = retVal.join('');
    return retVal;
  }

  _jsonObjClassifierFromDB(key, obj) {
    let self = this, subClassName, entityClass, retVal = null;
    if (key === 'createdAt' || key === 'updatedAt') {
      retVal = obj;
    } else {
      subClassName = BaseModel.getClassNameFromFieldName(key);
      entityClass = require('./' + self._url + '.model')[subClassName];
      retVal = new entityClass(obj);
    }
    return retVal;
  }

  toGhstsJson() {
    let retObj = {}, self = this;
    let entity, xmlOutput, childXmlOutput;
    let keys = Object.keys(self);

    keys.map(key => {
      xmlOutput = {};
      if (key[0] !== '_' && key !== 'createdAt' && key !== 'updatedAt') {
        entity = self[key];
        if (entity) {
          if (entity.constructor === Array) {
            xmlOutput = [];
            entity.map(subentity => {
              childXmlOutput = {};
              childXmlOutput = subentity.toGhstsJson();
              if (Object.keys(childXmlOutput).length > 0) {
                xmlOutput.push(childXmlOutput);
              }
            });
            if (xmlOutput.length > 0) {
              retObj[key] = xmlOutput;
            }
          } else if (typeof entity === 'string' && entity.length > 0) {
            retObj[key] = entity;
          } else if (typeof entity === 'object') {
            xmlOutput = entity.toGhstsJson();
            if (Object.keys(xmlOutput).length > 0)
              retObj[key] = xmlOutput;
          } else {
            console.log('ERROR: wrong using toGhstsJson of BaseModal with ' + entity);
          }
        }
      } else if (key === '_identifier') {
        entity = self[key];
        if (entity)
          retObj.attr$ = entity;
      }
    });
    return retObj;
  }
};

