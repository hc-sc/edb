module.exports = exports = function SubmissionPlugin(schema, options) {
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'}
  });
};
