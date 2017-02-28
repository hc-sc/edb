module.exports = exports = function FilePlugin(schema, options) {
  schema.add({
    _filereallocation: {type: 'String', required: true},
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });

  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.filegeneric.filename;
    });
    return retVal;
  });

};
