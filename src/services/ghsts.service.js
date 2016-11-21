const GHSTS = require('../models/ghsts');
const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const PicklistService = require('./picklist.service');

const Q = require('bluebird');

const {
  dialog
} = require('electron');
const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const templateDir = path.resolve(basePath, 'resources', 'app', BACKEND_CONST.TEMPLATE_DIR_NAME);

var prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);
var curProdAndDossierDir = undefined,
  curSubDir = undefined;
var absOutputFN, absSubPath;


module.exports = class GhstsService {
  constructor(submissions_ref, validateInstance, marsh, unmarsh) {
    this.ghsts = submissions_ref;
    this._validate = validateInstance;
    this._url = SHARED_CONST.GHSTS_SERVICE_URL;
    this._marsh = marsh;
    this._unmarsh = unmarsh;
  }

  _initDbFromTemplate(version) {
    return new Q((res, rej) => {
      let self = this, filename = path.join(templateDir, BACKEND_CONST.GHSTS_XML_FILENAME);
      let picklistInst = new PicklistService();
      self._unmarsh.unmarshalFile(filename, (unmarshaled, err) => {
        if (err)
          rej(new RVHelper('EDB10000', err));

        let obj = unmarshaled.value;
        let createdItems = [];
        if (obj.substances) {
          let svrClass = require('./substance.service');
          let svr = new svrClass(version);

          svr._initDbFromTemplate(version, obj.substances.substance, picklistInst)
            .then((ret => {
              console.log(ret);
              res(ret);
            }))
            .catch(err => {
              console.log(err);
              rej(err);
            });
          // let mmodel = require('mongoose').model('SUBSTANCE');
          // items = obj.substances.substance;
          // items.map(item => {
          //   let dbobj = new mmodel(item);
          //   dbobj.save();
          //   console.log(dbobj);
          // }); 

//          console.log(obj.substances);
        }
//        res(new RVHelper('EDB00000'));
      });
    });
  }

  edb_package() {
    console.log('package');
    return this._getGhstsObject().writeXML(absOutputFN);
  }

  edb_validation() {
    console.log('validation');
    return this._getGhstsObject().validateXML(absOutputFN, this._validate);
  }

  edb_put(obj) {
    let self = this;
    return new Q((resolve, reject) => {
      if (obj) {
        if (obj.productShortName) {
          let prodAndDossierName = obj.dossierShortName ? obj.productShortName + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + obj.dossierShortName : obj.productShortName;
          try {
            this.createProduct(prodAndDossierName)
            self._beforeCreateOrLoad(prodAndDossierName);
          } catch (err) {
            reject(new RVHelper('EDB10000', err));
          }

          self._loadGhsts(templateDir)
            .then(result => {
              self.ghsts[0] = result;
              resolve(new RVHelper('EDB00000'));
            })
            .catch(err => {
              reject(err);
            });
        }
      } else {
        reject(new RVHelper('EDB12002'));
      }
    });
  }

  edb_get(obj) {
    let deffer = this.$q.defer(),
      self = this;
    if (!obj) {
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
          self._loadGhsts()
            .then(result => {
              //              self.ghsts.push(self._getGhstsGroup(result));
              self.ghsts[0] = self._getGhstsGroup(result);
              deffer.resolve(new RVHelper('EDB00000'));
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

  _loadGhsts(templatePath) {
    let ghstsObj = {};

    ghstsObj = new GHSTS(absSubPath, curProdAndDossierDir);
    return ghstsObj.readObjects(templatePath);
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
    return obj ? this.ghsts[0] : this.ghsts[0];
  }

  createSubmission(prod_dossier_name, sub_name) {
    let curBasePath = path.resolve(fs.realpathSync('./'), 'products'),
      curFolder;

    if (!prod_dossier_name)
      throw new RVHelper('EDB12002');

    if (!sub_name)
      throw new RVHelper('EDB12007');

    try {
      this._createFolder(curBasePath);
      curFolder = path.resolve(curBasePath, prod_dossier_name);
      this._createFolder(curFolder);
      curBasePath = path.resolve(curFolder, sub_name);
      this._createFolder(curBasePath);
      curFolder = path.resolve(curBasePath, 'content');
      this._createFolder(curFolder);
      curFolder = path.resolve(curBasePath, 'confidential');
      this._createFolder(curFolder);
      curFolder = path.resolve(curBasePath, 'utils');
      this._createFolder(curFolder);
      this._createFolder(path.resolve(curFolder, 'viewer'));
      this._createFolder(path.resolve(curFolder, 'toc'));
      this._createFolder(path.resolve(curFolder, 'resources'));

      fs.writeFileSync(
        path.resolve(curBasePath, '.incomplete'),
        'The submission is not complated.'
      );
      return new RVHelper('EDB00000');
    } catch (err) {
      throw err;
    }
  }

  createProduct(prod_name) {
    return this.createSubmission(prod_name, '01');
  }

  _createFolder(folderName) {
    try {
      fs.mkdirSync(folderName);
    } catch (err) {
      if (err.code !== 'EEXIST')
        throw err;
    }
  }

  _beforeCreateOrLoad(filepath) {
    let curpath = filepath;

    if (curpath[1] === ':') {
      curpath = prodsPath[0] + curpath.slice(1);
    }
    curpath = curpath.replace(prodsPath, '').trim().replace(/\\/g, '/');
    if (curpath[0] === '/') curpath = curpath.slice(1);
    let pathArray = curpath.split('/');
    curProdAndDossierDir = curSubDir = undefined;

    switch (pathArray.length) {
      case 1:
        curProdAndDossierDir = pathArray[0];
        curSubDir = '01'; //for now
        break;
      case 2:
        curProdAndDossierDir = pathArray[0];
        curSubDir = pathArray[1];
        break;
      default:
        absSubPath = absOutputFN = undefined;
        return new RVHelper('EDB12003');
    }
    absSubPath = path.resolve(prodsPath, curProdAndDossierDir);
    absSubPath = path.resolve(absSubPath, curSubDir);
    absOutputFN = path.resolve(absSubPath, BACKEND_CONST.GHSTS_XML_FILENAME);
  }
};
