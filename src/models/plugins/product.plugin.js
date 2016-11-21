module.exports = exports = function ProductPlugin(schema, options) {
  schema.remove('dossier');
  schema.add({
    dossier: [{type: 'ObjectId', ref: 'submission'}]
  });
  console.log('product plugin loaded');
};
