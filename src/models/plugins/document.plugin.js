module.exports = exports = function DocumentPlugin(schema, options) {
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: { type: 'ObjectId', ref: 'DOSSIER'},
    _docsourcetype: {type: Boolean,  default: true}
  });

  let keys = Object.keys(schema.paths);
  let documentcontentstatushistory = keys.filter(key => {
    if (key.startsWith('documentgeneric.documentcontentstatushistory'))
      return key;
  });

  schema.remove(documentcontentstatushistory);

  schema.index({
    'documentgeneric.documenttitle': 1
  });
  schema.virtual('valuedecode').get(function () {
    return this.documentgeneric.documenttitle;
  });
};