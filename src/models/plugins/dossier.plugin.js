module.exports = exports = function DossierPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'SUBMISSION'}],
    product: [{type: 'ObjectId', ref: 'PRODUCT'}]
  });
  console.log('dossier plugin loaded');
};
