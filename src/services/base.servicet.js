//TODO: add comments for the file

const Tingodb = require('tingodb')({nativeObjectID: true}).Db;

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const BACKEND_CONST = require('../constants/backend');
const PicklistModel = require('../models/picklist.model');

const fs = require('fs');
const path = require('path');

var moduleClasses = undefined;

module.exports = class BaseService {
  constructor($q, dbName, modelClassName, rootXmlName, prodAndDossierName, submissionStatu) {
    this.$q = $q;
    this.dbName = dbName;
    this.modelClassName = modelClassName;
    this.rootXmlName = rootXmlName ? rootXmlName : dbName.toUpperCase();
    this.prodAndDossierName = prodAndDossierName;
    this.submissionStatu = submissionStatu ? submissionStatu : BACKEND_CONST.ACTIVE_SUBMISSION_NAME;
    if (!moduleClasses && modelClassName && modelClassName !== 'PicklistModel') {
      moduleClasses = require('../models/' + modelClassName.toLowerCase() + '.model');
    }
    //TODO: may add exception handler for fs opration later as we may remove db.
    this.absPath = path.resolve(fs.realpathSync('./'), 'data');
    //    if (this.serviceLevel === BACKEND_CONST.DOSSIER_LEVEL_SERVICE && this.prodAndDossierName)
    //      this.absPath = path.resolve(this.absPath, this.prodAndDossierName, this.submissionStatu, this.dbName + '.db');
    //    else
    //      this.absPath = path.resolve(this.absPath, this.dbName + '.db');
    //    console.log(this.absPath);
    this.db = new Tingodb(this.absPath, {}).collection(this.dbName);
  }

  edb_get(obj) {
    let self = this, deferred = self.$q.defer();
    let query = obj ? (obj.data ? obj.data : {}) : {};
    let entityClass = undefined, entity, classedRows = [];

    self.db.find(query).toArray((err, rows) => {
      if (err) {
        deferred.reject(err);
      } else if (self.modelClassName !== 'PicklistModel') {
        try {
          if (self.modelClassName)
            entityClass = moduleClasses[self.modelClassName];
          rows.toArray().map(row => {
            try {
              if (entityClass) {
                entity = new entityClass();
                entity._initFromDB(row);
              } else {
                entity = row;
                delete entity._id;
              }
              classedRows.push(entity);
            } catch (err) {
              deferred.reject(new RVHelper('EDB10000', err));
            }
          });
        } catch (err) {
          deferred.reject(new RVHelper('EDB10000', err));
        }

        deferred.resolve(new RVHelper('EDB00000', classedRows));
      } else {
        try {
          entityClass = PicklistModel;
          rows.map(row => {
            try {
              entity = new entityClass(row);
              classedRows.push(entity);
            } catch (err) {
              deferred.reject(new RVHelper('EDB10000', err));
            }
          });
        } catch (err) {
          deferred.reject(new RVHelper('EDB10000', err));
        }

        deferred.resolve(new RVHelper('EDB00000', classedRows));
      }
    });
    return deferred.promise;
  }

  edb_put(obj) {
    let self = this, deferred = self.$q.defer();
    if (obj && typeof obj === 'object') {
      let obj2DB = obj;
      if (self.modelClassName !== 'PicklistModel' && obj2DB['beforeToDB'])
        obj2DB.beforeToDB();
      self.db.insert(obj2DB, (err, result) => {
        if (err) {
          deferred.reject(new RVHelper('EDB10000', err));
          return deferred.promise;
        }
        deferred.resolve(new RVHelper('EDB00000', result));
      });
    } else
      deferred.reject(new RVHelper('EDB11004', obj));
    return deferred.promise;
  }

  edb_delete(id) {
    let self = this, deferred = self.$q.defer();
    if (id && typeof id === 'string') {
      self.db.remove({ '_id': id }, function (err, res) {
        if (err) {
          deferred.reject(new RVHelper('EDB10000', err));
        } else {
          deferred.resolve(new RVHelper('EDB00000', res.affectedRows));
        }
      });
    } else {
      deferred.reject(new RVHelper('EDB11005', id));
    }
    return deferred.promise;
  }

  edb_post(obj) {
    let self = this, deferred = self.$q.defer();
    if (obj && typeof obj === 'object' && obj.hasOwnProperty('_id')) {
      let obj2DB = obj;
      if (self.modelClassName !== 'PicklistModel' && obj2DB['beforeToDB'])
        obj2DB.beforeToDB();
      self.db.update({ _id: obj2DB._id }, obj2DB, {}, (err, numReplaced) => {
        if (err) {
          deferred.reject(new RVHelper('EDB10000', err));
        } else {
          deferred.resolve(new RVHelper('EDB00000', numReplaced));
        }
      });
    } else
      deferred.reject(new RVHelper('EDB11006', obj));
    return deferred.promise;
  }

  jsonObjClassifierFromXml(obj, picklistInst) {
    let self = this, deferred = self.$q.defer();
    let entities = obj;
    let entityClass, entity;
    let picklistII = picklistInst ? picklistInst : new PicklistModel(self.$q);

    if (entities && entities.constructor === Array) {
      try {
        if (self.modelClassName) {
          entityClass = moduleClasses[self.modelClassName];
        }
        entities = entities.map(item => {
          if (self.modelClassName && entityClass) {
            entity = new entityClass();
            entity.jsonObjClassifierFromXml(item, picklistII);
          } else {
            entity = item;
          }
          self.edb_put(entity);
          return entity;
        });
        deferred.resolve(entities);
      } catch (err) {
        deferred.reject(new RVHelper('EDB10000', err));
      }
    } else if (entities && typeof entities === 'object') {
      if (self.modelClassName) {
        entityClass = moduleClasses[self.modelClassName];
      }
      if (self.modelClassName && entityClass) {
        entity = new entityClass();
        entity.jsonObjClassifierFromXml(entities, picklistII);
      } else {
        entity = entities;
      }
      self.edb_put(entity);
      deferred.resolve(entity);
    } else if (entities) {
      self.edb_put(entities);
      deferred.resolve(entities);
    } else {
      deferred.reject(new RVHelper('EDB11007', obj));
    }
    return deferred.promise;
  }
};

