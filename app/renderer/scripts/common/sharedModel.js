// Matches non extensible types, whose form is
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
class ValueStruct {
    constructor(value = 'New', decode = 'New'){
        this.VALUE = value;
        this.VALUE_DECODE = decode;
    }
}

// Matches Types that are extensible. They support the standard form above AND attributes of the form
// <VALUE Other_Value='attr_value'>value</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>
class ExtValueStruct {
    constructor(value, decode, attrValue) {
        if (attrValue) {
            this.ATTR_VALUE = attrValue;
        }
        this.VALUE = value; // will be value if no attribute, and _ if there is
        this.VALUE_DECODE = decode; // will be value decode   
    }
    
    toGhstsJson() {
        let output = {};
        if (this.ATTR_VALUE) {
            output = {
                VALUE: { 
                    '_': this.VALUE,
                    'attr$': {
                        'Other_Value': this.ATTR_VALUE 
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

export { ValueStruct, ExtValueStruct };