module.exports = exports = function ReceiverPlugin(schema, options) {
  schema.remove('toLegalEntityId');
  schema.add({
    toLegalEntityId: {type: 'ObjectId', ref: 'LEGALENTITY'}
  });
  schema.set('toObject', {virtuals : true});
  schema.set('toJSON', {virtuals : true});
};
