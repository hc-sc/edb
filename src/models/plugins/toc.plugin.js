const Schema = require('mongoose').Schema;

module.exports = exports = function TocPlugin(schema, options) {
  schema.remove('structure');
  schema.add({
    structure: { type: Schema.Types.Mixed, required: true }
  });
  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.tocshortname + ' Version: ' + item._doc.tocversion;
    });
    return retVal;
  });
};