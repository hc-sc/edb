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

const {dialog} = require('electron');
var fs = require('fs');
var path = require('path');
var basePath = fs.realpathSync('./');
var prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);
var curProdDir = undefined, curDossierDir = undefined, curSubDir = undefined;
var absOutputFN = undefined, absSubPath = undefined, absInFN = undefined;


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
    let deffer = this.$q.defer(), self = this;
    if (obj) {
      if (obj.productShortName) {
        this.createProduct(obj.productShortName)
          .then(() => {
            let isOK = self._beforeCreateOrLoad(obj.productShortName);
            if (isOK.code !== 'EDB00000') {
              deffer.reject(isOK);
            } else {
              self._loadXml(absInFN, true)
                .then(result => {
                  self.ghsts.push(result.data);
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
          self._loadXml(absInFN, true).then(result => {
            self.ghsts.push(result.data);
            deffer.resolve(isOK);
          })
            .catch(err => {
              deffer.reject(err);
            });
        }
      } else {
        deffer.reject(new RVHelper('EDB00001'));
      }
    }
    return deffer.promise;
  }

  _loadXml(filePath, isActive) {
    let obj = new GHSTS(this.$q, filePath);
    return obj.readObjects(isActive);
  }

  _clearSubmission() {
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

  _getGhstsObject() {
    return this.ghsts[0];
  }

  _assembleDemoGHSTS() {
    let outputObj = new GHSTS();

    // PATCH FOR RIGHT NOW, SINCE WE ARE MISSING FILES and TOC
    outputObj.ghsts = this.submission.ghsts;

    /*    return this.legalEntityService.getLegalEntities()
          .then(les => {
            for (const le of les) {
              outputObj.addLegalEntity(new LegalEntity(le).toGHSTSJson());
            }
    
            outputObj.setLegalEntities();
    
            return this.receiverService.getReceivers();
          })
          .then(res => {
            for (const re of res) {
              outputObj.addReceiver(new Receiver(re).toGHSTSJson());
            }
    
            outputObj.setReceivers();
    
            return this.documentService.getDocuments();
          })
          .then(docList => {
            for (const document of docList) {
              outputObj.addDocument(new Document(document).toGHSTSJson());
            }
    
            outputObj.setDocuments();
    
            return this.productService.getProducts();
          })
          .then(products => {
            outputObj.setProduct(new Product(products[0]).toGhstsJson());
    
            return this.dossierService.getDossiers();
          })
          .then(dossiers => {
            outputObj.setDossier(new Dossier(dossiers[0]).toGhstsJson());
    
            return this.substanceService.getSubstances();
          })
          .then(substances => {
            for (const substance of substances) {
              outputObj.addSubstance(new Substance(substance).toGhstsJson());
            }
    
            outputObj.setSubstances();
    
            return this.fileService.getFiles();
          })
          .then(files => {
            for (const file of files) {
              outputObj.addFile(new File(file).toGHSTSJson())
            }
    */
    return this.substanceService.edb_get()
      .then(substances => {
        console.log('Loaded ' + substances.length);
        for (const substance of substances) {
          //          outputObj.addSubstance(new Substance(substance).toGhstsJson());
        }

        outputObj.setSubstances();

        return outputObj.writeXML(absOutputFN);
      })
      .then(() => {
        console.log(`Successfully written to ${absOutputFN}`);
      });
  }

  createSubmission(proj_name, sub_name) {
    let curBasePath = path.resolve(fs.realpathSync('./'), 'products'),
      deferred = this.$q.defer();

    if (!proj_name)
      deferred.reject('project name must be defined!');
    else if (!sub_name)
      deferred.reject('submission name must be defined!');
    else {
      this._createFolder(curBasePath)
        .then((folder) => {
          this._createFolder(path.resolve(folder, proj_name))
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
                  return this._copyXmlTemplate(curBasePath)
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
      let inputFile = path.resolve(fs.realpathSync('./'), 'resources', 'app', 'templates', 'ghsts.xml');
      let ouptFile = path.resolve(folderName, 'ghsts.xml');

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
    curProdDir = curDossierDir = curSubDir = undefined;

    switch (pathArray.length) {
      case 1:
        curProdDir = pathArray[0];
        curSubDir = '01';  //for now
        break;
      case 2:
        curProdDir = pathArray[0];
        if (Number.isNaN(pathArray[1])) {
          curDossierDir = pathArray[1];
          curSubDir = '01'; //for now
        } else {
          curSubDir = pathArray[1];
        }
        break;
      case 3:
        curProdDir = pathArray[0];
        curDossierDir = pathArray[1];
        curSubDir = pathArray[2];
        break;
      default:
        absSubPath = absOutputFN = absInFN = undefined;
        return new RVHelper('EDB12003');
    }
    absSubPath = path.resolve(prodsPath, curProdDir);
    if (curDossierDir)
      absSubPath = path.resolve(absSubPath, curDossierDir);
    absSubPath = path.resolve(absSubPath, curSubDir);
    absOutputFN = path.resolve(absSubPath, 'ghstsDemo.xml');
    absInFN = path.resolve(absSubPath, 'ghsts.xml');
    return new RVHelper('EDB00000');
  }
};
