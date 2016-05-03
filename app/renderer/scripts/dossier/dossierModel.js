import Submission from '../submission/submissionModel.js'

class Dossier {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{            
            this.METADATA_STATUS = {};  // of type ValueStruct
            this.DOSSIER_PID = null;
            this.DOSSIER_DESCRIPTION_TITLE = null;
            this.DOSSIER_COMP_ID = null;
            this.REFERENCED_DOSSIER = [];
            this.DOSSIER_RA = [];
            this.SUBMISSION = [];
        }     
    }
    
    addReferencedDossier(obj_reffedDoss){
        this.REFERENCED_DOSSIER.push(obj_reffedDoss);
    }
   
    addRA(obj_dossRA){
        this.DOSSIER_RA.push(obj_dossRA);
    }
    
    addSubmission(){
        this.SUBMISSION.push(new Submission());
    }
    
    toGHSTSJson() {     
        let dossRAsJson = [];
        this.DOSSIER_RA.forEach(dra => {dossRAsJson.push(dra)});
        let reftDossJson = [];
        this.REFERENCED_DOSSIER.forEach(rd => {reftDossJson.push(rd)});
        let submJson = [];
        this.SUBMISSION.forEach(s =>{submJson.push(s)});
        return {
            METADATA_STATUS           : this.METADATA_STATUS,            
            DOSSIER_PID               : this.DOSSIER_PID,
            DOSSIER_DESCRIPTION_TITLE : this.DOSSIER_DESCRIPTION_TITLE,
            DOSSIER_COMP_ID           : this.DOSSIER_COMP_ID,
            DOSSIER_RA                : dossRAsJson,
            REFERENCED_DOSSIER        : this.reftDossJson,
            SUBMISSION                : this.submJson
        };               
    }          
}    

export {Ingredient, AdminNumber, ProductRA, Product}