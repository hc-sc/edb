const BaseService = require('./base.service');

module.exports = class SubstanceService extends BaseService {
  constructor(version) {
    super('SUBSTANCE', true, version);
    this.modelClassNamePre = 'GHSTS.SUBSTANCES';
    this.referencedBy = {refName: ['product', 'ghsts'], field: {product: ['ingredients.ingredient.toSubstanceId'], ghsts: ['_product']}};
    this.pidField = 'substancepid';
  }
};

