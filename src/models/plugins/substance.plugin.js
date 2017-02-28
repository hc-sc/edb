module.exports = exports = function SubstancePlugin(schema, options) {
  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.substancename;
    });
    return retVal;
  });
};
