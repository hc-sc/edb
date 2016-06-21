import xml2js from 'xml2js';
var fs = require('fs');

class GHSTS {
    constructor(filePath) {
        this.filename = filePath;
        this.ghsts = {};
        this.legalEntities = [];
        this.receivers = [];
        this.product = {};
        this.documents = [];
        // add other sub objects here

        this.submission = [];
        this.dossier = {};

        this.substances = [];
    }

    addLegalEntity(legalEntity) {
        this.legalEntities.push(legalEntity);
    }

    setLegalEntities() {
        this.ghsts.LEGAL_ENTITIES = {
            LEGAL_ENTITY: this.legalEntities
        };
    }

    addReceiver(receiver) {
        this.receivers.push(receiver);
    }

    setReceivers() {
        this.ghsts.RECEIVERS = {
            RECEIVER: this.receivers
        };
    }

    addSubmission(submission) {
        this.ghsts.PRODUCT.DOSSIER.SUBMISSION = submission;
    }

    addfile(file) {
        this.files.push(file);
    }

    setfiles(files) {
        this.files = files;
    }

    setProduct(productGhstsJson){
        this.ghsts.PRODUCT = productGhstsJson;
    }

    addDocument(document){
        this.documents.push(document);
    }

    setDocuments(){
        this.ghsts.DOCUMENTS = {
            DOCUMENT: this.documents
        };
    }

    setDossier(dossier) {
        this.ghsts.PRODUCT.DOSSIER = dossier;
    }

    addSubstance(substance){
        this.substances.push(substance);
    }

    setSubstances(){
        this.ghsts.SUBSTANCES = {
            SUBSTANCE: this.substances
        };
    }

    readObjects() {
        // read json objects from ghsts xml
        return new Promise((resolve, reject) => {
            fs.readFile(this.filename, { encoding: "utf8" }, (err, xmlStr) => {
                if (err) throw (err);
                // parse the xml to json object
                xml2js.parseString(xmlStr, { attrkey: 'attr$' }, (err, obj) => {
                    // check for errors
                    if (err) {
                        reject(err);
                    }
                    // the read succeeded
                    this.ghsts = obj.GHSTS;

                    // set legal entities
                    this.legalEntities = obj.GHSTS.LEGAL_ENTITIES[0].LEGAL_ENTITY;
                    // set receivers
                    this.receivers = obj.GHSTS.RECEIVERS[0].RECEIVER;

                    // set the Product from the xml
                    this.product = obj.GHSTS.PRODUCT;

                    // set other objects here
                    // ...

                    this.files = obj.GHSTS.FILES[0].FILE;
                    // set documents
                    this.documents = obj.GHSTS.DOCUMENTS[0].DOCUMENT;


                    this.dossier = obj.GHSTS.PRODUCT[0].DOSSIER[0];
                    this.substances = obj.GHSTS.SUBSTANCES[0].SUBSTANCE;

                    resolve(this);
                });
            });
        });
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

export {GHSTS};
