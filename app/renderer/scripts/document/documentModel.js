// For class DocumentGeneric
class ContentStatusHistory {  
     constructor(value, identifier){              
        this.CONTENT_STATUS = value,         // of ValueStruct
        this.SUBMISSION_NUMBER = identifier;
    }
}
// For class DocumentGeneric
class ReferencedDocument {
     constructor(json){   
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{  
           this.REFERENCE_TYPE = {};          // of ValueStruct
           this.INTERNAL = null;
           this.DOCUMENT_PID = null;
           this.DOCUMENT_NUMBER = new DocumentNumber();
           
        }
    } 
    
    
    toGHSTSJson() {   
        return {
            REFERENCE_TYPE : this.REFERENCE_TYPE ,          
            INTERNAL : this.INTERNAL ,
            DOCUMENT_PID : this.DOCUMENT_PID,
            DOCUMENT_NUMBER : this.DOCUMENT_NUMBER       
        };          
    } 
}

// For class DocumentGeneric
class ReferenceToSubstance {
     constructor(json){   
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{  
            this._toSubstanceId = null;  
        }
    } 
    
    set toFileId(id){
        this._toSubstanceId = id;
    }  
    
    toGHSTSJson() {   
        return {
            attr$ : {  To_Substance_Id : this._toSubstanceId  }
          
        };          
    } 
}

// For class DocumentGeneric
class DocumentNumber {
     constructor(value, identifier){              
        this.DOCUMENT_NUMBER_TYPE = value,         // of ValueStruct
        this.IDENTIFIER = identifier;
    }
}

// For class DocumentGeneric
class ReferenceToFile {
     constructor(json){   
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{  
            this._toFileId = null;  
        }
    } 
    
    set toFileId(id){
        this._toFileId = id;
    }  
    
    toGHSTSJson() {   
        return {
            attr$ : {  To_File_Id : this._toFileId  }
          
        };          
    } 
}


class DocumentGeneric {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{          
            this.METADATA_STATUS = {};         		
            this.DOCUMENT_PID =  null;
			this.DOCUMENT_FAMILY_PID =  null;
			this.DOCUMENT_FAMILY =  null;
			this.CONTENT_STATUS_HISTORY = []   ;  
            this.REFERENCED_DOCUMENT = [];
			this.DOCUMENT_NUMBER =   [] ;	  
			this.DOCUMENT_TITLE =   null;
			this.DOCUMENT_AUTHOR =   null;
			this.DOCUMENT_ISSUE_DATE =   null;
			this.DOCUMENT_OWNER =   null ;     // treat it as a single for now
			this.PUBLISHED_INDICATOR =   null;
			this.COMPLETE_DOCUMENT_SOURCE =   null ;
			this.TEST_LABORATORY =   null ;
			this.GXP_INDICATOR =   null;
			this.TESTED_ON_VERTEBRATE =   null;
            this.REFERENCED_TO_FILE =  [];
        }     
    }
   
    
     addContentStatusHistory(contentStatusHistory){
         this.CONTENT_STATUS_HISTORY.push(contentStatusHistory);
     }
     
     addReferencedDocument(referencedDocument){
         this.REFERENCED_DOCUMENT.push(referencedDocument);
     }
     
    //  addRelatedToSubstance(relatedToSubstance){
    //      this.RELATED_TO_SUBSTANCE.push(relatedToSubstance);
    //  }
     
     addDocumentNumber(documentNumber){
         this.DOCUMENT_NUMBER.push(documentNumber);
     }
     
     addReferenceToFile(refToFile){
          this.REFERENCED_TO_FILE.push(refToFile);
     }
     
     toGHSTSJson() {   
        let contentStatusHistoryJson = [];
        this.CONTENT_STATUS_HISTORY.forEach(content => contentStatusHistoryJson.push(content));   
        
        let documentNumberJson = [];
        this.DOCUMENT_NUMBER.forEach(docNum=> documentNumberJson.push(docNum));
        
        let referencedDocumentJson = [];
        this.REFERENCED_DOCUMENT.forEach(refDoc => referencedDocumentJson.push(refDoc));
        
        // let relatedToSubstanceJson = [];
        // this.RELATED_TO_SUBSTANCE.forEach(relSub => relatedToSubstanceJson.push(relSub));
        
        let referencedToFileJson = [];
       
        this.REFERENCED_TO_FILE.forEach(refToFile => {
             //let refObj = new ReferenceToFile();  
             let refObj = new ReferenceToFile(refToFile);
             referencedToFileJson.push(refObj.toGHSTSJson());
         }); 
      
        
        return {
            	METADATA_STATUS 	       :      this.METADATA_STATUS,		
				DOCUMENT_PID 			   :      this.DOCUMENT_PID ,		
				DOCUMENT_FAMILY_PID 	   :      this.DOCUMENT_FAMILY_PID ,	
				DOCUMENT_FAMILY 		   :      this.DOCUMENT_FAMILY ,		
				CONTENT_STATUS_HISTORY 	   :      contentStatusHistoryJson ,
                REFERENCED_DOCUMENT        :      referencedDocumentJson,
				DOCUMENT_NUMBER 		   :      documentNumberJson, 		
				DOCUMENT_TITLE 			   :      this.DOCUMENT_TITLE ,		
				DOCUMENT_AUTHOR 		   :      this.DOCUMENT_AUTHOR ,		
				DOCUMENT_ISSUE_DATE 	   :      this.DOCUMENT_ISSUE_DATE ,	
				DOCUMENT_OWNER 			   :      this.DOCUMENT_OWNER ,		
				PUBLISHED_INDICATOR 	   :      this.PUBLISHED_INDICATOR ,	
				COMPLETE_DOCUMENT_SOURCE   :      this.COMPLETE_DOCUMENT_SOURCE ,	
				TEST_LABORATORY 		   :      this.TEST_LABORATORY ,		
				GXP_INDICATOR 			   :      this.GXP_INDICATOR, 		
				TESTED_ON_VERTEBRATE 	   :      this.TESTED_ON_VERTEBRATE ,	
                REFERENCED_TO_FILE         :      referencedToFileJson
					

        };          
    }
}
    


