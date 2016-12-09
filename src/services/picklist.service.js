
const BaseService = require('./base.service');
const SHARED_CONST = require('../constants/shared');

const Q = require('bluebird');
const _ = require('lodash');

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');

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
    return super.edb_get(query);
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
          isExt: { type: Boolean, required: true, default: false },
          _fieldname: { type: String, required: true }
        };
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;
        let mschema = new Schema(jschema, {
          id: false,
          minimize: false
        });
        mschema.plugin(ServiceLevelPlugin, { url: self.modelClassName.toLowerCase() });
        let mmodule = mongoose.model(self.modelClassName, mschema);
        mmodule
          .find({})
          .lean()
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
              let retInMem = result.map(ret => {
                let newRet = ret;
                newRet._id = ret._id.toString();
                return newRet;
              });
              global.modulesInMemory[self.modelClassName.toLowerCase()] = retInMem;
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
};
