import { ValueStruct } from '../common/sharedModel.js';
    
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
            
            this._id = json._id;
        }
        else {
            this.DOSSIER_PID = null;
            this.DOSSIER_DESCRIPTION_TITLE = null;
            this.DOSSIER_COMP_ID = null;
            this.REFERENCED_DOSSIER = [];
            this.DOSSIER_RA = [];
        }
    }
    
    addReferencedDossier(rd) {
        this.REFERENCED_DOSSIER.push(rd);
    }
    
    addDossierRA(dr) {
        this.DOSSIER_RA.push(dr);
    }
    
    toGhstsJson() {
        const refDossiers = this.REFERENCED_DOSSIER.map(rd => {
           return rd.toGhstsJson(); 
        });
        
        const dossierRAs = this.DOSSIER_RA.map(dr => {
           return dr.toGhstsJson(); 
        });
        
        return {
            DOSSIER_PID: this.DOSSIER_PID,
            DOSSIER_DESCRIPTION_TITLE: this.DOSSIER_DESCRIPTION_TITLE,
            DOSSIER_COMP_ID: this.DOSSIER_COMP_ID,
            REFERENCED_DOSSIER: refDossiers,
            DOSSIER_RA: dossierRAs
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
            this.REGULATORY_TYPE = new ValueStruct(json.REGULATORY_TYPE.VALUE, json.REGULATORY_TYPE.VALUE_DECODE);
            this.APPLICATION_TYPE = new ValueStruct(json.APPLICATION_TYPE.VALUE, json.APPLICATION_TYPE.VALUE_DECODE);
            this.PROJECT_ID_NUMBER = json.PROJECT_ID_NUMBER;
        }
        else {
            this.REGULATORY_TYPE = new ValueStruct();
            this.APPLICATION_TYPE = new ValueStruct();
            this.PROJECT_ID_NUMBER = [];
        }
    }
    
    setRegulatoryTypeValue(value) {
        this.REGULATORY_TYPE.VALUE = value;
    }
    
    setApplicationTypeValue(value) {
        this.APPLICATION_TYPE.VALUE = value;
    }
    
    toGhstsJson() {
        return {
            REGULATORY_TYPE: this.REGULATORY_TYPE,
            APPLICATION_TYPE: this.APPLICATION_TYPE,
            PROJECT_ID_NUMBER: this.PROJECT_ID_NUMBER
        };
    }
}

export { Dossier, ReferencedDossier, DossierRA };