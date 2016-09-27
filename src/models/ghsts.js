const xml2js = require('xml2js');
const fs = require('fs');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const SubstanceService = require('../services/substance.service').SubstanceService;
const BACKEND_CONST = require('../constants/backend');

module.exports = class GHSTS {
  constructor($q, filePath) {
    this.$q = $q;
    this.filename = filePath;
    this.legalEntities = [];
    this.receivers = [];
    this.product = {};
    this.documents = [];
    this.submission = [];
    this.dossier = {};
    this.files = [];
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

  addFile(file) {
    this.files.push(file);
  }

  setFiles() {
    this.ghsts.FILES = {
      FILE: this.files
    }
  }

  setProduct(productGhstsJson) {
    this.ghsts.PRODUCT = productGhstsJson;
  }

  addDocument(document) {
    this.documents.push(document);
  }

  setDocuments() {
    this.ghsts.DOCUMENTS = {
      DOCUMENT: this.documents
    };
  }

  setDossier(dossier) {
    this.ghsts.PRODUCT.DOSSIER = dossier;
  }

  addSubstance(substance) {
    this.substances.push(substance);
  }

  setSubstances() {
    this.ghsts.SUBSTANCES = {
      SUBSTANCE: this.substances
    };
  }

  readObjects(isActive) {
    // read json objects from ghsts xml
    let deffer = this.$q.defer();
    fs.readFile(this.filename, { encoding: 'utf8' }, (err, xmlStr) => {
      if (err) {
        deffer.reject(new RVHelper('EDB10000', err));
        return deffer.promise;
      }
      // parse the xml to json object
      xml2js.parseString(xmlStr, { attrkey: 'attr$', explicitArray: false }, (err, obj) => {
        // check for errors
        if (err) {
          deffer.reject(new RVHelper('EDB10000', err));
          return deffer.promise;
        }
        // set legal entities
        this.legalEntities = obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY;
        // set receivers
        this.receivers = obj.GHSTS.RECEIVERS.RECEIVER;

        // set the Product from the xml
        this.product = obj.GHSTS.PRODUCT;

        this.files = obj.GHSTS.FILES.FILE;
        // set documents
        this.documents = obj.GHSTS.DOCUMENTS.DOCUMENT;
        this.dossier = obj.GHSTS.PRODUCT.DOSSIER;
        let subService = new SubstanceService(this.$q, BACKEND_CONST.DOSSIER_LEVEL_SERVICE, isActive);
        this.substances = obj.GHSTS.SUBSTANCES.SUBSTANCE;
        subService.jsonObjClassifierFromXml(this.substances).then(result => {
          this.substances = result;
        });

        deffer.resolve(new RVHelper('EDB00000', this));
      });
    });
    return deffer.promise;
  }

  writeXML(filename) {
    // write ghsts json tree back to xml
    let deffer = this.$q.defer();

    let obj = {};
    obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY = this.legalEntities;
    obj.GHSTS.RECEIVERS.RECEIVER = this.receivers;
    obj.GHSTS.PRODUCT = this.product;
    obj.GHSTS.DOCUMENTS.DOCUMENT = this.documents;
    obj.GHSTS.PRODUCT.DOSSIER = this.dossier;
    obj.GHSTS.SUBSTANCES.SUBSTANCE = this.substances;

    let builder = new xml2js.Builder({ rootName: 'GHSTS', attrkey: 'attr$' });
    let xml = builder.buildObject(obj);
    fs.writeFile(filename, xml, function (err) {
      if (err) {
        deffer.reject(new RVHelper('EDB10000', err));
      } else {
        deffer.resolve(new RVHelper('EDB00000'));
      }
      return deffer.promise;
    });
  }
};
