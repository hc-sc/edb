const BaseService = require('./base.service');

module.exports = class SubstanceService extends BaseService {
  constructor(version) {
    super('SUBSTANCE', version);
    this.modelClassNamePre = 'GHSTS.SUBSTANCES';
  }
};

