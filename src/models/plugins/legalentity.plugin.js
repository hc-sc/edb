module.exports = exports = function LegalEntityPlugin(schema, options) {
  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.legalentityname;
    });
    return retVal;
  });
};
