const SHARED_CONST = require('../constants/shared');

module.exports = class PicklistModel {
  constructor(typename, value, decode, isExt, status, id) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
      } else if (typeof typename === 'string') {
        if (id)
          this._id = id;
        this.TYPE_NAME = typename;
        this.VALUE = value;
        this.VALUE_DECODE = decode;
        this.STATUS = status ? status : 'enabled';
        this.isExt = (isExt !== 'undefined') ? isExt : true;
      } else {
        console.log('Error: wrong using of PicklistModel constructor with Type_Name 1: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of PicklistModel constructor with Type_Name 2: [' + typename + '] / Value: [' + value + ']');
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
            '_': PicklistModel.getOtherValue(),
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
