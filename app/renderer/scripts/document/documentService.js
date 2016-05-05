import Nedb from 'nedb';
import xml2js from 'xml2js';
import uuid from 'node-uuid';
import {GHSTS} from '../common/ghsts.js'
import { ContentStatusHistory, ReferencedDocument, ReferenceToSubstance,  DocumentNumber, ReferenceToFile, DocumentGeneric, DocumentComment, OtherNationalGuideLine, SubmissionContext, RADocumentNumber, DocumentRA, Document} from './documentModel.js';
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js'

class DocumentService {
    
     constructor($q) {        
        this.$q = $q;
        this.documents = new Nedb({ filename: __dirname + '/db/documents', autoload: true });
    }
    
     createDocument(document) { 
        let deferred = this.$q.defer();
        this.documents.insert(document, function (err, result) {
            console.log(err)
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    initializeDOC(){
        // read from sample ghsts and populate the database with legal entities.
        let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        let promise = ghsts.readObjects();
        let self = this;      
        promise.then(function(contents) {
            let docs = ghsts.documents;
            docs.forEach(doc => {                
                // convert GHSTS json to legalEntities objects
                // xml2js' use-and-abuse array setting is on to play safe for now, hence the default array references.   
                let status = new ValueStruct(doc.METADATA_STATUS[0].VALUE[0], doc.METADATA_STATUS[0].VALUE_DECODE[0]);
                
                let docu = new Document();
                docu.documentId = doc.attr$.Id;
                
                let docGen = new DocumentGeneric();
                docGen.METADATA_STATUS = status; 
                docGen.DOCUMENT_PID = doc.DOCUMENT_PID[0];
                docGen.DOCUMENT_FAMILY_PID = doc.DOCUMENT_FAMILY_PID[0];
                docGen.DOCUMENT_FAMILY = doc.DOCUMENT_FAMILY[0];
              
                doc.CONTENT_STATUS_HISTORY.forEach(csh => 
                    docGen.addContentStatusHistory(new ContentStatusHistory(new ValueStruct(csh.CONTENT_STATUS[0].VALUE[0], csh.CONTENT_STATUS[0].VALUE_DECODE[0]), csh.SUBMISSION_NUMBER[0]) )   
                );  
                
                //doc.REFERENCED_DOCUMENT.forEach(refDoc =>
                
       
			    //doc.RELATED_TO_SUBSTANCE.forEach(relSub => // rarely used or later
                
                doc.DOCUMENT_NUMBER.forEach(docNum => 
                    docGen.addDocumentNumber(new DocumentNumber(new ValueStruct(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE[0], docNum.DOCUMENT_NUMBER_TYPE[0].VALUE_DECODE[0]), docNum.IDENTIFIER[0]) )   
                );
                  
                docGen.DOCUMENT_TITLE   = doc.DOCUMENT_TITLE[0];  
                docGen.DOCUMENT_AUTHOR   = doc.DOCUMENT_AUTHOR[0];
                docGen.DOCUMENT_ISSUE_DATE   = doc.DOCUMENT_ISSUE_DATE[0];
                docGen.DOCUMENT_OWNER   = doc.DOCUMENT_OWNER[0];
                docGen.PUBLISHED_INDICATOR   = doc.PUBLISHED_INDICATOR[0];
                docGen.COMPLETE_DOCUMENT_SOURCE   = doc.COMPLETE_DOCUMENT_SOURCE[0];
                docGen.TEST_LABORATORY   = doc.TEST_LABORATORY[0];
                docGen.GXP_INDICATOR   = doc.GXP_INDICATOR[0];
                docGen.TESTED_ON_VERTEBRATE   = doc.TESTED_ON_VERTEBRATE[0];
                
                //docGen.REFERENCED_TO_FILE   = doc.REFERENCED_TO_FILE[0];
                 doc.REFERENCED_TO_FILE.forEach(refFile => 
                    docGen.addReferenceToFile(new ReferenceToFile(refFile.attr$.Id) )  
                ); 
               
            }).catch(function(e) {
                console.log(e); 
            })
        });
    }  
    
      _createSampleDocument(){
        
        let TypeContentStatus = new ValueStruct("New", "New"); 
        let contentStatusHistory = new ContentStatusHistory(TypeContentStatus, "01")
        
        let DocumentNumberType = new ValueStruct("other", "CompanyID"); 
        let documentNumber = new DocumentNumber(DocumentNumberType, "T-423579-01-1");
        
        let doc = new Document();
        doc.documentId = "D_Document_J_01_T-423579_0003052902";
        
        // let docRA = new DocumentRA();
        // docRA.METADATA_STATUS = new ValueStruct('New', 'New'); 
        // docRA.DATA_PROTECTION = new ValueStruct('New', 'New'); 
        // docRA.DATA_REQUIREMENT = new ValueStruct('New', 'New'); 
        
        let docGeneric = new DocumentGeneric();
        docGeneric.METADATA_STATUS =  new ValueStruct('New', 'New'); 
        docGeneric.DOCUMENT_PID = 'urn:' + uuid.v4(); 
        docGeneric.DOCUMENT_FAMILY_PID = 'urn:' + uuid.v4(); 
        docGeneric.DOCUMENT_FAMILY = 'T-423579'
        docGeneric.addContentStatusHistory(contentStatusHistory);
        docGeneric.addDocumentNumber(documentNumber);
        docGeneric.DOCUMENT_TITLE =   " Test new Document ";
		docGeneric.DOCUMENT_AUTHOR =   " Hai Tu ";
		docGeneric.DOCUMENT_ISSUE_DATE =   "2016-05-07";
		docGeneric.DOCUMENT_OWNER =   " IMSD " ;     // treat it as a single for now
		docGeneric.PUBLISHED_INDICATOR =   " false ";
		docGeneric.COMPLETE_DOCUMENT_SOURCE =   " Sylvia " ;
		docGeneric.TEST_LABORATORY =   " Sylvia " ;
		docGeneric.GXP_INDICATOR =   "false  ";
		docGeneric.TESTED_ON_VERTEBRATE =   " false ";
        let fileReference =  new ReferenceToFile();
		fileReference.toFileId =   "D_Document_J_01_T-423579_0003052902R" ;
        docGeneric.addReferenceToFile(fileReference);
         
        //doc.addDocumentRA(docRA);
       doc.DOCUMENT_GENERIC = docGeneric;
        
       console.log(JSON.stringify(doc));
        
       return doc;
    }
    
    addDocumentToDB(){  
        // add a new legal entity to database
        let doc = this._createSampleDocument(); 
        this.createDocument(doc);       
         
    }   
}

DocumentService.$inject = ['$q'];

export { DocumentService }