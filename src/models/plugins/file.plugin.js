module.exports = exports = function FilePlugin(schema, options) {
  schema.virtual('valuedecode').get(function () {
    return this.filegeneric.filename;
  });
};
