module.exports = exports = function DocumentPlugin(schema, options) {
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });

  schema.index({'documentgeneric.documenttitle' : 1});

  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.documentgeneric.documenttitle;
    });
    return retVal;
  });
};
