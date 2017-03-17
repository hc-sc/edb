module.exports = exports = function SubmissionPlugin(schema, options) {
  schema.remove(['submissionversiondate', 'incremental']);
  schema.add({
    submissionversiondate: {type: Date, required: true, default: Date.now},
    incremental: {type: 'Boolean', required: true, default: false}
  });
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'}
  });
  schema.virtual('valuedecode').get(function () {
    return this.submissiontitle;
  });
};