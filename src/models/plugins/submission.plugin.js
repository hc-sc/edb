
module.exports = exports = function SubmissionPlugin(schema, options) {
  schema.remove(['submissionversiondate', 'incremental']);
  schema.add({
    submissionversiondate: {type: Date, required: true},
    incremental: {type: 'Boolean', required: true, default: false}
  });
  schema.add({
    _ghsts: {type: 'ObjectId', ref: 'GHSTS'}
  });

  schema.pre('save', function (next) {
    if (!this.submissionversiondate) {
      let dateStr = (new Date()).toISOString();
      dateStr = dateStr.substr(0, dateStr.indexOf('T'));
      this.submissionversiondate = dateStr + 'T00-00-00Z';
    }
    next();
  });
  schema.virtual('valuedecode').get(function () {
    return this.submissiontitle;
  });
};
