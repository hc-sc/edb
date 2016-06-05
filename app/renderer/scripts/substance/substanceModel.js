class SubstanceIdentifierStruct {
    constructor(value, identifier){
        this.SUBSTANCE_IDENTIFIER_TYPE = value,         // of ValueStruct
        this.IDENTIFIER = identifier;
    }
}

class Substance {
    constructor(json) {
        if (arguments.length === 1) {
            Object.assign(this, json);
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

    
    //TODO: modify for Identifier Extension types
    toGHSTSJson() {
        let idsJson = [];
        this.SUBSTANCE_IDENTIFIER.forEach(id => idsJson.push(id));
        
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
