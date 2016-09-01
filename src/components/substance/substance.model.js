import { PicklistModel } from '../shared/shared.model';

class SubstanceIdentifierStruct {
  constructor(value, identifier) {
    this.SUBSTANCE_IDENTIFIER_TYPE = new PicklistModel(value),
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
  constructor(jsonDB) {
    if (arguments.length === 1) {
      Object.assign(this, jsonDB);
      this.SUBSTANCE_IDENTIFIER = jsonDB.SUBSTANCE_IDENTIFIER.map(it => {
        return new SubstanceIdentifierStruct(it.SUBSTANCE_IDENTIFIER_TYPE, it.IDENTIFIER);
      });
    }
    else {
      this._identifier = null;
      this.METADATA_STATUS = null;      // of ValueStruct
      this.SUBSTANCE_NAME = null;
      this.SUBSTANCE_PID = null;
      this.SUBSTANCE_IDENTIFIER = []; // of SubstanceIdentifierStruct
    }
  }
  set substanceId(id) {
    this._identifier = id;
  }

  addSubstanceIdentifier(identifier) {
    this.SUBSTANCE_IDENTIFIER.push(identifier);
  }

  jsonObjClassifier(jsonXML) {
    let item = jsonXML;
    let status = new PicklistModel('METADATA_STATUS', item.METADATA_STATUS.VALUE, item.METADATA_STATUS.VALUE_DECODE);
    this.substanceId = item.attr$.Id;
    this.METADATA_STATUS = status;
    this.SUBSTANCE_NAME = item.SUBSTANCE_NAME;
    this.SUBSTANCE_PID = item.SUBSTANCE_PID;
    item.SUBSTANCE_IDENTIFIER.forEach(it => {
      let idType = (typeof (it.SUBSTANCE_IDENTIFIER_TYPE.VALUE) === 'string') ?
        new PicklistModel(
          'SUBSTANCE_IDENTIFIER',
          it.SUBSTANCE_IDENTIFIER_TYPE.VALUE,
          it.SUBSTANCE_IDENTIFIER_TYPE.VALUE_DECODE
        ) :
        new PicklistModel(
          'SUBSTANCE_IDENTIFIER',
          it.SUBSTANCE_IDENTIFIER_TYPE.VALUE._,
          it.SUBSTANCE_IDENTIFIER_TYPE.VALUE_DECODE,
          it.SUBSTANCE_IDENTIFIER_TYPE.VALUE.attr$.Other_Value
        );
      let identifier = new SubstanceIdentifierStruct(idType, it.IDENTIFIER);
      this.addSubstanceIdentifier(identifier);
    });
  }

  toGhstsJson() {
    let idsJson = [];
    this.SUBSTANCE_IDENTIFIER.forEach(id => { idsJson.push(id.toGhstsJson()) });

    return {
      attr$: { Id: this._identifier },
      METADATA_STATUS: this.METADATA_STATUS,
      SUBSTANCE_NAME: this.SUBSTANCE_NAME,
      SUBSTANCE_PID: this.SUBSTANCE_PID,
      SUBSTANCE_IDENTIFIER: idsJson
    };
  }
}

export {Substance, SubstanceIdentifierStruct};
