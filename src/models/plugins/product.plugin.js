module.exports = exports = function ProductPlugin(schema, options) {
  schema.remove('dossier');
  schema.add({
    dossier: [{type: 'ObjectId', ref: 'DOSSIER'}]
  });
  console.log('product plugin loaded');
};
