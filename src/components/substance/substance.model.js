import { BaseModel } from '../shared/shared.model';

class SubstanceIdentifierStruct extends BaseModel {
  constructor(jsonDB) {
    super('substance');
    if (arguments.length === 1) {
      this._initFromDB(jsonDB);
    }
    else {
      this.SUBSTANCE_IDENTIFIER_TYPE = null;
      this.IDENTIFIER = null;
    }
  }
}

class Substance extends BaseModel {
  constructor(jsonDB) {
    super('substance', 'substance');
    if (arguments.length === 1) {
      this._initFromDB(jsonDB);
    }
    else {
      this._identifier = null;
      this.METADATA_STATUS = null;      
      this.SUBSTANCE_NAME = null;
      this.SUBSTANCE_PID = null;
      this.SUBSTANCE_IDENTIFIER = []; 
    }
  }

  addSubstanceIdentifier(identifier) {
    this.SUBSTANCE_IDENTIFIER.push(identifier);
  }
}

export { Substance, SubstanceIdentifierStruct };