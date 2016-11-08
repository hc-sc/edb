const SHARED_CONST = require('../constants/shared');
const BACKEND_CONST = require('../constants/backend');

// const Q = require('bluebird');

// global.TUNGUS_DB_OPTIONS =  { nativeObjectID: true, searchInArray: true };
// const tungus = require('tungus');
const mongoose = require('mongoose');
// mongoose.Promise = Q;

const Schema = mongoose.Schema;

// const lastMod = require('./lastMod.plugin');

const moduleSchema = new Schema({
  _version: { type: String, required: true },
  _state: { type: String, required: true },
  _created: { type: Date, required: true, default: Date.now },

  TYPE_NAME: { type: String, require: true },
  VALUE: { type: String, require: true },
  VALUE_DECODE: { type: String, require: true },
  STATUS: { type: String, require: true, default: 'enabled' },
  isExt: { type: Boolean, require: true, default: true }
});

module.exports = class Picklist {
  constructor(typename, value, decode, isExt, status, id, version, state) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
      } else if (typeof typename === 'string') {
        if (id)
          this._id = id;
        this._version = version ? version : BACKEND_CONST.DEFAULT_GHSTS_VERSION;
        this._state = state ? state : BACKEND_CONST.ACTIVE_ITEM_STATE_NAME;
        this._createdAt = new Date();
        this._updatedAt = this._createdAt;

        this.TYPE_NAME = typename;
        this.VALUE = value;
        this.VALUE_DECODE = decode;
        this.STATUS = status ? status : 'enabled';
        this.isExt = (isExt !== 'undefined') ? isExt : true;

      } else {
        console.log('Error: wrong using of Picklist constructor with Type_Name 1: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of Picklist constructor with Type_Name 2: [' + typename + '] / Value: [' + value + ']');
    }
  }

  jsonObjClassifierFromXml(jsonXml) {
    if (jsonXml.VALUE) {
      if (jsonXml.VALUE.attr$ || jsonXml.VALUE._) {
        this.VALUE = jsonXml.VALUE.attr$.Other_Value;
        this.VALUE_DECODE = jsonXml.VALUE_DECODE;
        return;
      }
    }
    this.VALUE = jsonXml.VALUE;
    this.VALUE_DECODE = jsonXml.VALUE_DECODE;
  }

  toGhstsJson() {
    let output = {};
    if (this.VALUE || this.VALUE_DECODE) {
      if (this.isExt) {
        output = {
          VALUE: {
            '_': Picklist.getOtherValue(),
            'attr$': {
              'Other_Value': this.VALUE.length > 0 ? this.VALUE : this.VALUE_DECODE
            }
          },
          VALUE_DECODE: this.VALUE_DECODE
        };
      }
      else {
        output = {
          VALUE: this.VALUE,
          VALUE_DECODE: this.VALUE_DECODE
        };
      }
    }
    return output;
  }

  static getOtherValue() {
    return SHARED_CONST.PICKLIST_OTHER_VALUE;
  }
};