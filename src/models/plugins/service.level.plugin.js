// service.level.js
module.exports = exports = function ServiceLevelPlugin(schema, options) {
  schema.add({
    _url: {type: String, required: true, default: options.url},
    _version: { type: String, required: true, default: '01.00.00' },
    _state: { type: String, required: true, default: 'active' },
    _created: { type: Date, required: true, default: Date.now },
    _lastMod: Date
  });

  schema.set('toJSON', { getters: true, virtuals: true });
  schema.set('toObject', { getters: true, virtuals: true });

  schema.pre('save', function (next) {
    this._lastMod = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('_lastMod').index(options.index);
  }
};
