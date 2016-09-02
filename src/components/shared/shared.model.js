// Matches all types to one type, whose form is
// For non extensible types  
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
// For types that are extensible
// <VALUE Other_Value='attr_value'>value</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>

const OTHER_VALUE = 'other';

export default class PicklistModel {
  constructor(typename, value, decode, isExt, status, id) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
      } else if (typeof typename === 'string') {
        this._id = id ? id : null;
        this.TYPE_NAME = typename;
        this.VALUE = value;
        this.VALUE_DECODE = decode;
        this.STATUS = status ? status : 'enabled';
        this.isExt = isExt ? isExt : true;
      } else {
        console.log('Error: wrong using of PicklistModel constructor with Type_Name: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of PicklistModel constructor with Type_Name: [' + typename + '] / Value: [' + value + ']');
    }
  }

  toGhstsJson() {
    let output = {};
    if (this.isExt) {
      output = {
        VALUE: {
          '_': this.getOtherValue(),
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
    return output;
  }

  static getOtherValue() {
    return OTHER_VALUE;
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
