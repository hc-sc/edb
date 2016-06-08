// Matches non extensible types, whose form is
// <VALUE>value</VALUE>
// <VALUE_DECODE>decode</VALUE_DECODE>
class ValueStruct {
    constructor(value, decode){
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
        if (attrValue) {
            this.ATTR_VALUE = attrValue;
        }
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