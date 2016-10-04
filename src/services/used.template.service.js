const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.Used_TemplateService = class Used_TemplateSerService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'usedtemplates', undefined, 'USED_TEMPLATES', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
  }

};