// For class DocumentRA
class  OtherNationalGuideLine {  
     constructor(guideLineSystem, guideLineNumber){             
        this.GUIDELINE_SYSTEM = guideLineSystem;
        this.GUIDELINE_NUMBER = guideLineNumber;   			                   
    }   
}   

// For class DocumentRA
class  SubmissionContext {  
     constructor(dossierPID, dossierNumber){             
        this.DOSSIER_PID = dossierPID;
        this.DOSSIER_NUMBER = dossierNumber;   			                   
    }   
}              

// For class DocumentRA
class  RADocumentNumber {
    
     constructor(json){   
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{  
            this.RA_DOCUMENT_NUMBER_TYPE = {},         // of ValueStruct
            this.IDENTIFIER = null;
            this.ALREADY_SUBMITTED = null;
            this.SUBMISSION_CONTEXT = [];    // Array of Objects
        }
    } 
    
    addSubmissionContext(submissionContext) {
        this.SUBMISSION_CONTEXT.push(submissionContext);
    }
    
    toGHSTSJson() {
        let submContextJson = [];
        this.SUBMISSION_CONTEXT.forEach(subCon => submContextJson(subCon));
        
        return{
            RA_DOCUMENT_NUMBER_TYPE         :   this.RA_DOCUMENT_NUMBER_TYPE,
            IDENTIFIER                      :   this.IDENTIFIER ,
            ALREADY_SUBMITTED               :   this.ALREADY_SUBMITTED,
            SUBMISSION_CONTEXT              :   submContextJson
        }
        
    }
}     

class DocumentRA {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{  
            this._toSpecificforRAId = null;       
            this.METADATA_STATUS = {};              // of ValueStruct		
            this.DATA_PROTECTION = {};              // of ValueStruct
            this.DATA_REQUIREMENT = {};
            this.DOCUMENT_COMMENT = [];             // Array of Strings
            this.OTHER_NATIONAL_GUIDELINE = [];     // Array of Objects
            this.RA_DOCUMENT_NUMBER = new RADocumentNumber();
        }     
    }
    
    set toSpecificForRAId(raID){
        this._toSpecificforRAId = raID;
    }
    
    addOtherNationalGuideline(otherNATGuideline){
        this.OTHER_NATIONAL_GUIDELINE.push(otherNATGuideline);
    }
    
    addDocumentComment(documentComment){
        this.DOCUMENT_COMMENT.push(documentComment);
    }
    
     toGHSTSJson() {
           
            let otherNationalGuideLineJson = [];
            this.OTHER_NATIONAL_GUIDELINE.forEach(ong => otherNationalGuideLineJson.push(ong));
         
         return{
             attr$ : { To_Specific_for_RA_Id : this._toSpecificforRAId },
             METADATA_STATUS 	        :      this.METADATA_STATUS,
             DATA_PROTECTION 	        :      this.DATA_PROTECTION,
             DATA_REQUIREMENT 	        :      this.DATA_REQUIREMENT,
             DOCUMENT_COMMENT  	        :      this.DOCUMENT_COMMENT,
             OTHER_NATIONAL_GUIDELINE   :      otherNationalGuideLineJson,
             RA_DOCUMENT_NUMBER 	    :      this.RA_DOCUMENT_NUMBER
                      
         }
     }
           
}    



 
class Document {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
            this.DOCUMENT_GENERIC = new DocumentGeneric(json.DOCUMENT_GENERIC); 
        }else{          
            this._identifier = null;            
            this.DOCUMENT_RA = [];  
			this.DOCUMENT_GENERIC = new DocumentGeneric();  			
                
        }     
    }
    
     set documentId(id){
        this._identifier = id;
     }
    
     addDocumentRA(documentRA){
        this.DOCUMENT_RA.push(documentRA);  // add to array of DOCUMENT_RA
     } 
     
   
    
      toGHSTSJson() {     
        let documentRAJson = [];
       
        this.DOCUMENT_RA.forEach(docRA => {
            let docraObj = new DocumentRA(docRA);
            documentRAJson.push(docraObj.toGHSTSJson());
        });  
        
          
        return {
            attr$ : {  Id : this._identifier  },
            DOCUMENT_RA      :    documentRAJson,
            DOCUMENT_GENERIC :    this.DOCUMENT_GENERIC.toGHSTSJson()
        };               
    }                
}   

export { ContentStatusHistory, ReferencedDocument, ReferenceToSubstance,  DocumentNumber, ReferenceToFile, DocumentGeneric, OtherNationalGuideLine, SubmissionContext, RADocumentNumber, DocumentRA, Document}