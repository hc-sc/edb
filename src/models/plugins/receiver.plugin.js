module.exports = exports = function ReceiverPlugin(schema, options) {
  schema.remove(['toLegalEntityId', 'sender']);
  schema.add({
    toLegalEntityId: {type: 'ObjectId', ref: 'LEGALENTITY'},
  });
  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.shortname;
    });
    return retVal;
  });
};
