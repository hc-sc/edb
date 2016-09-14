import { generatePid, validatePid } from '../shared/pid';
import { BaseModel, PicklistModel } from '../shared/shared.model';

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

  beforeToDB() {
    let status = new PicklistModel('METADATA_STATUS');
    let now = Date.now();

    super.beforeToDB();
    this.METADATA_STATUS = this.METADATA_STATUS ? this.METADATA_STATUS : status;
    //TODO: temporary set value for new Id, needs to be defected to the new business role   
    this._identifier = this._identifier ? this._identifier : 'IDS' + now;
    this.SUBSTANCE_PID = this.SUBSTANCE_PID ? (validatePid(this.SUBSTANCE_PID) ? this.SUBSTANCE_PID : generatePid()) : generatePid();
  }

  addSubstanceIdentifier(identifier) {
    this.SUBSTANCE_IDENTIFIER.push(identifier);
  }
}

export { Substance, SubstanceIdentifierStruct };