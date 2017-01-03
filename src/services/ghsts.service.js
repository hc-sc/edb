
const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const MetaDataStatus = require('../models/metadatastatus.model').MetaDataStatus;
const MetaDataStatusNode = require('../models/metadatastatus.model').MetaDataStatusNode;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');

const BaseService = require('./base.service');

const DossierService = require('./dossier.service.js');
const SubmissionService = require('./submission.service.js');

const Q = require('bluebird');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const eDB_Urls = require('./').ServiceNeedInit;

// const templateDir = path.resolve(basePath, BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, BACKEND_CONST.TEMPLATE_DIR_NAME);

const prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);
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

  ///Works for only one submission for now
  _subUrlProcess4Get(obj) {
    let self = this;
    if (obj._subUrl) {
      let subUrlObj = self._subUrlToObj(obj._subUrl);
      delete obj._subUrl;
      if (subUrlObj.subUrl) {
        let svrClass = require('./' + subUrlObj.subUrl + '.service');
        let svr = new svrClass();
        let ids = [];
        if (subUrlObj.subIds) {
          return svr.edb_get({ _id: subUrlObj.subIds }, true);
        } else {  ///get all sub-instances of the submission
          switch (subUrlObj.subUrl) {
            case 'receiver':
              ids = self.ghsts[0]._receivers;  /// need refacting for loading new ghsts, only one submission for release 1
              if (ids) {
                ids = ids.map(item => {
                  return item.receiver;
                });
              }
              break;
            default:
              ids = undefined;
          }
          if (!ids)
            return new Q((res, rej) => {
              res(new RVHelper('EDB00000'));
            });
          else
            return svr.edb_get({}, false, ids); /// need to return
        }
      } else if (subUrlObj.ghstsId) {
        return super.edb_get({ _id: subUrlObj.ghstsId }, obj._pop, obj._where);
      } else {
        return new Q((res, rej) => {
          rej(new RVHelper('EDB12008'));
        });
      }
    } else {
      return new Q((res, rej) => {
        rej(new RVHelper('EDB12008'));
      });
    }
  }


  ///Works for only one submission for now
  _subUrlProcess4Put(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curEntity, curMdsProp;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              if (!self.ghsts[0]._receivers)
                self.ghsts[0]._receivers = [];
              if (!self.ghsts[0]._metadatastatus.receivers) 
                self.ghsts[0]._metadatastatus.receivers = [];
              curProp = self.ghsts[0]._receivers;
              curMdsProp = self.ghsts[0]._metadatastatus.receivers;
              curEntity = { receiver: '', sender: [] };
              break;
            default:
              curProp = undefined;
          }
          if (!obj._id) 
            rej(new new RVHelper('EDB12014'));
          else {
            curEntity[subUrlObj.subUrl] = obj._id.toString();
            curProp.push(curEntity);
            curMdsProp.push(new MetaDataStatusNode(
              curEntity[subUrlObj.subUrl],
              MetaDataStatus.getMetadataStatusIdbyValue('new'),
              subUrlObj.subUrl
            ));
            res(self.edb_post(self.ghsts[0]));
          }
        } else {
          rej(new RVHelper('EDB12012'));
        }
      } else {
        rej(new RVHelper('EDB12012'));
      }
    });
  }

  ///Works for only one submission for now
  _subUrlProcess4Post(obj) {
    let self = this;
    if (obj._subUrl) {
      let subUrlObj = self._subUrlToObj(obj._subUrl);
      delete obj._subUrl;
      if (subUrlObj.subUrl) {
        let svrClass = require('./' + subUrlObj.subUrl + '.service');
        let svr = new svrClass();
        return new Q((res, rej) => {
          let method = subUrlObj.subIds ? 'edb_post' : 'edb_put';
          svr[method](obj)
            .then(ret => {
              let curProp, curEntity, curMdsProp;
              switch (subUrlObj.subUrl) {
                case 'receiver':
                  curProp = self.ghsts[0]._receivers;
                  curMdsProp = self.ghsts[0]._metadatastatus.receivers;
                  curEntity = { receiver: '', sender: [] };
                  break;
                default:
                  curProp = undefined;
              }
              curEntity[subUrlObj.subUrl] = JSON.parse(ret.data)[0]._id ? JSON.parse(ret.data)[0]._id.toString() : subUrlObj.subIds;  ///Todo: modify for Post
              curProp.push(curEntity);
              curMdsProp.push(new MetaDataStatusNode(
                curEntity[subUrlObj.subUrl],
                MetaDataStatus.getMetadataStatusIdbyValue('modified'),
                subUrlObj.subUrl
              ));
              return self.edb_post(self.ghsts[0]);
            })
            .then(ret => {
              res(ret);
            })
            .catch(err => {
              rej(err);
            });
        });
      } else {
        return new Q((res, rej) => {
          rej(new RVHelper('EDB12013'));
        });
      }
    } else {
      return new Q((res, rej) => {
        rej(new RVHelper('EDB12013'));
      });
    }
  }

  ///Works for only one submission for now
  _subUrlProcess4Del(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curEntity, curMdsProp;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receivers;
              curMdsProp = self.ghsts[0]._metadatastatus.receivers;
              break;
            default:
              curProp = undefined;
          }
          // curEntity[subUrlObj.subUrl] = JSON.parse(ret.data)[0]._id ? JSON.parse(ret.data)[0]._id.toString() : subUrlObj.subIds;  ///Todo: modify for Post
          curProp.push(curEntity);
          curMdsProp.push(new MetaDataStatusNode(
            curEntity[subUrlObj.subUrl],
            MetaDataStatus.getMetadataStatusIdbyValue('modified'),
            subUrlObj.subUrl
          ));
          self.edb_post(self.ghsts[0])
            .then(ret => {
              res(ret);
            })
            .catch(err => {
              rej(err);
            });
        } else {
          rej(new RVHelper('EDB12013'));
        }
      } else {
        rej(new RVHelper('EDB12013'));
      }
    });
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
        let mmodule = mongoose.model(self.modelClassName, mschema);
        if (self.inmem) {
          mmodule.find({})
            .exec((err, result) => {
              if (err)
                rej(err);
              else {
                if (self.inmem && result.length > 0)
                  global.modulesInMemory[self.modelClassName.toLowerCase()] = self._format4InMem(result);
                res(new RVHelper('EDB00000'));
              }
            });
        } else
          res(new RVHelper('EDB00000'));
      } catch (err) {
        rej(err);
      }
    });
  }

  edb_package() {
    return new Q((res, rej) => {
      console.log('package');
      //    return this._getGhstsObject().writeXML(absOutputFN);
      res(new RVHelper('EDB00000'));
    });
  }

  edb_validation() {
    return new Q((res, rej) => {
      console.log('validation');
      // return this._getGhstsObject().validateXML(absOutputFN, this._validate);
      res(new RVHelper('EDB00000'));
    });
  }

  edb_get(obj, pop, where) {
    let self = this;
    if (!obj) {
      let dosSvr = new DossierService();
      return dosSvr.edb_get({}, true);
    } else if (obj._subUrl) {
      return self._subUrlProcess4Get(obj);
    } else {
      let query = _.merge({}, obj);
      let keys = Object.keys(query);
      keys.map(key => {
        if (!key.startsWith('_')) {
          query['_' + key] = query[key];
          delete query[key];
        }
      });
      return new Q((res, rej) => {
        super.edb_get(query, pop, where)
          .then(ret => {
            self.ghsts[0] = JSON.parse(ret.data)[0];  ///Only one submission for Release 1
            res(ret);
          })
          .catch(err => {
            rej(err);
          });
      });
    }
  }

  edb_put(obj) {
    return new Q((res, rej) => {
      if (!obj) {
        rej(new RVHelper('EDB12002', obj));
        return;
      }

      let self = this;
      if (obj._subUrl)
        res(self._subUrlProcess4Put(obj));
      else {
        if (!obj.productShortName) {
          rej(new RVHelper('EDB12002', obj));
          return;
        }

        if (!obj.dossierId) {
          rej(new RVHelper('EDB12010', obj));
          return;
        }

        // if (!obj.productId) {
        //   rej(new RVHelper('EDB12009', obj));
        //   return;
        // }

        if (!obj.tocId) {
          rej(new RVHelper('EDB12011', obj));
          return;
        }
        res(self._create(obj));
      }
    });
  }

  edb_post(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl)
        res(self._subUrlProcess4Post(obj));
      else {
        res(super.edb_post(obj));
      }
    });
  }

  edb_delete(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl)
        res(self._subUrlProcess4Del(obj));
      else {
        res(super.edb_post);
      }
    });
  }

  _create(obj) {
    return new Q((res, rej) => {
      if (!obj._submissionid) {
        rej(new RVHelper('EDB12007', obj));
        return;
      }

      // let prodAndDossierName = obj.dossierShortName ? obj.productShortName + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + obj.dossierShortName : obj.productShortName;
      let self = this;
      let mds = new MetaDataStatus(self.version);
      mds.init((obj._submissionnumber === 1), obj._product, obj._tocid);
      delete mds.metadatastatusValues;
      let entity = _.merge({}, obj);
      entity._metadatastatus = mds;

      res(super._create(entity));
      // try {
      //   entityClass = require('mongoose').model(self.modelClassName);
      //   if (!entityClass)
      //     rej(new RVHelper('EDB13001', self.modelClassName));
      //   else {
      //     entityClass
      //       .create(entity, (err, rows) => {
      //         if (err)
      //           rej(err);
      //         else
      //           res(new RVHelper('EDB00000', JSON.stringify(rows)));
      //       });
      //   }
      // } catch (err) {
      //   rej(err);
      // }
    });
  }

  _findPrevGhstsBySubmissionId(submissionId) {
    let self = this;
    let submissions = DossierService.edb_getSync({ where: { submission: submissionId } })[0];
    if (submissions && submissions.submission) {
      submissions = submissions.submission.map(item => {
        return item.toString();
      });
      return self._findPrevGhstsInSubmissions(submissions);
    } else
      return undefined;
  }

  _findPrevGhstsByDossierId(dossierId) {
    let self = this;
    let submissions = DossierService.edb_getSync({ _id: dossierId })[0].submission;
    if (submissions && submissions.submission) {
      submissions = submissions.submission.map(item => {
        return item.toString();
      });
      return self._findPrevGhstsInSubmissions(submissions);
    } else
      return undefined;
  }

  _findPrevGhstsInSubmissions(submissions) {
    let retVal = SubmissionService.edb_getSync(submissions);
    retVal = _.orderBy(retVal, ['submissionnumber'], ['desc']);
    if (retVal.length <= 1)
      return undefined;
    else {
      if (retVal[0]._state === 'active')
        return retVal[1]._ghsts;
      else
        return retVal[0]._ghsts;
    }
  }

  _subUrlToObj(subUrl) {
    let retVal = {};
    let inUrl = subUrl.replace('ghsts/', '');
    let urlAry = inUrl.split('/');

    if (eDB_Urls.indexOf(urlAry[0]) >= 0) {  ///It is sub-url 
      retVal.subUrl = urlAry[0];
      if (urlAry[1]) { /// It is sub-id(s), 
        retVal.subIds = urlAry[1];
      }
    } else {  ///ghstsIdOrUrl is ghsts id and subSvrUrlOrId is sub-url  
      retVal.ghstsId = urlAry[0];
      if (urlAry[1]) {
        if (eDB_Urls.indexOf(urlAry[1]) >= 0) { ///It is sub-url  
          retVal.subUrl = urlAry[1];
          if (urlAry[2]) { /// has subIds
            retVal.subIds = urlAry[2];
          }
        }
      }
    }
    return retVal;
  }

  // _createPackage(prod_dossier_name, sub_id) {
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
