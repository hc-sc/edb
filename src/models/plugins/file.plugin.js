module.exports = exports = function FilePlugin(schema, options) {
  schema.add({
    _filereallocation: {type: 'String', required: true}
  });

  schema.virtual('valuedecode').get(function () {
    return this.filegeneric.filename;
  });
};
