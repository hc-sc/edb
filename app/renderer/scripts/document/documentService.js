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
                // convert GHSTS json to documents objects
                // xml2js' use-and-abuse array setting is on to play safe for now, hence the default array references.   
                
                // First Build DocumentGeneric
                let status = new ValueStruct(doc.DOCUMENT_GENERIC[0].METADATA_STATUS[0].VALUE[0], doc.DOCUMENT_GENERIC[0].METADATA_STATUS[0].VALUE_DECODE[0]);       
                let docGen = new DocumentGeneric();
                docGen.METADATA_STATUS      = status; 
                docGen.DOCUMENT_PID         = doc.DOCUMENT_GENERIC[0].DOCUMENT_PID[0];  // access element DOCUMENT_GENERIC from each DOCUMENT as doc
                docGen.DOCUMENT_FAMILY_PID  = doc.DOCUMENT_GENERIC[0].DOCUMENT_FAMILY_PID[0];
                docGen.DOCUMENT_FAMILY      = doc.DOCUMENT_GENERIC[0].DOCUMENT_FAMILY[0];
              
                doc.DOCUMENT_GENERIC[0].CONTENT_STATUS_HISTORY.forEach(csh => 
                    docGen.addContentStatusHistory(new ContentStatusHistory(new ValueStruct(csh.CONTENT_STATUS[0].VALUE[0], csh.CONTENT_STATUS[0].VALUE_DECODE[0]), csh.SUBMISSION_NUMBER[0]) )   
                );            
                //doc.REFERENCED_DOCUMENT.forEach(refDoc =>
			    //doc.RELATED_TO_SUBSTANCE.forEach(relSub => // rarely used or later      
                doc.DOCUMENT_GENERIC[0].DOCUMENT_NUMBER.forEach(docNum => 
                    docGen.addDocumentNumber(new DocumentNumber(new ValueStruct(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE[0], docNum.DOCUMENT_NUMBER_TYPE[0].VALUE_DECODE[0]), docNum.IDENTIFIER[0]) )   
                );     
                docGen.DOCUMENT_TITLE               = doc.DOCUMENT_GENERIC[0].DOCUMENT_TITLE[0];  
                docGen.DOCUMENT_AUTHOR              = doc.DOCUMENT_GENERIC[0].DOCUMENT_AUTHOR[0];
                docGen.DOCUMENT_ISSUE_DATE          = doc.DOCUMENT_GENERIC[0].DOCUMENT_ISSUE_DATE[0];
                docGen.DOCUMENT_OWNER               = doc.DOCUMENT_GENERIC[0].DOCUMENT_OWNER[0];
                docGen.PUBLISHED_INDICATOR          = doc.DOCUMENT_GENERIC[0].PUBLISHED_INDICATOR[0];
                docGen.COMPLETE_DOCUMENT_SOURCE     = doc.DOCUMENT_GENERIC[0].COMPLETE_DOCUMENT_SOURCE[0];
                docGen.TEST_LABORATORY              = doc.DOCUMENT_GENERIC[0].TEST_LABORATORY[0];
                docGen.GXP_INDICATOR                = doc.DOCUMENT_GENERIC[0].GXP_INDICATOR[0];
                docGen.TESTED_ON_VERTEBRATE         = doc.DOCUMENT_GENERIC[0].TESTED_ON_VERTEBRATE[0];
                docGen.REFERENCED_TO_FILE           = doc.DOCUMENT_GENERIC[0].REFERENCED_TO_FILE[0];
                //  doc.DOCUMENT_GENERIC[0].REFERENCED_TO_FILE.forEach(refFile => 
                //     docGen.addReferenceToFile(new ReferenceToFile(refFile.attr$.Id) )  
                // ); 
                
                // Second Build DocumentRA
                let docRA = new DocumentRA();
                
                
                let docu = new Document();
                docu.documentId = doc.attr$.Id;
                docu.DOCUMENT_GENERIC = docGen;
               // docu.addDocumentRA(docRA);
              
                console.log('---------------------JSON Model----------------\n' + JSON.stringify(docu));
                console.log('------------------------GHSTS Format--------------------\n' + JSON.stringify(docu.toGHSTSJson()));
                 // enable the following to insert into db.
                self.createDocument(docu);  
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
    
     // return a list of all documents
    getDocuments() {        
        let deferred = this.$q.defer();
        this.documents.find({}, function (err, rows) {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });      
        return deferred.promise;  
    }
    
    getDocumentByDOCId(docId) {
        let deferred = this.$q.defer();
        this.documents.find({'_identifier': docId }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });  
        return deferred.promise;        
    }
    
    addDocumentToDB(){  
        // add a new document to database
        let doc = this._createSampleDocument(); 
        this.createDocument(doc);       
         
    }   
}

DocumentService.$inject = ['$q'];

export { DocumentService }