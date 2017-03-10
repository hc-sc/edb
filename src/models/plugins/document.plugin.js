module.exports = exports = function DocumentPlugin(schema, options) {
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });

  schema.index({'documentgeneric.documenttitle' : 1});

  schema.virtual('valuedecode').get(function () {
    return this.documentgeneric.documenttitle;
  });
};
