import angular from 'angular';
var fs = require('fs');
var path = require('path');
import xml2js from 'xml2js';

import { PicklistModel } from '../shared.model';
import BaseService from '../base.service';

const standardsPath = path.resolve(fs.realpathSync('./'), 'standards');
const version = path.resolve(standardsPath, 'ghsts-picklists.xsd');

const moduleName = 'app.service.picklist';
let moduleInst;

export class PickListService extends BaseService {
  constructor($q) {
    super($q, 'pickListTypes', 'PicklistModel');
    // make sure we aren't duplicating entries when we reload...
    this.edb_get()
      .then(results => {
        if (results.length === 0) {
          console.log('Loading pick lists from XSD from ' + version + ' results.length ' + results.length);
          fs.readFile(version, { encoding: 'utf8' }, (err, data) => {
            if (err) throw err;
            xml2js.parseString(data, { attrkey: 'attr$', explicitArray: false }, (err, obj) => {
              if (err) throw err;

              let types = [];

              const COMPLEX_TYPES = obj['xs:schema']['xs:complexType'].map(type => {
                return type['xs:simpleContent']['xs:extension'].attr$.base;
              });

              for (const item of obj['xs:schema']['xs:simpleType']) {
                const INDEX = COMPLEX_TYPES.indexOf(item.attr$.name);
                const OTHER_VALUE = this.getOtherValue();

                for (const enumeration of item['xs:restriction']['xs:enumeration']) {
                  const APP_INFO = enumeration['xs:annotation']['xs:appinfo'];
                  if (enumeration.attr$.value !== OTHER_VALUE) {

                    let type = {};

                    type.TYPE_NAME = INDEX >= 0 ?
                      `EXTENSION_${item.attr$.name}` : item.attr$.name;
                    type.VALUE = enumeration.attr$.value;
                    type.VALUE_DECODE = APP_INFO.DECODE;
                    type.STATUS = APP_INFO.STATUS;
                    type.isExt = false;

                    types.push(new PicklistModel(type));
                  }
                }
              }

              this.edb_put(types)
                .then(added => {
                  console.log(`${added.length} added.`);
                })
                .catch(err => {
                  console.log(err);
                });
            });

          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  // used to get all types with a given name. Can additionally provide a true/false status, which only returns enabled types
  edb_get(typeName, isEnabled) {
    let query = {};
    if (typeName) {
      query.TYPE_NAME = typeName;
    }
    if (isEnabled === true) {
      query.STATUS = 'enabled';
    }
    return super.edb_get(query);
  }

  static picklistFactory($q) {
    return new PickListService($q);
  }

  getOtherValue() {
    return PicklistModel.getOtherValue();
  }

}

angular.module(moduleName, [])
  .factory('PicklistService', ['$q', function ($q) {
    let q = $q;
    this.getService = function() {
      if (!moduleInst) {
        console.log('get called - init service');
        moduleInst = PickListService.picklistFactory(q);
      }
      return moduleInst;
    }

    return {
      getService: this.getService
    };
  }]);

export default moduleName;
