module.exports = exports = function DocumentPlugin(schema, options) {
  schema.virtual('valuedecode').get(function () {
    return this.substancename;
  });
};
