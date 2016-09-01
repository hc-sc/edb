// Matches all types to one type, whose form is
// For non extensible types  
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
// For types that are extensible
// <VALUE Other_Value='attr_value'>value</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>

export default class PicklistModel {
  constructor(name, value, decode, attrValue, status) {
    if (name && typeof name === 'object') {
      this._initObj(name);
    } else if (name && value && decode && !attrValue) {
      this._initNoExt(name, value, decode, status);
    } else if (name && attrValue) {
      this._initExt(name, value, decode, attrValue, status);
    } else {
      console.log('Error: wrong use PicklistModel constructor with Name: [' + name + '] / Value: [' + value + ']');
    }
  }

  _initExt(name, value, decode, attrValue, status) {
    this._initNoExt(name, value, decode, status);
    this.VALUE_DECODE = attrValue;
    this.isExt = true;
  }

  _initNoExt(name, value, decode, status) {
    this._id = null;
    this.NAME = name;
    this.VALUE = value;
    this.VALUE_DECODE = decode;
    this.STATUS = status;
    this.isExt = false;
  }

  _initObj(obj) {
    Object.assign(this, obj);
  }
}

// Matches non extensible types, whose form is
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
class ValueStruct {
  constructor(value, decode) {
    this.VALUE = value;
    this.VALUE_DECODE = decode;
  }
}

// Matches Types that are extensible. They support the standard form above AND attributes of the form
// <VALUE Other_Value='attr_value'>value</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>
class ExtValueStruct extends ValueStruct {
  constructor(value, decode, attrValue) {
    super(value, decode);
    if (attrValue != undefined && attrValue !== 'undefined') {
      this.ATTR_VALUE = attrValue;
    }
  }

  toGhstsJson() {
    let output = {};
    if (this.ATTR_VALUE != undefined && this.ATTR_VALUE !== 'undefined') {
      output = {
        VALUE: {
          '_': this.VALUE,
          'attr$': {
            'Other_Value': this.ATTR_VALUE.length > 0 ? this.ATTR_VALUE : this.VALUE_DECODE
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
    return output;
  }
}

export { PicklistModel, ValueStruct, ExtValueStruct };
