const BaseService = require('./base.service');

module.exports = class ProductService extends BaseService {
  constructor(version) {
    super('PRODUCT', version);
    this.modelClassNamePre = 'GHSTS';
  }
};
