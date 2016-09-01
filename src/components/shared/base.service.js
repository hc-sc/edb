import xml2js from 'xml2js';

const Nedb = require('nedb');

var fs = require('fs');
var path = require('path');

import { ValueStruct, ExtValueStruct } from './shared.model';
import { Substance, SubstanceIdentifierStruct } from '../substance/substance.model';

export default class BaseService {
  constructor($q, dbName, modelClassName, rootXmlName, searchName) {
    this.$q = $q;
    this.dbName = dbName;
    this.modelClassName = modelClassName ? modelClassName : dbName.toUpperCase();
    this.rootXmlName = rootXmlName ? rootXmlName : dbName.toUpperCase();
    this.searchName = searchName ? searchName : (dbName + '_NAME').toUpperCase();
    this.absPath = path.resolve(fs.realpathSync('./'), 'data', dbName + '.db');
    console.log(this.absPath);
    this.db = new Nedb({
      filename: this.absPath,
      autoload: true
    });
  }

  edb_get(obj) {
    let deferred = this.$q.defer();
    if (obj) {
      let keys = Object.keys(obj);
      let re = new RegExp(obj[keys[0]], 'i');
      let condition = { $regex: re };
      let searchObj = {};
      searchObj[keys[0]] = condition;

      console.log(searchObj);
      this.db.find(searchObj, (err, rows) => {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(rows);
        }
      });
    } else {
      this.db.find({}, (err, rows) => {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }
        deferred.resolve(rows);
      });
    }
    return deferred.promise;
  }

  edb_put(obj) {
    let deferred = this.$q.defer();
    if (obj && typeof obj === 'object') {
      let obj2DB = this.jsonToDB(obj);
      this.db.insert(obj, (err, result) => {
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
    if (id && typeof obj === 'string') {
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
    if (obj && typeof obj === 'object') {
      let obj2DB = this.jsonToDB(obj);
      this.db.update({ _id: obj._id }, obj, {}, (err, numReplaced) => {
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

  jsonToDB(obj) {
    return obj;
  }

  jsonToXml(obj) {
    let deferred = this.$q.defer();
    if (obj && typeof obj === 'object') {
      this.db.find({ '_id': obj._id }, (err, result) => {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }
        let sJson = result[0];
        System.import('./components/' + this.modelClassName + '/' + this.modelClassName + '.model')
          .then(entityName => {
            let entity = new entityName[this.modelClassName](sJson);

            let builder = new xml2js.Builder({
              rootName: this.rootXmlName,
              attrkey: 'attr$'
            });

            let xml = builder.buildObject(entity.toGhstsJson());
            deferred.resolve(xml);

          })
          .catch(err => {
            deferred.reject(err);
          });
      });
    } else
      deferred.reject('Error: tring to transforming non-object entity to XML - ' + obj);
    return deferred.promise;
  }

  jsonObjClassifier(obj) {
    let deferred = this.$q.defer();
    let entities = obj;
    let jsObj = null;
    if (obj && obj.constructor === Array) {
//    if (obj && typeof obj === 'object') {
      entities.map(item => {
        let substance = new Substance();
        substance.jsonObjClassifier(item);
        // TODO: insert into db for now, may remove them later on
        this.edb_post(substance);
      });
      console.log(jsObj);
    } else
      deferred.reject('Error: tring to classifier non-object entity from normal JSON object - ' + obj);
    return deferred.promise;
  }
  // inits the db, grabs info from a file and inserts it. NOTE that xml2js creates arrays
  /*  initialize(obj) {
      let entities = obj;
  
      entities.map(item => {
        let substance = new Substance();
        let status = new ValueStruct(item.METADATA_STATUS[0].VALUE[0], item.METADATA_STATUS[0].VALUE_DECODE[0]);
        substance.substanceId = item.attr$.Id;
        substance.METADATA_STATUS = status;
        substance.SUBSTANCE_NAME = item.SUBSTANCE_NAME[0];
        substance.SUBSTANCE_PID = item.SUBSTANCE_PID[0];
        item.SUBSTANCE_IDENTIFIER.forEach(it => {
          let idType = (typeof (it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]) === 'string') ?
            new ExtValueStruct(
              it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0],
              it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0]
            ) :
            new ExtValueStruct(
              it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]._,
              it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0],
              it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0].attr$.Other_Value
            );
          let identifier = new SubstanceIdentifierStruct(idType, it.IDENTIFIER[0]);
          substance.addSubstanceIdentifier(identifier);
        })
  
        // insert into db
        this.createSubstance(substance);
      });
    }
  */
}
