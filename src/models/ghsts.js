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
    this.product = undefined;
    this.documents = [];
    this.submission = [];
    this.dossier = undefined;
    this.files = [];
    this.substances = [];
    this.toc = undefined;
    this.used_templates = undefined; 
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

  validationXML() {
    let deffer = this.$q.defer();
    let results = {};

    deffer.resolve(new RVHelper('EDB00000', results));
    return deffer.promise;
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

        if (!obj.GHSTS) {
          deffer.reject(new RVHelper('EDB13001'));
        } else {
          // set legal entities
          if (obj.GHSTS.LEGAL_ENTITIES)
            this.legalEntities = obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY ? obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY : [];
          // set receivers
          if (obj.GHSTS.RECEIVERS)
            this.receivers = obj.GHSTS.RECEIVERS.RECEIVER ? obj.GHSTS.RECEIVERS.RECEIVER : [];

          // set the Product from the xml
          if (obj.GHSTS.PRODUCT) {
            this.product = obj.GHSTS.PRODUCT;
            if (obj.GHSTS.PRODUCT.DOSSIER) {
              this.dossier = obj.GHSTS.PRODUCT.DOSSIER;
              if (obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION)
                this.submission = obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION;
            }
          }

          if (obj.GHSTS.FILES)
            this.files = obj.GHSTS.FILES.FILE ? obj.GHSTS.FILES.FILE : [];
          // set documents
          if (obj.GHSTS.DOCUMENTS)
            this.documents = obj.GHSTS.DOCUMENTS.DOCUMENT ? obj.GHSTS.DOCUMENTS.DOCUMENT : [];
          
          if (obj.GHSTS.SUBSTANCES) {
            this.substances = obj.GHSTS.SUBSTANCES.SUBSTANCE ? obj.GHSTS.SUBSTANCES.SUBSTANCE : [];
            if (this.substances.length > 0) {
              let subService = new SubstanceService(this.$q, BACKEND_CONST.DOSSIER_LEVEL_SERVICE, isActive);
              subService.jsonObjClassifierFromXml(this.substances).then(result => {
                this.substances = result;
              });
            }
          }

          this.toc = obj.GHSTS.TOC;

          this.used_templates = obj.GHSTS.USED_TEMPLATES;

          deffer.resolve(new RVHelper('EDB00000', this));
        }
      });
    });
    return deffer.promise;
  }

  writeXML(filename) {
    // write ghsts json tree back to xml
    let deffer = this.$q.defer();

    let obj = this.toGhstsJson();

    let builder = new xml2js.Builder({ rootName: 'GHSTS', attrkey: 'attr$' });
    let xml = builder.buildObject(obj);
    fs.writeFile(filename, xml, function (err) {
      if (err) {
        deffer.reject(new RVHelper('EDB10000', err));
      } else {
        deffer.resolve(new RVHelper('EDB00000'));
      }
    });
    return deffer.promise;
  }

  toGhstsJson() {
    let retVal = {
      GHSTS: {
      }
    };

    if (this.receivers.length > 0) {
      retVal.GHSTS.RECEIVERS = {};
      retVal.GHSTS.RECEIVERS.RECEIVER = this.receivers.map(item => {
        return this._getGhstsXML(item);
      });
    }

    if (this.product) {
      retVal.GHSTS.PRODUCT = this._getGhstsXML(this.product);

      if (this.dossier) {
        retVal.GHSTS.PRODUCT.DOSSIER = this._getGhstsXML(this.dossier);
        if (this.submission.length > 0) {
          retVal.GHSTS.PRODUCT.DOSSIER.SUBMISSION = this.submission.map(item => {
            return this._getGhstsXML(item);
          });
        }
      }
    }

    if (this.documents.length > 0) {
      retVal.GHSTS.DOCUMENTS = {};
      retVal.GHSTS.DOCUMENTS.DOCUMENT = this.documents.map(item => {
        return this._getGhstsXML(item);
      });
    }

    if (this.files.length > 0) {
      retVal.GHSTS.FILES = {};
      retVal.GHSTS.FILES.FILE = this.files.map(item => {
        return this._getGhstsXML(item);
      });
    }

    if (this.toc) {
      retVal.GHSTS.TOC = this._getGhstsXML(this.toc);
    }

    if (this.legalEntities.length > 0) {
      retVal.GHSTS.LEGAL_ENTITIES = {};
      retVal.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY = this.legalEntities.map(item => {
        return this._getGhstsXML(item);
      });
    }

    if (this.substances.length > 0) {
      retVal.GHSTS.SUBSTANCES = {};
      retVal.GHSTS.SUBSTANCES.SUBSTANCE = this.substances.map(item => {
        return this._getGhstsXML(item);
      });
    }

    retVal.GHSTS.USED_TEMPLATES = this.used_templates;
    
    return retVal;
  }

  _getGhstsXML(item) {
    if (item['toGhstsJson']) {
      return item.toGhstsJson();
    } else {
      return item;
    }

  }
};
