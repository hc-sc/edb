var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');

const PicklistModel = require('../models/picklist.model');
const BaseService = require('./base.service');
const RVHelper = require('../utils/return.value.helper');
const BACKEND_CONST = require('../constants/backend');

var _ = require('lodash');

var picklistInMemory = null;

module.exports = class PickListService extends BaseService {
  constructor($q, level) {
    super($q, 'pickListTypes', 'PicklistModel', undefined, BACKEND_CONST.APP_LEVEL_SERVICE);
  }
  // used to get all types with a given name. Can additionally provide a true/false status, which only returns enabled types
  edb_get(typeName, isEnabled) {
    let query = {};
    if (typeof typeName === 'object') {
      query = typeName;
    } else if (typeof typeName === 'string') {
      query.TYPE_NAME = typeName;
      if (isEnabled === true) {
        query.STATUS = 'enabled';
      }
    }
    return super.edb_get(query);
  }

  static picklistFactory($q) {
    return new PickListService($q);
  }

  initPicklistFromXSD() {
    let deferred = this.$q.defer();

    // make sure we aren't duplicating entries when we reload...
    this.edb_get()
      .then(results => {
        if (results.data.length === 0) {
          let version = path.resolve('./', 'resources', 'app', 'standards', 'ghsts-picklists.xsd');
          
          console.log(version);
          fs.readFile(version, { encoding: 'utf8' }, (err, data) => {
            if (err) {
              deferred.reject(err);
            } else {
              xml2js.parseString(data, { attrkey: 'attr$', explicitArray: false }, (err, obj) => {
                if (err) {
                  deferred.reject(err);
                } else {
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
                      picklistInMemory = added;
                      deferred.resolve(new RVHelper('EDB20001', `${added.length} added.`));
                    })
                    .catch(err => {
                      deferred.reject(err);
                    });
                }
              });
            }
          });
        } else {
          deferred.resolve(new RVHelper('EDB20001'));
        }
      })
      .catch(err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  getOtherValue() {
    return PicklistModel.getOtherValue();
  }

  edb_getSync(obj) {
    let retVal = [];
    retVal = _.filter(picklistInMemory, obj);

    return retVal;
  }
};

