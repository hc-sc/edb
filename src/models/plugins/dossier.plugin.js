module.exports = exports = function DossierPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'SUBMISSION'}],
    product: [{type: 'ObjectId', ref: 'PRODUCT'}]
  });

  schema.post('find', ret => {
    let retVal = ret.map(item => {
      item._doc.valuedecode = item._doc.dossierdescriptiontitle;
    });
    return retVal;
  });
};
