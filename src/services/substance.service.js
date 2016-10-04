const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.SubstanceService = class SubstanceService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'substances', 'Substance', 'SUBSTANCES', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
  }
};

