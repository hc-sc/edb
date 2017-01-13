
const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const MetaDataStatus = require('../models/metadatastatus.model').MetaDataStatus;
const MetaDataStatusNode = require('../models/metadatastatus.model').MetaDataStatusNode;
const MetaDataStatusNodeWithRA = require('../models/metadatastatus.model').MetaDataStatusNodeWithRA;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');

const BaseService = require('./base.service');

const ReceiverService = require('./receiver.service');
const SenderService = require('./sender.service');
const LegalEntityService = require('./legalentity.service');
const DossierService = require('./dossier.service');
const SubmissionService = require('./submission.service');
const SubstanceService = require('./substance.service');
const FileService = require('./file.service');

const Q = require('bluebird');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const eDB_Urls = require('./').ServiceNeedInit;

const DateTimeProc = require('../utils/datetime.process');

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

  _buildXmlJson() {
    return new Q((res, rej) => {
      let self = this;
      let fullRet = {
        name: {
          namespaceURI: 'http://www.oecd.org/GHSTS',
          localPart: 'GHSTS',
          prefix: '',
          key: '{http://www.oecd.org/GHSTS}GHSTS',
          string: '{http://www.oecd.org/GHSTS}GHSTS'
        },
        value: {}
      };
      let retVal = {
        TYPE_NAME: 'GHSTS.GHSTS',
        specificationversion: self.ghsts[0].specificationversion,
        receivers: {
          TYPE_NAME: 'GHSTS.GHSTS.RECEIVERS',
          receiver: []
        },
        product: '',
        documents: {
          TYPE_NAME: 'GHSTS.GHSTS.DOCUMENTS',
          document: []
        },
        files: {
          TYPE_NAME: 'GHSTS.GHSTS.FILES',
          file: []
        },
        // toc: '',
        legalentities: {
          TYPE_NAME: 'GHSTS.GHSTS.LEGALENTITIES',
          legalentity: []
        },
        substances: {
          TYPE_NAME: 'GHSTS.GHSTS.SUBSTANCES',
          substance: []
        },
        usedtemplates: ''
      }, svr = new ReceiverService();
      let entityClass = require('mongoose').model(self.modelClassName);

      let dbquery = entityClass.find({ _id: self.ghsts[0]._id });
      let pops = [];
      pops.push({
        path: '_receivers.receiver',
        populate: [{
          path: '_receivers.receiver.sender',
          model: 'SENDER'
        }]
      });
      pops.push({
        path: '_product',
        populate: [
          {
            path: 'dossier',
            populate: {
              path: 'submission'
            }
          }
        ]
      }); //// working
      pops.push({ path: '_documents' });
      dbquery.populate(pops);
      dbquery.exec((err, rows) => {
        if (err)
          rej(err);
        else {
          let result = JSON.parse(JSON.stringify(rows[0]));  ///Mongoose BSON id process bug, may improve later

          // For Receiver
          retVal.receivers.receiver = result._receivers.map(item => {
            retVal.legalentities.legalentity.push(item.receiver.toLegalEntityId);
            item.receiver.id = item._id.toString();
            return item;
          });
          retVal.receivers.receiver = self._get_xml_jsonix(retVal.receivers.receiver).map(item => {
            let ret = item.receiver;
            ret.sender = self._get_xml_jsonix(JSON.parse(JSON.stringify(SenderService.edb_getSync(item.sender))));
            ret.sender.map(sender => {
              retVal.legalentities.legalentity.push(sender.toLegalEntityId);
            });
            return ret;
          });

          // For Product, Dossier, Submission
          retVal.product = self._get_xml_jsonix(result._product);
          delete retVal.product.dossier.product;
          retVal.product.dossier.submission[0].submissionversiondate =
            DateTimeProc.dateToJsonixObj(retVal.product.dossier.submission[0].submissionversiondate);

          // For Document            
          retVal.documents.document = self._get_xml_jsonix(result._documents);  ///Working with Plot Number bug

          // Looking For Files and Substances in Document
          result._documents.map(item => {
            let substances = item.documentgeneric.relatedtosubstance;
            let files = item.documentgeneric.referencedtofile;
            if (substances) {
              substances.map(subs => {
                retVal.substances.substance.push(subs.toSubstanceId);
              });
            }
            if (files) {
              files.map(file => {
                retVal.files.file.push(file.toFileId);
              });
            }
          });
          
          // For Files
          retVal.files.file =  _.uniq(_.compact(retVal.files.file));
          retVal.files.file = JSON.parse(JSON.stringify(FileService.edb_getSync(retVal.files.file)));
          retVal.files.file = self._get_xml_jsonix(retVal.files.file);

          // For Legal Entities
          retVal.legalentities.legalentity = _.uniq(_.compact(retVal.legalentities.legalentity));
          retVal.legalentities.legalentity = JSON.parse(JSON.stringify(LegalEntityService.edb_getSync(retVal.legalentities.legalentity)));
          retVal.legalentities.legalentity = self._get_xml_jsonix(retVal.legalentities.legalentity);

          // For Substance
          // Search Substances from Ingredients
          result._product.ingredients.ingredient.map(item => {
            retVal.substances.substance.push(item.toSubstanceId);
          });
          retVal.substances.substance = _.uniq(_.compact(retVal.substances.substance));
          retVal.substances.substance = JSON.parse(JSON.stringify(SubstanceService.edb_getSync(retVal.substances.substance)));
          retVal.substances.substance = self._get_xml_jsonix(retVal.substances.substance);

          // For Usedtemplates
          if (self.ghsts[0].usedtemplates.length > 0) 
            retVal.usedtemplates = self.ghsts[0].usedtemplates;
          else
            delete retVal.usedtemplates;

          fullRet.value = retVal;
          let doc = self._marsh['01_00_00'].marshalString(fullRet);
          res(doc);
        }
      });
    });
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
            case 'document':
              ids = self.ghsts[0]._documents;
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
          let curProp, curEntity, curMdsProp, curDocProp, needUpdate = false, isExisting;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receivers;
              curMdsProp = self.ghsts[0]._metadatastatus.receivers;
              if (!curProp)
                curProp = [];
              if (!curMdsProp)
                curMdsProp = [];

              if (subUrlObj.senderId) {  // put an new sender to receiver
                curProp = _.filter(curProp, item => {
                  return item.receiver === subUrlObj.subIds;
                });
                if (!curProp[0].sender)
                  curProp[0].sender = [];
                if (curProp[0].sender.indexOf(subUrlObj.senderId) < 0) {
                  curProp[0].sender.push(subUrlObj.senderId);
                  needUpdate = true;
                }
              } else {
                isExisting = _.filter(curProp, item => {
                  if (item.receiver === (obj._id ? obj._id.toString() : subUrlObj.subIds))
                    return item;
                });
                if (isExisting.length === 0) {
                  curEntity = { receiver: obj._id ? obj._id.toString() : subUrlObj.subIds, sender: [] };
                  curProp.push(curEntity);
                  curMdsProp.push(new MetaDataStatusNode(
                    curEntity.receiver,
                    MetaDataStatus.getMetadataStatusIdbyValue('new'),
                    'receiver'
                  ));
                  needUpdate = true;
                }
              }
              break;
            case 'toc':
              curProp = self.ghsts[0]._toc2docs;
              curDocProp = self.ghsts[0]._documents;
              curMdsProp = self.ghsts[0]._metadatastatus.documents;
              if (!curProp)
                curProp = [];
              if (!curMdsProp)
                curMdsProp = [];
              if (!curDocProp)
                curDocProp = [];
              isExisting = _.filter(curProp, item => {
                if ((item.tocnodepid === obj.tocnodepid) && (item.docId === obj.docId))
                  return item;
              });
              if (isExisting.length === 0) {
                curProp.push(obj);
                if (curDocProp.indexOf(obj.docId.toString()) < 0) {
                  curDocProp.push(obj.docId.toString());
                  curMdsProp.push(new MetaDataStatusNodeWithRA(
                    obj.docId.toString(),
                    MetaDataStatus.getMetadataStatusIdbyValue('new'),
                    'document',
                    self.ghsts[0]._receivers
                  ));
                }
                needUpdate = true;
              }
              break;
            default:
              curProp = undefined;
          }
          if (!obj._id && !subUrlObj.subIds && !subUrlObj.senderId && !(obj.tocnodepid && obj.docId))
            rej(new RVHelper('EDB12014'));
          else if (needUpdate) {
            self.edb_post(self.ghsts[0])
              .then(ret => {
                res(new RVHelper('EDB00000', self.ghsts[0]));
              })
              .catch(err => {
                rej(err);
              });
          } else {
            res(new RVHelper('EDB00000', self.ghsts[0]));
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
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curMdsProp, curMdsIndex, curEntityIndex;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receivers;
              curMdsProp = self.ghsts[0]._metadatastatus.receivers;
              break;
            default:
              curProp = undefined;
          }
          curEntityIndex = _.findIndex(curProp, item => {
            return item.receiver === subUrlObj.subIds;
          });
          if (subUrlObj.senderId) {
            let curSenderIndex = _.findIndex(curProp[curEntityIndex].sender, item => {
              return item === subUrlObj.senderId;
            });
            if (curSenderIndex >= 0 && obj._id)
              curProp[curEntityIndex].sender[curSenderIndex] = obj._id.toString();
          } else {
            curMdsIndex = _.findIndex(curMdsProp, item => {
              return item.elementid === subUrlObj.subIds;
            });
            curProp[curEntityIndex][subUrlObj.subUrl] = obj._id.toString();
            curMdsProp[curMdsIndex]['elementid'] = obj._id.toString();
          }
          res(self.edb_post(self.ghsts[0]));
        } else {
          rej(new RVHelper('EDB12013'));
        }
      } else {
        rej(new RVHelper('EDB12013'));
      }
    });
  }

  ///Works for only one submission for now
  _subUrlProcess4Del(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curEntity, curMdsProp, curDocProp, needUpdate = true, isExisting;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receivers;
              curMdsProp = self.ghsts[0]._metadatastatus.receivers;
              if (subUrlObj.senderId) {
                curProp = _.filter(curProp, item => {
                  return item.receiver = subUrlObj.subIds;
                });
                _.remove(curProp[0].sender, item => {
                  return item === subUrlObj.senderId;
                });
              } else {
                _.remove(curProp, item => {
                  return item.receiver === obj._id ? obj._id.toString() : subUrlObj.subIds;
                });
                _.remove(curMdsProp, item => {
                  return item.elementid === obj._id ? obj._id.toString() : subUrlObj.subIds;
                });
              }
              break;
            case 'toc':
              curProp = self.ghsts[0]._toc2docs;
              curDocProp = self.ghsts[0]._documents;
              curMdsProp = self.ghsts[0]._metadatastatus.documents;
              isExisting = _.filter(curProp, item => {
                return item.docId === obj.docId;
              });
              if (isExisting.length === 0)
                needUpdate = false;
              else {
                _.remove(curProp, item => {
                  return (item.tocnodepid === obj.tocnodepid) && (item.docId === obj.docId);
                });
                if (isExisting.length === 1) {
                  _.remove(curDocProp, item => {
                    return item === obj.docId;
                  });
                  _.remove(curMdsProp, item => {
                    return item.elementid === obj.docId;
                  });
                }
              }
              break;
            default:
              curProp = undefined;
          }
          if (needUpdate)
            res(self.edb_post(self.ghsts[0]));
          else
            res(new RVHelper('EDB00000'));
        } else {
          rej(new RVHelper('EDB12016'));
        }
      } else {
        rej(new RVHelper('EDB12016'));
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

      let self = this;
      let mds = new MetaDataStatus(self.version);
      mds.init((obj._submissionnumber === 1), obj._product, obj._tocid);
      delete mds.metadatastatusValues;
      let entity = _.merge({}, obj);
      entity._metadatastatus = mds;

      res(super._create(entity));
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
    let curIndex = 0;

    if (eDB_Urls.indexOf(urlAry[0]) >= 0) {  ///It is sub-url 
      retVal.subUrl = urlAry[0];
      curIndex++;
      if (urlAry[curIndex]) { /// It is sub-id(s), 
        retVal.subIds = urlAry[curIndex];
      }
      curIndex++;
    } else {  ///ghstsIdOrUrl is ghsts id and subSvrUrlOrId is sub-url  
      retVal.ghstsId = urlAry[0];
      curIndex++;
      if (urlAry[curIndex]) {
        if (eDB_Urls.indexOf(urlAry[curIndex]) >= 0) { ///It is sub-url  
          retVal.subUrl = urlAry[curIndex];
          curIndex++;
          if (urlAry[curIndex]) { /// has subIds
            retVal.subIds = urlAry[curIndex];
          }
          curIndex++;
        }
      }
    }
    if (urlAry[curIndex] && urlAry[curIndex + 1]) { //change link for second level element, sender to receiver
      retVal.senderId = urlAry[curIndex + 1];
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
