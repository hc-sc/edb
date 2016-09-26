const BaseService = require('./services/base.service');

exports.SubstanceService = class SubstanceService extends BaseService {
  constructor($q) {
    super($q, 'substances');
  }
}

