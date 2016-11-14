
const Picklist = require('../models/picklist.model');
const BaseService = require('./base.service');

const Q = require('bluebird');
const _ = require('lodash');

const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');

const moduleInMemory = {};

module.exports = class PickListService extends BaseService {
  constructor(version) {
    super('Picklist', version, true);
  }
  // used to get all types with a given name. Can additionally provide a true/false status, which only returns enabled types
  edb_get(typeName, isEnabled) {
    let query = {data: {}};
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
          isExt: { type: Boolean, required: true, default: false }
        };
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;
        let mschema = new Schema(jschema);
        mschema.plugin(ServiceLevelPlugin, { url: self.modelClassName.toLowerCase() });
        let mmodule = mongoose.model(self.modelClassName, mschema);
        mmodule
          .find({})
          .then(result => {
            if (result.length === 0) {
              return super.initFromXSD('ghsts-picklists.xsd');
            } else {
              global.modulesInMemory[self.modelClassName.toLowerCase()] = result;
              console.log('set - ' + global.modulesInMemory[self.modelClassName.toLowerCase()].length);
              res(new RVHelper('EDB00000'));
            }
          })
          .catch(err => {
            rej(new RVHelper('EDB10000', err));
          });
      } catch (err) {
        rej(new RVHelper('EDB10000', err));
      }
    });
  }

  getOtherValue() {
    return Picklist.getOtherValue();
  }
};
