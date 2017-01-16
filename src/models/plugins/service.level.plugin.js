
// service.level.js
module.exports = exports = function ServiceLevelPlugin(schema, options) {
  schema.add({
    _url: { type: String, required: true, default: options.url },
    _version: { type: String, required: true, default: '01.00.02' },
    _state: { type: String, required: true, default: 'active' },
    _created: { type: Date, required: true, default: Date.now },
    _lastMod: Date,
    _updateFrom: { type: String }
  });

  schema.pre('save', function (next) {
    this._lastMod = new Date();
    next();
  });

  schema.pre('update', function (next) {
    this.update({}, {$set: {_lastMod: new Date()}});
    next();
  });

  schema.statics.referenceCheck = function (refNameAndId, callback) {
    let refModel = require('mongoose').model(refNameAndId.refName.toUpperCase());
    let query = {};
    refNameAndId.field.map(item => {
      query[item] = refNameAndId._id;
    });
    query = refModel.find(query);
    query.select(refNameAndId.select ? refNameAndId.select : '_id');
    return query.exec(callback);
  };

  if (options && options.index) {
    schema.path('_lastMod').index(options.index);
  }
};
