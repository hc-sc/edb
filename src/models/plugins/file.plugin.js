module.exports = exports = function FilePlugin(schema, options) {
  schema.add({
    _filereallocation: {type: 'String', required: true},
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'},
    _dossier: {type: 'ObjectId', ref: 'DOSSIER'}
  });

  schema.virtual('valuedecode').get(function () {
    return this.filegeneric.filename;
  });
};