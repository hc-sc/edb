const Tingodb = require('tingodb')({nativeObjectID: true}).Db;
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const fs = require('fs');
const path = require('path');
const Q = require('bluebird');

module.exports = class TingoDBWrap {
  constructor(dbName) {
    this.dbName = dbName;
    this.absPath = path.resolve(fs.realpathSync('./'), 'data');
    this.db = new Tingodb(this.absPath, {}).collection(this.dbName);
  }

  *find(obj) {
    let query = obj;
    yield; 
    let retVal = this._findWrap(query);
    return retVal;
  }

  _findWrap(obj) {
    let self = this;
    return new Q((resolve, reject) => {
      self.db.find(obj).toArray((err, result) => {
        if (err) {
          reject(new RVHelper('EDB10000', err));
        } else {
          resolve(new RVHelper('EDB00000', result));
        }
      });
    });
  }

  *insert(obj) {
    return yield this.insertWrap(obj);
  }

  _insertWrap(obj) {
    let self = this;
    return new Q((resolve, reject) => {
      if (!obj) 
        reject(new RVHelper('EDB11004'));
      self.db.insert(obj, (err, result) => {
        if (err) {
          reject(new RVHelper('EDB10000', err));
        } else {
          resolve(new RVHelper('EDB00000', result));
        }
      });      
    });
  }

  *update(obj) {
    return yield this._updateWrap(obj);
  }

  _updateWrap(obj) {
    let self = this;
    return new Q((resolve, reject) => {
      self.db.update({ _id: obj._id }, obj, {}, (err, numReplaced) => {
        if (err) {
          reject(new RVHelper('EDB10000', err));
        } else {
          resolve(new RVHelper('EDB00000', numReplaced));
        }
      });
    });
  }

  *remove(id) {
    return yield this._removeWrap(id);
  }

  _removeWrap(id) {
    let self = this;
    return new Q((resolve, reject) => {
      self.db.remove({ '_id': id }, function (err, res) {
        if (err) {
          reject(new RVHelper('EDB10000', err));
        } else {
          resolve(new RVHelper('EDB00000', res.affectedRows));
        }
      });
    });
  }

  *consum(obj) {
    let self = this;
    let query = obj;
    return self._insertWrap(
      yield self._findWrap(query)
      );
  }
};