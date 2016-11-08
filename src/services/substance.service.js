const BaseService = require('./base.service');

module.exports = class SubstanceService extends BaseService {
  constructor() {
    super('GHSTS.SUBSTANCES.SUBSTANCE', '01.00.00');
  }
};

