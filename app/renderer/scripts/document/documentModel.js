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
           
        }
    }  
    
    toGHSTSJson() {   
        return {
            REFERENCE_TYPE : this.REFERENCE_TYPE ,          
            INTERNAL : this.INTERNAL ,
            DOCUMENT_PID : this.DOCUMENT_PID       
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
            this.METADATA_STATUS = {};         // of ValueStruct		
            this.DOCUMENT_PID =  null;
			this.DOCUMENT_FAMILY_PID =  null;
			this.DOCUMENT_FAMILY =  null;
			this.CONTENT_STATUS_HISTORY = []   ;  // SubmissionIdentifierStruct
			this.DOCUMENT_NUMBER =   [] ;	  // DocumentIdentifierStruct
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
     
    //  addReferencedDocument(referencedDocument){
    //      this.REFERENCED_DOCUMENT.push(referencedDocument);
    //  }
     
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
        
        // let referencedDocumentJson = [];
        // this.REFERENCED_DOCUMENT.forEach(refDoc => referencedDocumentJson.push(refDoc));
        
        // let relatedToSubstanceJson = [];
        // this.RELATED_TO_SUBSTANCE.forEach(relSub => relatedToSubstanceJson.push(relSub));
        
         let referencedToFileJson = [];
       
        this.REFERENCED_TO_FILE.forEach(refToFile => {
            let refObj = new ReferenceToFile(refToFile);
            referencedToFileJson.push(refObj.toGHSTSJson());
        }); 
        
        return {
            	METADATA_STATUS 	       :      this.METADATA_STATUS,		
				DOCUMENT_PID 			   :      this.DOCUMENT_PID ,		
				DOCUMENT_FAMILY_PID 	   :      this.DOCUMENT_FAMILY_PID ,	
				DOCUMENT_FAMILY 		   :      this.DOCUMENT_FAMILY ,		
				CONTENT_STATUS_HISTORY 	   :      contentStatusHistoryJson ,
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
class  DocumentComment {  
     constructor(docComment){             
        this.DOCUMENT_COMMENT = docComment;			                   
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
            this.SUBMISSION_CONTEXT = [];
        }
    } 
    
    addSubmissionContext(submissionContext) {
        this.SUBMISSION_CONTEXT.push(submissionContext);
    }
}     

class DocumentRA {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{          
            this.METADATA_STATUS = {};         // of ValueStruct		
            this.DATA_PROTECTION = {};         // of ValueStruct
            this.DATA_REQUIREMENT = {};
            this.DOCUMENT_COMMENT = [];
            this.OTHER_NATIONAL_GUIDELINE = [];
            this.RA_DOCUMENT_NUMBER = new RADocumentNumber();
        }     
    }
    
    addOtherNationalGuideline(otherNATGuideline){
        this.OTHER_NATIONAL_GUIDELINE.push(otherNATGuideline);
    }
    
    addDocumentComment(documentComment){
        this.DOCUMENT_COMMENT.push(documentComment);
    }
    
     toGHSTSJson() {
         
     }
           
}    



 
class Document {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
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
        this.DOCUMENT_RA.forEach(documentRA => documentRAJson.push(documentRA));   
            
        return {
            attr$ : {  Id : this._identifier  },
            DOCUMENT_RA      :    documentRAJson,
            DOCUMENT_GENERIC :    this.DOCUMENT_GENERIC.toGHSTSJson() 
        };               
    }                
}   

export { ContentStatusHistory, ReferencedDocument, ReferenceToSubstance,  DocumentNumber, ReferenceToFile, DocumentGeneric, DocumentComment, OtherNationalGuideLine, SubmissionContext, RADocumentNumber, DocumentRA, Document}