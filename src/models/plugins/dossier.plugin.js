module.exports = exports = function DossierPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'SUBMISSION'}],
    product: [{type: 'ObjectId', ref: 'PRODUCT'}],
    _tocId: {type: String}
  });

  schema.virtual('valuedecode').get(function () {
    return this.dossierdescriptiontitle;
  });
};
