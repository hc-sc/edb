module.exports = exports = function DossierPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'submission'}],
    _product: {type: 'ObjectId', ref: 'product'}
  });
  console.log('dossier plugin loaded');
};
