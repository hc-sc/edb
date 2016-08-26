import { Submission } from '../submission/submission.model';
import { ExtValueStruct } from '../shared/shared.model';

class Dossier {
  constructor(json) {
    if (arguments.length === 1) {
      this.DOSSIER_PID = json.DOSSIER_PID;
      this.DOSSIER_DESCRIPTION_TITLE = json.DOSSIER_DESCRIPTION_TITLE;
      this.DOSSIER_COMP_ID = json.DOSSIER_COMP_ID;
      this.REFERENCED_DOSSIER = json.REFERENCED_DOSSIER.map(refDos => {
        return new ReferencedDossier(refDos);
      });
      this.DOSSIER_RA = json.DOSSIER_RA.map(dosRA => {
        return new DossierRA(dosRA);
      });
      this.SUBMISSION = json.SUBMISSION.map(sub => {
        return new Submission(sub);
      });

      if (json._id) {
        this._id = json._id;
      }
    }
    else {
      this.DOSSIER_PID = null;
      this.DOSSIER_DESCRIPTION_TITLE = null;
      this.DOSSIER_COMP_ID = null;
      this.REFERENCED_DOSSIER = [];
      this.DOSSIER_RA = [];
      this.SUBMISSION = [];
    }
  }

  addReferencedDossier(rd) {
    this.REFERENCED_DOSSIER.push(rd);
  }

  addDossierRA(dr) {
    this.DOSSIER_RA.push(dr);
  }

  addSubmission(sub) {
    this.SUBMISSION.push(sub);
  }

  toGhstsJson() {
    const refDossiers = this.REFERENCED_DOSSIER.map(rd => {
      return rd.toGhstsJson();
    });

    const dossierRAs = this.DOSSIER_RA.map(dr => {
      return dr.toGhstsJson();
    });

    const submissions = this.SUBMISSION.map(sub => {
      return sub.toGhstsJson();
    });

    return {
      DOSSIER_PID: this.DOSSIER_PID,
      DOSSIER_DESCRIPTION_TITLE: this.DOSSIER_DESCRIPTION_TITLE,
      DOSSIER_COMP_ID: this.DOSSIER_COMP_ID,
      REFERENCED_DOSSIER: refDossiers,
      DOSSIER_RA: dossierRAs,
      SUBMISSION: submissions
    };
  }
}

class ReferencedDossier {
  constructor(json) {
    if (arguments.length === 1) {
      this.REFERENCED_DOSSIER_NUMBER = json.REFERENCED_DOSSIER_NUMBER;
      this.REFERENCED_DOSSIER_REASON = json.REFERENCED_DOSSIER_REASON;
    }
    else {
      this.REFERENCED_DOSSIER_NUMBER = null;
      this.REFERENCED_DOSSIER_REASON = null;
    }
  }

  toGhstsJson() {
    return {
      REFERENCED_DOSSIER_NUMBER: this.REFERENCED_DOSSIER_NUMBER,
      REFERENCED_DOSSIER_REASON: this.REFERENCED_DOSSIER_REASON
    };
  }
}

class DossierRA {
  constructor(json) {
    if (arguments.length === 1) {
      this._toSpecificForRAId = json._toSpecificForRAId;
      this.PROJECT_ID_NUMBER = json.PROJECT_ID_NUMBER;

      if (json.REGULATORY_TYPE.ATTR_VALUE != undefined &&
        json.REGULATORY_TYPE.ATTR_VALUE !== 'undefined') {
        this.REGULATORY_TYPE = new ExtValueStruct(
          json.REGULATORY_TYPE.VALUE,
          json.REGULATORY_TYPE.VALUE_DECODE,
          json.REGULATORY_TYPE.ATTR_VALUE
        );
      }
      else {
        this.REGULATORY_TYPE = new ExtValueStruct(
          json.REGULATORY_TYPE.VALUE,
          json.REGULATORY_TYPE.VALUE_DECODE
        );
      }

      if (json.APPLICATION_TYPE.ATTR_VALUE != undefined &&
        json.APPLICATION_TYPE.ATTR_VALUE !== 'undefined') {
        this.APPLICATION_TYPE = new ExtValueStruct(
          json.APPLICATION_TYPE.VALUE,
          json.APPLICATION_TYPE.VALUE_DECODE,
          json.APPLICATION_TYPE.ATTR_VALUE
        );
      }
      else {
        this.APPLICATION_TYPE = new ExtValueStruct(
          json.APPLICATION_TYPE.VALUE,
          json.APPLICATION_TYPE.VALUE_DECODE
        );
      }
    }
    else {
      this._toSpecificForRAId = '';
      this.REGULATORY_TYPE = new ExtValueStruct();
      this.APPLICATION_TYPE = new ExtValueStruct();
      this.PROJECT_ID_NUMBER = [];
    }
  }

  setRAId(id) {
    this._toSpecificForRAId = id;
  }

  setRegulatoryValueDecode(decode) {
    this.REGULATORY_TYPE.VALUE_DECODE = decode;
  }

  setApplicationValueDecode(decode) {
    this.APPLICATION_TYPE.VALUE_DECODE = decode;
  }

  toGhstsJson() {
    // the project id numbers taken from the DB are an array,
    // but if we create a new DossierRA, they are a string value,
    // so need to turn them into an array for correct XML output
    if (!Array.isArray(this.PROJECT_ID_NUMBER)) {
      let numbers = this.PROJECT_ID_NUMBER.split(',');
      numbers = numbers.map(item => {
        return item.trim();
      });

      this.PROJECT_ID_NUMBER = numbers;
    }

    return {
      attr$: { To_Specific_for_RA_Id: this._toSpecificForRAId },
      REGULATORY_TYPE: this.REGULATORY_TYPE.toGhstsJson(),
      APPLICATION_TYPE: this.APPLICATION_TYPE.toGhstsJson(),
      PROJECT_ID_NUMBER: this.PROJECT_ID_NUMBER
    };
  }
}

export { Dossier, ReferencedDossier, DossierRA };
