
module.exports = exports = function SubmissionPlugin(schema, options) {
  schema.remove('submissionversiondate');
  schema.add({
    submissionversiondate: {type: Date, require: true, default: '2015-04-21T00:00:00.000Z'}
  });
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'}
  });
};
