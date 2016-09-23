//TODO: add comments for the file
const xml2js = require('xml2js');

const Nedb = require('nedb');

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const BACKEND_CONST = require('../constants/backend');

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = class BaseService {
  constructor($q, dbName, modelClassName, rootXmlName, serviceLevel, searchName) {
    this.$q = $q;
    this.dbName = dbName;
    this.modelClassName = modelClassName ? modelClassName : dbName.toUpperCase();
    this.rootXmlName = rootXmlName ? rootXmlName : dbName.toUpperCase();
    this.serviceLevel = serviceLevel ? serviceLevel : BACKEND_CONST.DOSSIER_LEVEL_SERVICE;
    this.searchName = searchName ? searchName : (dbName + '_NAME').toUpperCase();
    //TODO: may add exception handler for fs opration later as we may remove db.
    this.absPath = path.resolve(fs.realpathSync('./'), 'data', serviceLevel, dbName + '.db');
    console.log(this.absPath);
    this.db = new Nedb({
      filename: this.absPath,
      autoload: true
    });
  }

/*
  edb_getSync(obj) {
    if (this.serviceLevel && this.local_ref) {
      let retVal = [];
      retVal = _.filter(this.local_ref, obj);
      return new RVHelper('EDB0000', retVal);
    } else {
      return new RVHelper('EDB11003');
    }
  }
*/
  edb_get(obj) {
    let deferred = this.$q.defer();
    let query = obj ? obj : {};
    let entityClass, entity, classedRows = [];
    this.db.find(query, (err, rows) => {
      if (err) {
        deferred.reject(err);
      } else if (this.modelClassName !== 'PicklistModel') {
        try {
          entityClass = require('../models/' + this.modelClassName.toLowerCase() + '.model');
          rows.map(row => {
            try {
              entity = new entityClass();
              entity._initFromDB(row);
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
          entityClass = require('../models/picklist.model');
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
/*
  edb_putSync(obj) {
    if (this.serviceLevel && this.local_ref) {
      this.local_ref.push(obj);
      return new RVHelper('EDB0000');
    } else {
      return new RVHelper('EDB11003');
    }
  }
*/
  edb_put(obj) {
    let deferred = this.$q.defer();
    if (obj && typeof obj === 'object') {
      let obj2DB = obj;
      if (this.modelClassName !== 'PicklistModel')
        obj2DB.beforeToDB();
      this.db.insert(obj2DB, (err, result) => {
        if (err) {
          deferred.reject(new RVHelper('EDB10000', err));
          return deferred.promise;
        }
        deferred.resolve(new RVHelper('EDB00000', result));
      });
    } else
      deferred.reject('Error: tring to create non-object entity - ' + obj);
    return deferred.promise;
  }

  edb_delete(id) {
    let deferred = this.$q.defer();
    if (id && typeof id === 'string') {
      this.db.remove({ '_id': id }, function (err, res) {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }
        deferred.resolve(res.affectedRows);
      });
    } else {
      deferred.reject('Error: tring to delete non-string id - ' + id);
    }
    return deferred.promise;
  }

  edb_post(obj) {
    let deferred = this.$q.defer();
    if (obj && typeof obj === 'object' && obj.hasOwnProperty('_id')) {
      let obj2DB = obj;
      if (this.modelClassName !== 'PicklistModel')
        obj2DB.beforeToDB();
      this.db.update({ _id: obj2DB._id }, obj2DB, {}, (err, numReplaced) => {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }
        deferred.resolve(numReplaced);
      });
    } else
      deferred.reject('Error: tring to update non-object entity - ' + obj);
    return deferred.promise;
  }

  jsonToXml(obj) {
    let deferred = this.$q.defer();
    let entityClass, entity, builder, xml;
    if (obj) {
      if (typeof obj === 'object') {
        if (obj.hasOwnProperty('_id')) {
          this.db.find({ '_id': obj._id }, (err, result) => {
            if (err) {
              deferred.reject(err);
              return deferred.promise;
            }
            let sJson = result[0];
            if (sJson) {
              try {
                entityClass = require('../models/' + this.modelClassName.toLowerCase() + '.model')[this.modelClassName];

                entity = new entityClass(sJson);

                builder = new xml2js.Builder({
                  rootName: this.rootXmlName,
                  attrkey: 'attr$'
                });

                xml = builder.buildObject(entity.toGhstsJson());
                deferred.resolve(xml);
              } catch (err) {
                deferred.reject(err + ' with [' + sJson + ']');
              }
            }
          });
        } else {
          deferred.resolve(new RVHelper('EDB00000'));
        }
      } else {
        deferred.reject('Error: tring to transforming non-object entity to XML - ' + obj);
      }
    } else
      deferred.resolve({});
    return deferred.promise;
  }

  jsonObjClassifierFromXml(obj) {
    let deferred = this.$q.defer();
    let entities = obj;
    let entityClass, entity;
    let picklistSvc = require('./picklist.service').PickListService.picklistFactory(this.$q);
    if (entities && entities.constructor === Array) {
      try {
        entityClass = require('../models/' + this.modelClassName.toLowerCase() + '.model')[this.modelClassName];
        entities.map(item => {
          entity = new entityClass();
          // TODO: insert into db for now, may remove them later on
          entity.jsonObjClassifierFromXml(item, picklistSvc);
          console.log(entity);
          this.edb_put(entity);
        });
      } catch (err) {
        deferred.reject(err);
      }
    } else if (entities && typeof entities === 'object') {
      console.log('todo');
    } else {
      deferred.reject('Error: tring to classifier non-object entity from normal JSON object - ' + obj);
    }
    return deferred.promise;
  }
};
