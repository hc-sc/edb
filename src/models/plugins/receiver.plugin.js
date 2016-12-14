module.exports = exports = function ReceiverPlugin(schema, options) {
  schema.remove('toLegalEntityId');
  schema.add({
    toLegalEntityId: {type: 'ObjectId', ref: 'LEGALENTITY'}
  });
  schema.virtual('valuedecode').get(function () {
    return this.shortname;
  });
};
