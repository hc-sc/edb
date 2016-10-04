const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.ProductService = class ProductService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'products', undefined, 'PRODUCT', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
  }
};
