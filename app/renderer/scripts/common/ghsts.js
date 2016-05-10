import xml2js from 'xml2js';
import path from 'path';
var fs = require('fs');

class GHSTS {
    constructor(filename) {
        this.filename = filename;
        this.ghsts = {};
        this.legalEntities = [];
        this.receivers = [];
        this.documents = [];
        // add other sub objects here
        this.submission = [];
        this.files = [];
    }

    addLegalEntity(legalEntity) {
        this.legalEntities.push(legalEntity);
    }

    setLegalEntities(legalEntities) {
        this.legalEntities = legalEntities;
    }

    addReceiver(receiver) {
        this.receivers.push(receiver);
    }

    setReceivers(receivers) {
        this.receivers = receivers;
    }

    
    addDocument(document){
        this.documents.push(document);
    }
    
    setDocuments(documents){
        this.documents = documents;
    }
    


    addfile(file) {
        this.files.push(file);
    }

    setfiles(files) {
        this.files = files;
    }

    addSubmission(submission) {
        this.submission.push(submission);
        this.submission = this.submission.slice(1);
    }
    
    readObjects() {     
        // read json objects from ghsts xml    
        let self = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(self.filename, { encoding: "utf8" }, function (err, xmlStr) {
                if (err) throw (err);
                // parse the xml to json object                
                xml2js.parseString(xmlStr, { attrkey: 'attr$' }, function (err, obj) {
                    // check for errors
                    if (err) {
                        reject(err);
                    }
                    // the read succeeded
                    resolve(obj);
                    self.ghsts = obj.GHSTS;  
                    
                    // set legal entities
                    self.legalEntities = obj.GHSTS.LEGAL_ENTITIES[0].LEGAL_ENTITY;  
                    // set receivers 
                    self.receivers = obj.GHSTS.RECEIVERS[0].RECEIVER;  
                    // set documents
                    self.documents = obj.GHSTS.DOCUMENTS[0].DOCUMENT;  
                     
                    // set other objects here
                    self.files=obj.GHSTS.FILES[0].FILE;
                    
                    self.submission = obj.GHSTS.PRODUCT[0].DOSSIER[0].SUBMISSION;
                    // ...
                })
            });
        })
    }

    writeXML(filename) {
        // write ghsts json tree back to xml
        let builder = new xml2js.Builder({ rootName: 'GHSTS', attrkey: 'attr$' });
        let xml = builder.buildObject(this.ghsts);
        fs.writeFile(filename, xml, function (err) {
            if (err) console.log(err);
        });
    }
}

export {GHSTS}