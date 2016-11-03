const BaseService = require('./base.service');

module.exports = class SubstanceService extends BaseService {
  constructor() {
    super('substances', 'Substance', 'SUBSTANCES');
  }
};

