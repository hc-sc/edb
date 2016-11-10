const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const PickListService = require('../services/picklist.service');
const BACKEND_CONST = require('../constants/backend');
const basePath = fs.realpathSync('./');
const _ = require('lodash');
//const DBRef = require('./db.ref');
const BaseModel = require('./base.model');
const Q = require('bluebird');

var dataPath = path.resolve(basePath, 'data');

module.exports = class GHSTS extends BaseModel {
  constructor(filePath, prodAndDossierName) {
    super('ghsts', undefined, {
      'xmlns': 'http://www.oecd.org/GHSTS',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.oecd.org/GHSTS utils/ghsts_01-00-01.xsd'
    });
    this._filePath = filePath;
    this._prodAndDossierName = prodAndDossierName;
    this._dbpath = path.resolve(dataPath, prodAndDossierName);
    /*    this.legalEntities = [];
        this.receivers = [];
        this.product = {};
        this.documents = [];
        this.submission = [];
        this.dossier = {};
        this.files = [];
        this.substances = [];
        this.toc = {};
        this.used_templates = {};
    */
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

  validateXML(filename, validateInst) {
    let self = this,
      deffer = self.$q.defer();

    self.writeXML(filename).then(result => {
      if (result.code === 'EDB00000') {
        //Unmarshall an object from the XML retrieved from the URL 
        // Then we create a unmarshaller 
        let unmarshaller = context.createUnmarshaller();

        //Unmarshal an object from the XML retrieved from the URL 
        //        let xmlSource = file:' + filename;

        unmarshaller.unmarshalFile(filename, function (unmarshalled) {
          // This callback function will be provided with the result of the unmarshalling  
          //          let ghstsJSON = JSON.parse(fs.readFileSync(filename).toString());
          let valid = validateInst(unmarshalled);

          fs.unlink(filename);
          if (!valid) {
            //      console.log(validate.errors);
            //        console.log(err.dataPath + ' ' + err.message);
            deffer.reject(new RVHelper('EDB30001', validateInst.errors));
          } else {
            //      console.log('Data is valid');
            deffer.resolve(new RVHelper('EDB30000'));
          }
        });
      }
    });
    return deffer.promise;
  }

  readObjects(templatePath) {
    // read json objects from DB file or ghsts xml
    let fStat, self = this; //, deffer = self.$q.defer();

    if (templatePath) {
      return self._readObjectsFromXML(templatePath);
    } else {
      self._dbpath = path.resolve(self._dbpath);
      try {
        fStat = fs.statSync(self._dbpath);
        if (fStat.isDirectory()) {
          return self._readObjectsFromDB();
        } else {
          return self._readObjectsFromXML();
        }
      } catch (err) {
        return self._readObjectsFromXML();
      }
    }
  }

  _readObjectsFromDB() {
    // write ghsts json tree back to xml
    let self = this,
      deffer = self.$q.defer();
    let keys = Object.keys(self);
    //    let qArray = [], keyArray = [];

    keys.map(key => {
      if (key[0] !== '$' && key[0] !== '_') {
        if (self[key]) {
          let srvClass = this._getServiceClassFromFields(key);
          let srvInst = new srvClass(self.$q, BACKEND_CONST.DOSSIER_LEVEL_SERVICE, self._prodAndDossierName);
          srvInst.edb_get().then(result => {
              if (result.data) {
                if (self[key].constructor === Array) {
                  self[key] = _.sortBy(result.data, ['createdAt']);
                } else {
                  self[key] = result.data[0];
                }
              }
            })
            .catch(err => {
              deffer.reject(new RVHelper('EDB10000', err));
              return deffer.promise;
            });
        }
      }
    });
    deffer.resolve(new RVHelper('EDB00000', self));

    return deffer.promise;
  }

  _readObjectsFromXML(filePath) {
    // read json objects from ghsts xml
    let self = this,
      fileName;
    let keys = Object.keys(self);

    return new Q((resolve, reject) => {
      fileName = filePath ? path.resolve(filePath, BACKEND_CONST.GHSTS_XML_FILENAME) : path.resolve(self._filePath, BACKEND_CONST.GHSTS_XML_FILENAME);
      fs.stat(fileName, (err, stat) => {
        if (err) {
          reject(new RVHelper('EDB10000', err));
        } else if (!stat.isFile()) {
          reject(new RVHelper('EDB12005', filePath));
        }
      });

      try {
        fs.readFile(fileName, {
          encoding: 'utf8'
        }, (err, xmlStr) => {
          if (err) {
            reject(new RVHelper('EDB10000', err));
          }
          // parse the xml to json object
          xml2js.parseString(xmlStr, {
            attrkey: 'attr$',
            explicitArray: false
          }, (err, obj) => {
            // check for errors
            if (err) {
              reject(new RVHelper('EDB10000', err));
            }

            if (!obj.GHSTS) {
              reject(new RVHelper('EDB30001'));
            } else {
              // set legal entities
              if (obj.GHSTS.LEGAL_ENTITIES)
                self.legalEntities = obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY ? obj.GHSTS.LEGAL_ENTITIES.LEGAL_ENTITY : [];
              // set receivers
              if (obj.GHSTS.RECEIVERS)
                self.receivers = obj.GHSTS.RECEIVERS.RECEIVER ? obj.GHSTS.RECEIVERS.RECEIVER : [];

              // set the Product from the xml
              if (obj.GHSTS.PRODUCT) {
                self.product = obj.GHSTS.PRODUCT;
                if (obj.GHSTS.PRODUCT.DOSSIER) {
                  self.dossier = obj.GHSTS.PRODUCT.DOSSIER;
                  if (obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION) {
                    if (typeof obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION === 'object') {
                      self.submission.push(obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION);
                    } else {
                      self.submission = obj.GHSTS.PRODUCT.DOSSIER.SUBMISSION;
                    }
                    delete self.dossier.SUBMISSION;
                  }
                  delete self.product.DOSSIER;
                }
              }

              if (obj.GHSTS.FILES)
                self.files = obj.GHSTS.FILES.FILE ? obj.GHSTS.FILES.FILE : [];
              // set documents
              if (obj.GHSTS.DOCUMENTS)
                self.documents = obj.GHSTS.DOCUMENTS.DOCUMENT ? obj.GHSTS.DOCUMENTS.DOCUMENT : [];

              if (obj.GHSTS.SUBSTANCES) {
                self.substances = obj.GHSTS.SUBSTANCES.SUBSTANCE ? obj.GHSTS.SUBSTANCES.SUBSTANCE : [];
              }

              self.toc = obj.GHSTS.TOC;

              self.used_templates = obj.GHSTS.USED_TEMPLATES;

              let pklInst = new PickListService();
              keys.map(key => {
                if (key[0] !== '$' && key[0] !== '_') {
                  if (self[key]) {
                    let srvClass = self._getServiceClassFromFields(key);
                    let srvInst = new srvClass();
                    srvInst.jsonObjClassifierFromXml(self[key], pklInst)
                      .then(result => {
                        self[key] = result.data;
                      });
                  }
                }
              });

              resolve(new RVHelper('EDB00000', self));
            }
          });
        });
      } catch (err) {
        reject(new RVHelper('EDB10001', err));
      }

    });
  }

  writeXML(filename) {
    // write ghsts json tree back to xml
    let deffer = this.$q.defer();

    let obj = this.toGhstsJson();

    let builder = new xml2js.Builder({
      rootName: 'GHSTS',
      attrkey: 'attr$'
    });
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
        attr$: {
          'xmlns': 'http://www.oecd.org/GHSTS',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation': 'http://www.oecd.org/GHSTS utils/ghsts_01-00-01.xsd',
          'specificationversion': '01.00.00'
        }
      },
      self = this;

    if (self.receivers.length > 0) {
      retVal.RECEIVERS = {};
      retVal.RECEIVERS.RECEIVER = self.receivers.map(item => {
        return self._getGhstsXML(item);
      });
    }

    if (self.product) {
      retVal.PRODUCT = self._getGhstsXML(self.product);

      if (self.dossier) {
        let dossierXML = self._getGhstsXML(self.dossier);
        if (self.submission.length > 0) {
          let submissionXML = self.submission.map(item => {
            return self._getGhstsXML(item);
          });
          dossierXML.SUBMISSION = submissionXML;
        }
        retVal.PRODUCT.DOSSIER = dossierXML;
      }
    }

    if (self.documents.length > 0) {
      retVal.DOCUMENTS = {};
      retVal.DOCUMENTS.DOCUMENT = self.documents.map(item => {
        return self._getGhstsXML(item);
      });
    }

    if (self.files.length > 0) {
      retVal.FILES = {};
      retVal.FILES.FILE = self.files.map(item => {
        return self._getGhstsXML(item);
      });
    }

    if (self.toc) {
      retVal.TOC = self._getGhstsXML(self.toc);
    }

    if (self.legalEntities.length > 0) {
      retVal.LEGAL_ENTITIES = {};
      retVal.LEGAL_ENTITIES.LEGAL_ENTITY = self.legalEntities.map(item => {
        return self._getGhstsXML(item);
      });
    }

    if (self.substances.length > 0) {
      retVal.SUBSTANCES = {};
      retVal.SUBSTANCES.SUBSTANCE = self.substances.map(item => {
        return self._getGhstsXML(item);
      });
    }

    retVal.USED_TEMPLATES = self.used_templates;

    return retVal;
  }

  _getGhstsXML(item) {
    let retItem = undefined;
    if (item['toGhstsJson']) {
      retItem = item.toGhstsJson();
    } else {
      retItem = JSON.stringify(item);
      retItem = JSON.parse(retItem);
      delete retItem.createdAt;
      delete retItem.updatedAt;
    }
    return retItem;
  }

  _getServiceClassFromFields(fieldName) {
    let retClass = undefined,
      retClassName = undefined,
      retClassFileName = undefined;
    let curFieldName = fieldName,
      retClassNameAry = [];

    retClassName = fieldName;

    if (curFieldName === 'legalEntities') {
      retClassName = 'Legal_EntityService';
      retClassFileName = 'legal.entity.service';
    } else {
      if (curFieldName[curFieldName.length - 1] === 's') {
        retClassName = curFieldName.slice(0, -1);
      }
      retClassFileName = retClassName.replace('_', '.') + '.service';
      retClassNameAry = retClassName.split('_').map(item => {
        return item[0].toUpperCase() + item.slice(1);
      });
      retClassName = retClassNameAry.toString().replace(',', '_');
      retClassName = retClassName + 'Service';
    }
    retClass = require('../services/' + retClassFileName);
    return retClass;
  }
};
