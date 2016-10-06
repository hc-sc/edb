const PID = require('../utils/pid');
const BaseModel = require('./base.model');
const PicklistModel = require('./picklist.model');

exports.SubstanceIdentifierStruct = class SubstanceIdentifierStruct extends BaseModel {
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
};

exports.Substance = class Substance extends BaseModel {
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
    this.SUBSTANCE_PID = this.SUBSTANCE_PID ? (PID.validatePid(this.SUBSTANCE_PID) ? this.SUBSTANCE_PID : PID.generatePid()) : PID.generatePid();
  }

  addSubstanceIdentifier(identifier) {
    this.SUBSTANCE_IDENTIFIER.push(identifier);
  }
};