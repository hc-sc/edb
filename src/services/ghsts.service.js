const GHSTS = require('../models/ghsts');
//import {ContactPerson, ContactAddress, LegalEntity} from '../../legal-entity/legal-entity.model.js';
//import {Receiver, Sender} from '../../receivers/receiverModel.js';
//import {ValueStruct} from '../shared.model';
//import {Product} from '../../product/product.model';
//import { Dossier } from '../../dossier/dossier.model';
//import { Document } from '../document/documentModel';
//import { Substance, SubstanceIdentifierStruct } from '../../substance/substance.model';
//import {FileRA, FileGeneric, File} from '../../files/file.model';
const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
//const OUTPUT_FILE = `${__dirname}/${DATA_DIR}/output.xml`;
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const NumberFormat = require('number-format.js');

const {dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const templateDir = path.resolve(basePath, 'resources', 'app', 'templates');

var prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);
var curProdAndDossierDir = undefined, curSubDir = undefined, lastSubDir = undefined;
var absOutputFN, absSubPath, absLastSubPath;


module.exports = class GhstsService {
  constructor($q, submissions_ref) {
    this.$q = $q;
    this.ghsts = submissions_ref;
    this.url = SHARED_CONST.GHSTS_SERVICE_URL;
  }

  edb_package() {
    console.log('package');
    return this._getGhstsObject().writeXML(absOutputFN);
  }

  edb_validation() {
    console.log('validation');
    return this._getGhstsObject().validateXML();
  }

  edb_put(obj) {
    let self = this, deffer = self.$q.defer();
    if (obj) {
      if (obj.productShortName) {
        let prodAndDossierName = obj.dossierShortName ? obj.productShortName + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + obj.dossierShortName : obj.productShortName;
        this.createProduct(prodAndDossierName)
          .then(() => {
            let isOK = self._beforeCreateOrLoad(prodAndDossierName);
            if (isOK.code !== 'EDB00000') {
              deffer.reject(isOK);
            } else {
              self._loadGhsts(templateDir)
                .then(result => {
                  self.ghsts.push(result);
                  deffer.resolve(new RVHelper('EDB00000'));
                })
                .catch(err => {
                  deffer.reject(err);
                });
            }
          })
          .catch(err => {
            deffer.reject(new RVHelper('EDB10000', err));
          });
      } else {
        deffer.reject(new RVHelper('EDB12002'));
      }
    } else {
      deffer.reject(new RVHelper('EDB12001'));
    }
    return deffer.promise;
  }

  edb_get(obj) {
    let deffer = this.$q.defer(), self = this;
    if (obj) {
      deffer.reject(new RVHelper('EDB12004'));
      return deffer.promise;
    } else {
      let selPath = dialog.showOpenDialog({
        title: 'Choose a Product',
        properties: ['openDirectory'],
        defaultPath: prodsPath
      });
      if (selPath) {
        let isOK = self._beforeCreateOrLoad(selPath[0]);
        if (isOK.code !== 'EDB00000') {
          deffer.reject(isOK);
        } else {
          return self._loadGhsts();
        }
      } else {
        deffer.reject(new RVHelper('EDB00001'));
        return deffer.promise;
      }
    }
  }

  _loadGhsts(templatePath) {
    let ghstsObj = {}, self = this;
    let deffer = self.$q.defer();

    ghstsObj[BACKEND_CONST.ACTIVE_SUBMISSION_NAME] = new GHSTS(this.$q, absSubPath, curProdAndDossierDir);
    if (absLastSubPath) {
      ghstsObj[BACKEND_CONST.LAST_SUBMISSION_NAME] = new GHSTS(this.$q, absLastSubPath, curProdAndDossierDir);
    } else {
      ghstsObj[BACKEND_CONST.LAST_SUBMISSION_NAME] = undefined; 
    }

    if (absLastSubPath) {
      self.$q.all([
        ghstsObj[BACKEND_CONST.ACTIVE_SUBMISSION_NAME].readObjects(true, templatePath),
        ghstsObj[BACKEND_CONST.LAST_SUBMISSION_NAME].readObjects(false)
      ]).then(result => {
        ghstsObj[0] = result[0];
        ghstsObj[1] = result[1];
        self.ghsts.push(ghstsObj);
        deffer.resolve(new new RVHelper('EDB00000'));
      });
    } else {
      self.$q.all([ghstsObj[BACKEND_CONST.ACTIVE_SUBMISSION_NAME].readObjects(true, templatePath)]).then(result =>{
        ghstsObj[0] = result[0];
        self.ghsts.push(ghstsObj);
        deffer.resolve(new new RVHelper('EDB00000'));
      });
    }
    return deffer.promise;
    
  }

  _clearSubmission(ghstsObj) {
    return Promise.all([
      //            this.receiverService.receivers.remove({}, { multi: true }),
      //      this.legalEntityService.legalEntities.remove({}, { multi: true }),
      //            this.productService.productsDb.remove({}, { multi: true }),
      //            this.dossierService.dossiers.remove({}, { multi: true }),
      //      this.substanceService.substancesDb.remove({}, { multi: true }),
      //            this.documentService.documents.remove({}, { multi: true }),
      //      this.fileService.files.remove({}, { multi: true })
    ]);
  }

  _getGhstsObject(obj) {
    return obj ? this.ghsts[0][BACKEND_CONST.LAST_SUBMISSION_NAME] : this.ghsts[0][BACKEND_CONST.ACTIVE_SUBMISSION_NAME];
  }

  createSubmission(prod_dossier_name, sub_name) {
    let curBasePath = path.resolve(fs.realpathSync('./'), 'products'),
      deferred = this.$q.defer();

    if (!prod_dossier_name)
      deferred.reject('project name must be defined!');
    else if (!sub_name)
      deferred.reject('submission name must be defined!');
    else {
      this._createFolder(curBasePath)
        .then((folder) => {
          this._createFolder(path.resolve(folder, prod_dossier_name))
            .then((folder) => {
              curBasePath = path.resolve(folder, sub_name);
              this._createFolder(curBasePath)
                .then((folder) => {
                  this._createFolder(path.resolve(folder, 'content'));
                  this._createFolder(path.resolve(folder, 'confidential'));
                  this._createFolder(path.resolve(folder, 'utils'))
                    .then((folder) => {
                      this._createFolder(path.resolve(folder, 'viewer'));
                      this._createFolder(path.resolve(folder, 'toc'));
                      this._createFolder(path.resolve(folder, 'resources'))
                    });
                })
                .then(() => {
                  fs.writeFile(
                    path.resolve(curBasePath, '.incomplete'),
                    'The submission is not complated.',
                    (err) => {
                      if (err)
                        deferred.reject(new RVHelper('EDB10000', err));
                      else
                        deferred.resolve(new RVHelper('EDB00000', curBasePath));
                    }
                  );
                });
            });
        })
        .catch(err => {
          deferred.reject(new RVHelper('EDB10000', err));
        });
    }
    return deferred.promise;
  }

  createProduct(prod_name) {
    return this.createSubmission(prod_name, '01');
  }

  _copyXmlTemplate(folderName) {
    let deferred = this.$q.defer();
    try {
      let inputFile = path.resolve(templateDir, BACKEND_CONST.GHSTS_XML_FILENAME);
      let ouptFile = path.resolve(folderName, BACKEND_CONST.GHSTS_XML_FILENAME);

      fs.createReadStream(inputFile).pipe(fs.createWriteStream(ouptFile));
      console.log('template copied');
      deferred.resolve(new RVHelper('EDB00000'));
    } catch (err) {
      deferred.reject(new RVHelper('EDB10000', err));
    }
    return deferred.promise;
  }

  _createFolder(folderName) {
    let deferred = this.$q.defer();
    fs.mkdir(folderName, (err) => {
      if (err) {
        if (err.code === 'EEXIST')
          deferred.resolve(folderName);
        else
          deferred.reject(err);
      }
      else
        deferred.resolve(folderName);
    });
    return deferred.promise;
  }

  _beforeCreateOrLoad(filepath) {
    let curpath = filepath;
    if (curpath[1] === ':') {
      curpath = prodsPath[0] + curpath.slice(1);
    }
    curpath = curpath.replace(prodsPath, '').trim().replace(/\\/g, '/');
    if (curpath[0] === '/') curpath = curpath.slice(1);
    let pathArray = curpath.split('/');
    curProdAndDossierDir = curSubDir = lastSubDir = undefined;

    switch (pathArray.length) {
      case 1:
        curProdAndDossierDir = pathArray[0];
        curSubDir = '01';  //for now
        break;
      case 2:
        curProdAndDossierDir = pathArray[0];
        curSubDir = pathArray[1];
        break;
      default:
        absSubPath = absOutputFN = absLastSubPath = undefined;
        return new RVHelper('EDB12003');
    }
    absSubPath = path.resolve(prodsPath, curProdAndDossierDir);
    if (!isNaN(curSubDir)) {
      lastSubDir = curSubDir - 1;
      if (lastSubDir > 0) { 
        lastSubDir = NumberFormat('0#', lastSubDir);
        absLastSubPath = path.resolve(absSubPath, lastSubDir);
      } 
    }
    absSubPath = path.resolve(absSubPath, curSubDir);
    absOutputFN = path.resolve(absSubPath, BACKEND_CONST.GHSTS_XML_FILENAME);

    return new RVHelper('EDB00000');
  }
};
