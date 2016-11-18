module.exports = exports = function ServiceLevelPlugin(schema, options) {
  schema.remove('submission');
  schema.add({
    submission: [{type: 'ObjectId', ref: 'submission'}]
  });
};
