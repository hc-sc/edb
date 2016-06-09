import Nedb from 'nedb';
import xml2js from 'xml2js';
import uuid from 'node-uuid';
import {GHSTS} from '../common/ghsts.js'
import { ContentStatusHistory, ReferencedDocument, ReferenceToSubstance,  DocumentNumber, ReferenceToFile, DocumentGeneric, OtherNationalGuideLine, SubmissionContext, RADocumentNumber, DocumentRA, Document} from './documentModel.js';
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
    
     createDocument(document) { 
        let deferred = this.$q.defer();
        this.documents.insert(document, function (err, result) {
            console.log(err)
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    deleteDocument(id) {            
        let deferred = this.$q.defer();
        this.documents.remove({'_id': id}, function (err, res) {
            if (err) deferred.reject(err);
            console.log(res);
            deferred.resolve(res.affectedRows);
        });                
        return deferred.promise;
    }
    
     
    updateDocument(document) {
        let deferred = this.$q.defer();
        this.documents.update({_id: document._id}, document, {}, function (err, numReplaced) {
            if (err) { 
                deferred.reject(err);
                console.log(err);
            }
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }
    
    // the following are demo related methods.  can be moved to a dedicated test class later    
    getDocumentGHSTSById(id) {
        // return GHSTS xml from legal entity json. 
        let deferred = this.$q.defer();
        this.documents.find({'_id': id }, function (err, result) {
            if (err) deferred.reject(err);           
            
            // retrieved Json from database
            let docJSON = result[0];
           
            // create Document based on docJSON           
            let doc = new Document(docJSON);
           
            // convert to XML
            let builder = new xml2js.Builder({rootName: 'DOCUMENT', attrkey: 'attr$'});            
            let xml = builder.buildObject(doc.toGHSTSJson());    
            deferred.resolve(xml);        
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
            //console.log(JSON.stringify(docs));
            docs.forEach(doc => {                
                // convert GHSTS json to documents objects
                // xml2js' use-and-abuse array setting is on to play safe for now, hence the default array references.   
                let docu = new Document();
                // First Build DocumentGeneric
                let statusGen = new ValueStruct(doc.DOCUMENT_GENERIC[0].METADATA_STATUS[0].VALUE[0], doc.DOCUMENT_GENERIC[0].METADATA_STATUS[0].VALUE_DECODE[0]);       
                let docGen = new DocumentGeneric();
                
                docu.documentId             = doc.attr$.Id;  // set id attibute
                docGen.METADATA_STATUS      = statusGen; 
                docGen.DOCUMENT_PID         = doc.DOCUMENT_GENERIC[0].DOCUMENT_PID[0];  // access element DOCUMENT_GENERIC from each DOCUMENT as doc
                docGen.DOCUMENT_FAMILY_PID  = doc.DOCUMENT_GENERIC[0].DOCUMENT_FAMILY_PID[0];
                docGen.DOCUMENT_FAMILY      = doc.DOCUMENT_GENERIC[0].DOCUMENT_FAMILY[0];
              
                doc.DOCUMENT_GENERIC[0].CONTENT_STATUS_HISTORY.forEach(csh => 
                    docGen.addContentStatusHistory(new ContentStatusHistory(new ValueStruct(csh.CONTENT_STATUS[0].VALUE[0], csh.CONTENT_STATUS[0].VALUE_DECODE[0]), csh.SUBMISSION_NUMBER[0]) )   
                );            
                //doc.REFERENCED_DOCUMENT.forEach(refDoc =>
			    //doc.RELATED_TO_SUBSTANCE.forEach(relSub => // rarely used or later      
                
                if(doc.DOCUMENT_GENERIC[0].DOCUMENT_NUMBER !== undefined){
                            doc.DOCUMENT_GENERIC[0].DOCUMENT_NUMBER.forEach(docNum => {
                                // console.log(" View  Value"  + JSON.stringify(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE[0]._));
                                // console.log(" View  Value Other"  + JSON.stringify(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE[0].attr$.Other_Value));
                                // console.log(" View  Value Code"  + JSON.stringify(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE_DECODE[0]));
                                docGen.addDocumentNumber(new DocumentNumber(new ValueStruct(docNum.DOCUMENT_NUMBER_TYPE[0].VALUE[0].attr$.Other_Value, docNum.DOCUMENT_NUMBER_TYPE[0].VALUE_DECODE[0]), docNum.IDENTIFIER[0]) );
                               }
                      
                           ); 
                }                   
                docGen.DOCUMENT_TITLE               = doc.DOCUMENT_GENERIC[0].DOCUMENT_TITLE[0];  
                docGen.DOCUMENT_AUTHOR              = doc.DOCUMENT_GENERIC[0].DOCUMENT_AUTHOR[0];
                docGen.DOCUMENT_ISSUE_DATE          = doc.DOCUMENT_GENERIC[0].DOCUMENT_ISSUE_DATE[0];
                docGen.DOCUMENT_OWNER               = doc.DOCUMENT_GENERIC[0].DOCUMENT_OWNER[0];
                docGen.PUBLISHED_INDICATOR          = doc.DOCUMENT_GENERIC[0].PUBLISHED_INDICATOR[0];
                docGen.COMPLETE_DOCUMENT_SOURCE     = doc.DOCUMENT_GENERIC[0].COMPLETE_DOCUMENT_SOURCE[0];
                docGen.TEST_LABORATORY              = doc.DOCUMENT_GENERIC[0].TEST_LABORATORY[0];
                docGen.GXP_INDICATOR                = doc.DOCUMENT_GENERIC[0].GXP_INDICATOR[0];
                docGen.TESTED_ON_VERTEBRATE         = doc.DOCUMENT_GENERIC[0].TESTED_ON_VERTEBRATE[0];
              
                doc.DOCUMENT_GENERIC[0].REFERENCED_TO_FILE.forEach(refFile => {         
                     let refObj = new ReferenceToFile();  
                     refObj.toFileId = refFile.attr$.To_File_Id; // collect value from xml source attr$ and add to class object ReferenceToFile   
                     docGen.addReferenceToFile(refObj);
                    }
                 )
                
               docu.DOCUMENT_GENERIC = docGen;
                
                // Second Build DocumentRA
               doc.DOCUMENT_RA.forEach(dra => {
                    //console.log(JSON.stringify(dra));
                    let docRA = new DocumentRA();
                    
                    let raStatus            = new ValueStruct(dra.METADATA_STATUS[0].VALUE[0], dra.METADATA_STATUS[0].VALUE_DECODE[0]);
                    let raDataProtection    = new ValueStruct(dra.DATA_PROTECTION[0].VALUE[0], dra.DATA_PROTECTION[0].VALUE_DECODE[0]);
                    let raDataReq           = new ValueStruct(dra.DATA_REQUIREMENT[0].VALUE[0], dra.DATA_REQUIREMENT[0].VALUE_DECODE[0]);
                    
                    docRA.toSpecificForRAId = dra.attr$.To_Specific_for_RA_Id;
                      
                    docRA.METADATA_STATUS = raStatus;
                    docRA.DATA_PROTECTION = raDataProtection;
                    docRA.DATA_REQUIREMENT = raDataReq;
                    
                  
                    if(dra.DOCUMENT_COMMENT !== undefined){
                        docRA.DOCUMENT_COMMENT = dra.DOCUMENT_COMMENT;
                    }else{
                        docRA.DOCUMENT_COMMENT = [];
                    }
                 
                    if(dra.OTHER_NATIONAL_GUIDELINE !== undefined){
                        dra.OTHER_NATIONAL_GUIDELINE.forEach (ogl => {
                            let otherNGL = new OtherNationalGuideLine();
                            otherNGL.GUIDELINE_SYSTEM = ogl.GUIDELINE_SYSTEM[0];
                            otherNGL.GUIDELINE_NUMBER = ogl.GUIDELINE_NUMBER[0];
                            docRA.addOtherNationalGuideline(otherNGL);
                        })
                    }
                    
                    let raDocNum = new RADocumentNumber();
                    // Need to check if non mandatory element is not present in your xml payload
                    if(dra.RA_DOCUMENT_NUMBER !== undefined) { 
                        let raDocNumType = new ValueStruct(dra.RA_DOCUMENT_NUMBER[0].RA_DOCUMENT_NUMBER_TYPE[0].VALUE[0]._ , dra.RA_DOCUMENT_NUMBER[0].RA_DOCUMENT_NUMBER_TYPE[0].VALUE_DECODE[0]);
                
                        raDocNum.RA_DOCUMENT_NUMBER_TYPE = raDocNumType;
                        raDocNum.IDENTIFIER = dra.RA_DOCUMENT_NUMBER[0].IDENTIFIER[0];
                        raDocNum.ALREADY_SUBMITTED = dra.RA_DOCUMENT_NUMBER[0].ALREADY_SUBMITTED[0];
                        
                        if(dra.RA_DOCUMENT_NUMBER[0].SUBMISSION_CONTEXT  !== undefined){
                            //console.log(" View SUBMISSION_CONTEXT : " + JSON.stringify(dra.RA_DOCUMENT_NUMBER[0].SUBMISSION_CONTEXT));
                            dra.RA_DOCUMENT_NUMBER[0].SUBMISSION_CONTEXT.forEach(sc => {
                                let subContext = new SubmissionContext();
                                subContext.DOSSIER_PID = sc.DOSSIER_PID[0];
                                subContext.DOSSIER_NUMBER = sc.DOSSIER_NUMBER[0];
                                raDocNum.addSubmissionContext(subContext);
                            })
                            
                        }
                        docRA.RA_DOCUMENT_NUMBER =   raDocNum;
                    }
                  
                    docu.addDocumentRA(docRA);
               })
               
                console.log('---------------------JSON Model----------------\n' + JSON.stringify(docu));
                console.log('------------------------GHSTS Format--------------------\n' + JSON.stringify(docu.toGHSTSJson()));
                 // enable the following to insert into db.
                self.createDocument(docu);  
            })
        });
    }  
    
      _createSampleDocument(){
        
        let TypeContentStatus = new ValueStruct("New", "New"); 
        let contentStatusHistory = new ContentStatusHistory(TypeContentStatus, "01")
        
        let DocumentNumberType = new ValueStruct("other", "CompanyID"); 
        let documentNumber = new DocumentNumber(DocumentNumberType, "T-423579-01-1");
        
        let doc = new Document();
        doc.documentId = "D_Document_J_Hai";
        
        // let docRA = new DocumentRA();
        // docRA.METADATA_STATUS = new ValueStruct('New', 'New'); 
        // docRA.DATA_PROTECTION = new ValueStruct('New', 'New'); 
        // docRA.DATA_REQUIREMENT = new ValueStruct('New', 'New'); 
        docRA.addDocumentComment("Comment 1");
        docRA.addDocumentComment("Comment 2");
        
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
		fileReference.toFileId =   "D_Document_J_01_T-Hai" ;
        docGeneric.addReferenceToFile(fileReference);
         
        //doc.addDocumentRA(docRA);
       doc.DOCUMENT_GENERIC = docGeneric;
        
       console.log(JSON.stringify(doc));
        
       return doc;
    }
    
  
    addDocumentToDB(){  
        // add a new document to database
        let doc = this._createSampleDocument(); 
        this.createDocument(doc);       
         
    }   
}

DocumentService.$inject = ['$q'];

export { DocumentService }