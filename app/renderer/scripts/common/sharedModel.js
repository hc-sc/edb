class ValueStruct {
    // TODO: allow the EXTENSTION_*_TYPE to add "Other_value" attr
    constructor(value = 'New', decode = 'New'){
        this.VALUE = value;
        this.VALUE_DECODE = decode;
    }
}

class ExtensibleValueStruct {
    constructor(value, decode, attr$, value$) {
        this.value = value;
        this.decode = decode;
        this.attr$ = attr$;
        this.value$ = value$;
    }
}

export { ValueStruct, ExtensibleValueStruct }