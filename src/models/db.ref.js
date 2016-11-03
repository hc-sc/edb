const ObjectId = require('tingodb').ObjectId;

module.exports = class DBRef {
  constructor(id, coll, mdstat) {
    this._refId = (id instanceof ObjectId) ? id.toString() : id;
    this._coll = coll;
  }
};