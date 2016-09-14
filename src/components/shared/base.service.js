//TODO: add comments for the file
import xml2js from 'xml2js';

const Nedb = require('nedb');

var fs = require('fs');
var path = require('path');

export default class BaseService {
  constructor($q, dbName, modelClassName, rootXmlName, searchName) {
    this.$q = $q;
    this.dbName = dbName;
    this.modelClassName = modelClassName ? modelClassName : dbName.toUpperCase();
    this.rootXmlName = rootXmlName ? rootXmlName : dbName.toUpperCase();
    this.searchName = searchName ? searchName : (dbName + '_NAME').toUpperCase();
    //TODO: may add exception handler for fs opration later as we may remove db.
    this.absPath = path.resolve(fs.realpathSync('./'), 'data', dbName + '.db');
    console.log(this.absPath);
    this.db = new Nedb({
      filename: this.absPath,
      autoload: true
    });
  }

  edb_get(obj) {
    let deferred = this.$q.defer();
    let query = obj ? obj : {};
    let entityClass, entity, classedRows = [];
    this.db.find(query, (err, rows) => {
      if (err) {
        deferred.reject(err);
      } else if (this.modelClassName !== 'PicklistModel') {
        try {
          entityClass = require('./../' + this.modelClassName.toLowerCase() + '/' + this.modelClassName.toLowerCase() + '.model')[this.modelClassName];
          rows.map(row => {
            try {
              entity = new entityClass();
              entity._initFromDB(row);
              classedRows.push(entity);
            } catch (err) {
              deferred.reject(err + ' with [' + row + ']');
            }
          });
        } catch (err) {
          deferred.reject(err + ' with [' + this.modelClassName + ']');
        }

        deferred.resolve(classedRows);
      } else {
        try {
          entityClass = require('./shared.model')[this.modelClassName];
          rows.map(row => {
            try {
              entity = new entityClass(row);
              classedRows.push(entity);
            } catch (err) {
              deferred.reject(err + ' with [' + row + ']');
            }
          });
        } catch (err) {
          deferred.reject(err + ' with [' + this.modelClassName + ']');
        }

        deferred.resolve(classedRows);
      }
    });
    return deferred.promise;
  }

  edb_put(obj) {
    let deferred = this.$q.defer();
    if (obj && typeof obj === 'object') {
      let obj2DB = obj;
      if (this.modelClassName !== 'PicklistModel')
        obj2DB.beforeToDB();
      this.db.insert(obj2DB, (err, result) => {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }
        deferred.resolve(result);
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
                entityClass = require('./../' + this.modelClassName.toLowerCase() + '/' + this.modelClassName.toLowerCase() + '.model')[this.modelClassName];

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
          deferred.resolve({});
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
    let picklistSvc = require('./services/picklist.service').PickListService.picklistFactory(this.$q);
    if (entities && entities.constructor === Array) {
      try {
        entityClass = require('./../' + this.modelClassName.toLowerCase() + '/' + this.modelClassName.toLowerCase() + '.model')[this.modelClassName];
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
}

