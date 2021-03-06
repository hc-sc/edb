
const BaseService = require('./base.service');
const SHARED_CONST = require('../constants/shared');

const Q = require('bluebird');
const _ = require('lodash');

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');
const PicklistFieldsConfig = require('../configs/picklist.fields');

module.exports = class PickListService extends BaseService {
  constructor(version) {
    super('Picklist', true, version);
  }
  // used to get all types with a given name. Can additionally provide a true/false status, which only returns enabled types
  edb_get(typeName, isEnabled) {
    let query = { data: {} };
    if (typeof typeName === 'object') {
      query.data = typeName;
    } else if (typeof typeName === 'string') {
      query.data.TYPE_NAME = typeName;
      if (isEnabled === true) {
        query.data.STATUS = 'enabled';
      }
    }
    return new Q((res, rej) => {
      super.edb_get(query, undefined, undefined, 'lowvaluedecode')
        .then(rets => {
          let data = JSON.parse(rets.data);
          data.sort((a, b) => {
            return a.lowvaluedecode.localeCompare(b.lowvaluedecode);
          });
          res(new RVHelper('EDB00000', JSON.stringify(data)));
        })
        .catch(err =>{
          rej(err);
        });
    });
  }

  initMongoose() {
    return new Q((res, rej) => {
      let self = this;
      try {
        let jschema = {
          TYPE_NAME: { type: String, required: true },
          value: { type: String, required: true },
          valuedecode: { type: String, required: true, default: '' },
          status: { type: String, required: true, default: 'enabled' },
          isExt: { type: Boolean, required: true, default: false }
        };
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;
        let mschema = new Schema(jschema, {
          retainKeyOrder: true,
          validateBeforeSave: false,
          toJSON: { getters: true, virtuals: true },
          toObject: { getters: true, virtuals: true }
        });
        mschema.plugin(ServiceLevelPlugin, { url: self.modelClassName.toLowerCase() });
        mschema.virtual('lowvaluedecode').get(function () {
          return this.valuedecode.toLowerCase();
        });
        let mmodule = mongoose.model(self.modelClassName, mschema);
        mmodule
          .find({})
          .exec((err, result) => {
            if (err)
              rej(err);
            else if (result.length === 0) {
              self.initFromXSD('ghsts-picklists.xsd')
                .then(result => {
                  res(result);
                })
                .catch(err => {
                  rej(err);
                });
            } else {
              global.modulesInMemory[self.modelClassName.toLowerCase()] = self._format4InMem(result);
              res(new RVHelper('EDB00000'));
            }
          });
      } catch (err) {
        rej(err);
      }
    });
  }

  getOtherValue() {
    return SHARED_CONST.PICKLIST_OTHER_VALUE;
  }

  static toJsonix(id) {
    let retVal = {};
    let dbValue = PickListService.edb_getSync({_id: id})[0];
    delete retVal.id;
    let pklDef = _.filter(PicklistFieldsConfig, {typename:dbValue.TYPE_NAME})[0];

    retVal.TYPE_NAME = pklDef.fieldPath ? pklDef.fieldPath : pklDef.jsonixName;
    retVal.valuedecode = dbValue.valuedecode;

    if (dbValue.isExt) {
      retVal.value = {
        TYPE_NAME: pklDef.jsonixName,
        otherValue: dbValue.value,
        value: SHARED_CONST.PICKLIST_OTHER_VALUE
      };
    } else if (pklDef.isExt) {
      retVal.value = {
        TYPE_NAME: pklDef.jsonixName,
        value: dbValue.value
      };
    } else {
      retVal.value = dbValue.value;
    }
    return retVal;
  }

};
