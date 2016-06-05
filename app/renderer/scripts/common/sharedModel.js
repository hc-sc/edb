class ValueStruct {
    // TODO: allow the EXTENSTION_*_TYPE to add "Other_value" attr
    constructor(value = 'New', decode = 'New'){
        this.VALUE = value;
        this.VALUE_DECODE = decode;
    }
}

// Matches Types that ar extensible. They support attributes of the form
// <VALUE Other_Value='the value'>other</VALUE>
// <VALUE_DECODE>'the decoded value'</VALUE_DECODE>
class ExtValueStruct {
    constructor(value, decode, value$) {
        this.value = value;
        this.decode = decode;
        this.value$ = value$;
    }
}

export { ValueStruct, ExtValueStruct }