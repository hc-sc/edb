import { ExtValueStruct } from '../common/sharedModel';

class SubstanceIdentifierStruct {
    constructor(value, identifier) {
        this.SUBSTANCE_IDENTIFIER_TYPE = new ExtValueStruct(value.VALUE, value.VALUE_DECODE, value.ATTR_VALUE), 
        this.IDENTIFIER = identifier;
    }

    toGhstsJson() {
        return {
            SUBSTANCE_IDENTIFIER_TYPE: this.SUBSTANCE_IDENTIFIER_TYPE.toGhstsJson(),
            IDENTIFIER: this.IDENTIFIER
        }
    }
}

class Substance {
    constructor(json) {
        if (arguments.length === 1) {
            Object.assign(this, json);
            this.SUBSTANCE_IDENTIFIER = json.SUBSTANCE_IDENTIFIER.map(it => {
                return new SubstanceIdentifierStruct(it.SUBSTANCE_IDENTIFIER_TYPE, it.IDENTIFIER);
            })
        }
        else {
            this._identifier = null;
            this.METADATA_STATUS = null;      // of ValueStruct
            this.SUBSTANCE_NAME = null;
            this.SUBSTANCE_PID = null;
            this.SUBSTANCE_IDENTIFIER = []; // of SubstanceIdentifierStruct
        }
    }
    set substanceId(id){
        this._identifier = id;
    }

    addSubstanceIdentifier(identifier){
        this.SUBSTANCE_IDENTIFIER.push(identifier);
    }

    toGhstsJson() {
        let idsJson = [];
        this.SUBSTANCE_IDENTIFIER.forEach(id => {idsJson.push(id.toGhstsJson())});
        
        return {
            attr$ : {  Id : this._identifier  },
            METADATA_STATUS : this.METADATA_STATUS,
            SUBSTANCE_NAME : this.SUBSTANCE_NAME,
            SUBSTANCE_PID : this.SUBSTANCE_PID,
            SUBSTANCE_IDENTIFIER : idsJson
        };
    }
}

export {Substance, SubstanceIdentifierStruct};
