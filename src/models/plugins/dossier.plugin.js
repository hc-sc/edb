module.exports = exports = function DossierPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'SUBMISSION'}],
    product: [{type: 'ObjectId', ref: 'PRODUCT'}]
  });

  schema.virtual('valuedecode').get(function () {
    return this.dossierdescriptiontitle;
  });
};
