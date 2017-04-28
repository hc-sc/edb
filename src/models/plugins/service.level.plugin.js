const SHARED_CONST = require('../../constants/shared');
const BACKEND_CONST = require('../../constants/backend');

// service.level.js
module.exports = exports = function ServiceLevelPlugin(schema, options) {
  let defState = (options.url === 'dossier') ? SHARED_CONST.DOSSIER_STATUS_OPEN : (options.url === 'submission') ? SHARED_CONST.SUBMISSION_STATUS_IN_PROGRESS : SHARED_CONST.STATUS_ACTIVE;
  schema.add({
    _url: { type: String, required: true, default: options.url },
    _version: { type: String, required: true, default: '' },
    _state: { type: String, required: true, default: defState },
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

  schema.post('find', ret => {
    let retVal = ret.map(item => {
      if (BACKEND_CONST.ID_PREFIX[item._doc._url])
        item._doc.id = BACKEND_CONST.ID_PREFIX[item._doc._url] + item._doc._id;
      else
        item._doc.id = item._doc._id;
    });
    return retVal;
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
