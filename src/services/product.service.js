const BaseService = require('./base.service');

module.exports = class ProductService extends BaseService {
  constructor() {
    super('products', undefined, 'PRODUCT');
  }
};
