module.exports = exports = function DocumentPlugin(schema, options) {
  schema.virtual('valuedecode').get(function () {
    return this.documentgeneric.documenttitle;
  });
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });
};
