module.exports = exports = function SubstancePlugin(schema, options) {
  schema.virtual('valuedecode').get(function () {
    return this.substancename;
  });
};