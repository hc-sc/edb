module.exports = exports = function ProductPlugin(schema, options) {
  let keys = Object.keys(schema.paths);
  let dossiers = keys.filter(key => {
    if (key.startsWith('dossier.'))
      return key;
  });

  schema.remove(dossiers);
  schema.add({
    dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });
  schema.virtual('valuedecode').get(function () {
    return this.genericproductname;
  });
  
};
