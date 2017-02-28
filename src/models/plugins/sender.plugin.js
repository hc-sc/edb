module.exports = exports = function SenderPlugin(schema, options) {
  schema.remove('toLegalEntityId');
  schema.add({
    toLegalEntityId: {type: 'ObjectId', ref: 'LEGALENTITY'},
    _shortname: {type: String}
  });
  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc._shortname;
    });
    return retVal;
  });
};
