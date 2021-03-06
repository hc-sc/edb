module.exports = exports = function SenderPlugin(schema, options) {
  schema.remove('toLegalEntityId');
  schema.add({
    toLegalEntityId: {type: 'ObjectId', ref: 'LEGALENTITY'},
    _shortname: {type: String}
  });
  schema.virtual('valuedecode').get(function () {
    return this._shortname;
  });
};