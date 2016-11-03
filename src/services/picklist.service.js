const path = require('path');

const PicklistModel = require('../models/picklist.model');
const BaseService = require('./base.service');

module.exports = class PickListService extends BaseService {
  constructor() {
    super('pickListTypes', 'PicklistModel', undefined);
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

  initFromXSD() {

    let version = path.resolve('./', 'resources', 'app', 'standards', 'ghsts-picklists.xsd');
    // make sure we aren't duplicating entries when we reload...
    return super.initFromXSD(version);
  }

  getOtherValue() {
    return PicklistModel.getOtherValue();
  }
};
