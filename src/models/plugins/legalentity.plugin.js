module.exports = exports = function LegalEntityPlugin(schema, options) {
  schema.virtual('valuedecode').get(function () {
    return this.legalentityname;
  });
};
