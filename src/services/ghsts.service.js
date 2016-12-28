// const GHSTS = require('../models/ghsts');
const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const MetaDataStatus = require('../models/metadatastatus.model').MetaDataStatus;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');

const BaseService = require('./base.service');

// const PicklistService = require('./picklist.service');
const DossierService = require('./dossier.service.js');

const Q = require('bluebird');

// const {
//   dialog
// } = require('electron');
const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
// const templateDir = path.resolve(basePath, BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.TEMPLATE_DIR_NAME);

// var prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);
// var curProdAndDossierDir = undefined,
//   curSubDir = undefined;
// var absOutputFN, absSubPath;


module.exports = class GhstsService extends BaseService {
  constructor(submissions_ref, validateInstance, marsh, unmarsh, version) {
    super('GHSTS', true, version);
    this.ghsts = submissions_ref;
    this._validate = validateInstance;
    this._marsh = marsh;
    this._unmarsh = unmarsh;
  }

  initMongoose() {
    return new Q((res, rej) => {
      let self = this;
      try {
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;

        let jschema = {
          _foldername: { type: String, required: true },
          _submissionid: { type: 'ObjectId', ref: 'SUBMISSION', required: true },
          _submissionnumber: { type: Number, default: 1 },
          _receivers: [{
            receiver: { type: 'ObjectId', ref: 'RECEIVER' },
            sender: [{ type: 'ObjectId', ref: 'SENDER' }]
          }],
          _product: { type: 'ObjectId', ref: 'PRODUCT' },
          _documents: [{ type: 'ObjectId', ref: 'DOCUMENT' }],
          _toc2docs: [{
            tocnodepid: { type: String },
            docId: { type: 'ObjectId', ref: 'DOCUMENT' }
          }],
          _tocdecription: {
            tocstandardname: { type: String, required: true, default: 'OECD' },
            tocversion: { type: String, required: true, default: '01.00.00' }
          },
          _metadatastatus: { type: Schema.Types.Mixed },
          usedtemplates: [{ type: String }],
          specificationversion: { type: String, default: self.version }
        };
        let mschema = new Schema(jschema, {
          retainKeyOrder: true,
          validateBeforeSave: false,
          toJSON: { getters: true, virtuals: true },
          toObject: { getters: true, virtuals: true }
        });
        mschema.plugin(ServiceLevelPlugin, { url: self.modelClassName.toLowerCase() });
        mongoose.model(self.modelClassName, mschema);
        res(new RVHelper('EDB00000'));
      } catch (err) {
        rej(err);
      }
    });
  }

  edb_package() {
    console.log('package');
    //    return this._getGhstsObject().writeXML(absOutputFN);
  }

  edb_validation() {
    console.log('validation');
    // return this._getGhstsObject().validateXML(absOutputFN, this._validate);
  }

  edb_get(obj, pop, where) {
    if (!obj) {
      let dosSvr = new DossierService();
      return dosSvr.edb_get({}, true);
    } else if (obj.url) {
      let inUrl = obj.url.replace('ghsts/', '');
      let urlAry = inUrl.split('/');
      let ghstsId = urlAry[0];
      let subSvrUrl = urlAry[1];
      let subIds = urlAry[2];
      if (subSvrUrl) {
        let svrClass = require('./' + subSvrUrl + '.service');
        let svr = new svrClass();
        if (subIds) {
          return svr.edb_get({ _id: subIds }, true);
        } else {
          // let ids4curSub = 
          // let whereObj = {
          //   fieldname: '_id',
          return super.edb_get(obj, pop, where); /// need to return
        }
      } else if (ghstsId) {
        return super.edb_get({ _id: ghstsId }, pop, where);
      } else
        return Q.reject(new RVHelper('EDB12008'));
    } else {
      let query = obj;
      let keys = Object.keys(query);
      keys.map(key => {
        query['_' + key] = query[key];
        delete query[key];
      });
      return super.edb_get(query, pop, where);
    }
  }

  edb_put(obj) {
    return new Q((res, rej) => {
      if (!obj) {
        rej(new RVHelper('EDB12002', obj));
        return;
      }

      if (!obj.productShortName) {
        rej(new RVHelper('EDB12002', obj));
        return;
      }

      if (!obj.submissionid) {
        rej(new RVHelper('EDB12007', obj));
        return;
      }

      let prodAndDossierName = obj.dossierShortName ? obj.productShortName + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + obj.dossierShortName : obj.productShortName;
      let self = this;
      let entityClass;
      let mds = new MetaDataStatus(self.version);
      mds.init(obj.submissionnumber === 1, obj.productid, obj.tocid);
      delete mds.metadatastatusValues;
      let entity = {
        _foldername: prodAndDossierName,
        _submissionid: obj.submissionid,
        _product: obj.productid,
        _submissionnumber: obj.submissionnumber,
        _metadatastatus: mds
      };

      try {
        entityClass = require('mongoose').model(self.modelClassName);
        if (!entityClass)
          rej(new RVHelper('EDB13001', self.modelClassName));
        else {
          entityClass
            .create(entity, (err, rows) => {
              if (err)
                rej(err);
              else
                res(new RVHelper('EDB00000', JSON.stringify(rows)));
            });
        }
      } catch (err) {
        rej(err);
      }
    });
  }

  // createSubmission(prod_dossier_name, sub_id) {
  //   let curBasePath = path.resolve(fs.realpathSync('./'), BACKEND_CONST.PRODUCTS_DIR),
  //     curFolder;

  //   if (!prod_dossier_name)
  //     throw new RVHelper('EDB12002');

  //   if (!sub_id)
  //     throw new RVHelper('EDB12007');

  //   try {
  //     this._createFolder(curBasePath);
  //     curFolder = path.resolve(curBasePath, prod_dossier_name);
  //     this._createFolder(curFolder);
  //     curBasePath = path.resolve(curFolder, sub_id);
  //     this._createFolder(curBasePath);
  //     curFolder = path.resolve(curBasePath, 'content');
  //     this._createFolder(curFolder);
  //     curFolder = path.resolve(curBasePath, 'confidential');
  //     this._createFolder(curFolder);
  //     curFolder = path.resolve(curBasePath, 'utils');
  //     this._createFolder(curFolder);
  //     this._createFolder(path.resolve(curFolder, 'viewer'));
  //     this._createFolder(path.resolve(curFolder, 'toc'));
  //     this._createFolder(path.resolve(curFolder, 'resources'));

  //     fs.writeFileSync(
  //       path.resolve(curBasePath, '.incomplete'),
  //       'The submission is not complated.'
  //     );
  //     return new RVHelper('EDB00000');
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  _createFolder(folderName) {
    try {
      fs.mkdirSync(folderName);
    } catch (err) {
      if (err.code !== 'EEXIST')
        throw err;
    }
  }

  // _beforeCreateOrLoad(filepath) {
  //   let curpath = filepath;

  //   if (curpath[1] === ':') {
  //     curpath = prodsPath[0] + curpath.slice(1);
  //   }
  //   curpath = curpath.replace(prodsPath, '').trim().replace(/\\/g, '/');
  //   if (curpath[0] === '/') curpath = curpath.slice(1);
  //   let pathArray = curpath.split('/');
  //   curProdAndDossierDir = curSubDir = undefined;

  //   switch (pathArray.length) {
  //     case 1:
  //       curProdAndDossierDir = pathArray[0];
  //       curSubDir = '01'; //for now
  //       break;
  //     case 2:
  //       curProdAndDossierDir = pathArray[0];
  //       curSubDir = pathArray[1];
  //       break;
  //     default:
  //       absSubPath = absOutputFN = undefined;
  //       return new RVHelper('EDB12003');
  //   }
  //   absSubPath = path.resolve(prodsPath, curProdAndDossierDir);
  //   absSubPath = path.resolve(absSubPath, curSubDir);
  //   absOutputFN = path.resolve(absSubPath, BACKEND_CONST.GHSTS_XML_FILENAME);
  // }

  // _initDbFromTemplate(version) {
  //   return new Q((res, rej) => {
  //     let self = this, filename = path.join(templateDir, BACKEND_CONST.GHSTS_XML_FILENAME);
  //     let picklistInst = new PicklistService();
  //     self._unmarsh.unmarshalFile(filename, (unmarshaled, err) => {
  //       if (err)
  //         rej(new RVHelper('EDB10000', err));

  //       let obj = unmarshaled.value;
  //       let createdItems = [];
  //       if (obj.substances) {
  //         let svrClass = require('./substance.service');
  //         let svr = new svrClass(version);

  //         svr._initDbFromTemplate(version, obj.substances.substance, picklistInst)
  //           .then((ret => {
  //             console.log(ret);
  //             res(ret);
  //           }))
  //           .catch(err => {
  //             console.log(err);
  //             rej(err);
  //           });
  //         // let mmodel = require('mongoose').model('SUBSTANCE');
  //         // items = obj.substances.substance;
  //         // items.map(item => {
  //         //   let dbobj = new mmodel(item);
  //         //   dbobj.save();
  //         //   console.log(dbobj);
  //         // }); 

  //         //          console.log(obj.substances);
  //       }
  //       //        res(new RVHelper('EDB00000'));
  //     });
  //   });
  // }


  //   // let deffer = this.$q.defer(),
  //   //   self = this;
  //   // if (!obj) {
  //   //   deffer.reject(new RVHelper('EDB12004'));
  //   // } else {
  //   //   let selPath = dialog.showOpenDialog({
  //   //     title: 'Choose a Product',
  //   //     properties: ['openDirectory'],
  //   //     defaultPath: prodsPath
  //   //   });
  //   //   if (selPath) {
  //   //     let isOK = self._beforeCreateOrLoad(selPath[0]);
  //   //     if (isOK.code !== 'EDB00000') {
  //   //       deffer.reject(isOK);
  //   //     } else {
  //   //       self._loadGhsts()
  //   //         .then(result => {
  //   //           //              self.ghsts.push(self._getGhstsGroup(result));
  //   //           self.ghsts[0] = self._getGhstsGroup(result);
  //   //           deffer.resolve(new RVHelper('EDB00000'));
  //   //         })
  //   //         .catch(err => {
  //   //           deffer.reject(err);
  //   //         });
  //   //     }
  //   //   } else {
  //   //     deffer.reject(new RVHelper('EDB00001'));
  //   //   }
  //   // }
  //   // return deffer.promise;

  // _loadGhsts(templatePath) {
  //   let ghstsObj = {};

  //   ghstsObj = new GHSTS(absSubPath, curProdAndDossierDir);
  //   return ghstsObj.readObjects(templatePath);
  // }

  // _clearSubmission(ghstsObj) {
  //   return Promise.all([
  //     //            this.receiverService.receivers.remove({}, { multi: true }),
  //     //      this.legalEntityService.legalEntities.remove({}, { multi: true }),
  //     //            this.productService.productsDb.remove({}, { multi: true }),
  //     //            this.dossierService.dossiers.remove({}, { multi: true }),
  //     //      this.substanceService.substancesDb.remove({}, { multi: true }),
  //     //            this.documentService.documents.remove({}, { multi: true }),
  //     //      this.fileService.files.remove({}, { multi: true })
  //   ]);
  // }

  // _getGhstsObject(obj) {
  //   return obj ? this.ghsts[0] : this.ghsts[0];
  // }

  // createProduct(prod_name) {
  //   return this.createSubmission(prod_name, '01');
  // }

};
