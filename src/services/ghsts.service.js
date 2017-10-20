const BACKEND_CONST = require('../constants/backend');
const SHARED_CONST = require('../constants/shared');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const MetaDataStatus = require('../models/metadatastatus.model').MetaDataStatus;
const MetaDataStatusNode = require('../models/metadatastatus.model').MetaDataStatusNode;
const MetaDataStatusNodeWithRA = require('../models/metadatastatus.model').MetaDataStatusNodeWithRA;
const ServiceLevelPlugin = require('../models/plugins/service.level.plugin');
const TocHelper = require('../utils/toc.helper');

const BaseService = require('./base.service');

const ReceiverService = require('./receiver.service');
const SenderService = require('./sender.service');
const LegalEntityService = require('./legalentity.service');
const ProductService = require('./product.service');
const DossierService = require('./dossier.service');
const DocumentService = require('./document.service');
const SubmissionService = require('./submission.service');
const SubstanceService = require('./substance.service');
const FileService = require('./file.service');
const TocService = require('./toc.service');
const PickListService = require('./picklist.service');


const Q = require('bluebird');
const _ = require('lodash');

const copydir = require('copy-dir');
const fs = require('fs');
const path = require('path');
const basePath = fs.realpathSync('./');
const eDB_Urls = require('./').ServiceNeedInit;

const DateTimeProc = require('../utils/datetime.process');

const resourceDir = path.resolve(basePath, BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2);

const prodsPath = path.resolve(basePath, BACKEND_CONST.PRODUCTS_DIR);

module.exports = class GhstsService extends BaseService {
  constructor(submissions_ref, validateInstance, marsh, unmarsh, version) {
    super('GHSTS', true, version);
    this.ghsts = submissions_ref;
    this._validate = validateInstance;
    this._marsh = marsh;
    this._unmarsh = unmarsh;
  }

  edb_openViewer(obj) {
    return new Q((res, rej) => {
      console.log(obj.submissionid);
      let viewerExecPath = path.resolve(basePath, BACKEND_CONST.VIEWER_EXEC_DIR_NAME);
      let viewerConfFileName = path.resolve(viewerExecPath, BACKEND_CONST.VIEWER_CONF_DIR_NAME, BACKEND_CONST.VIEWER_CONF_FILE_NAME);
      let viewerConf;
      try {
        viewerConf = JSON.parse(fs.readFileSync(viewerConfFileName));
      } catch (err) {
        if (err.code === 'ENOENT') {
          viewerConf = {
            appData: {
              tabArray: [{
                id: 0,
                label: 'Startpage',
                title: 'Startpage',
                src: path.resolve(viewerExecPath, 'startpage', 'startpage.html'),
                active: false
              }]
            },
            recentlyUsed: [],
            userData: {}
          };
        } else {
          throw err;
        }
      }
      let isActive = false;
      let dossierPath = GhstsService.edb_getSync({
        _submissionid: obj.submissionid
      })[0];
      let subPath = dossierPath._submissionnumber;
      dossierPath = dossierPath._foldername;
      subPath = subPath.toString();
      if (subPath.length === 1)
        subPath = '0' + subPath;
      let subFullPath = path.resolve(prodsPath, dossierPath, subPath, 'utils', 'viewer', 'viewer.html');
      for (let i = 0; i < viewerConf.appData.tabArray.length; i++) {
        if (viewerConf.appData.tabArray[i].active && viewerConf.appData.tabArray[i].src === subFullPath) {
          isActive = true;
          break;
        } else if (viewerConf.appData.tabArray[i].src === subFullPath) {
          viewerConf.appData.tabArray[i].active = true;
          isActive = true;
        } else
          viewerConf.appData.tabArray[i].active = false;
      }
      if (!isActive) {
        viewerConf.appData.tabArray.push({
          id: viewerConf.appData.tabArray.length,
          src: subFullPath,
          active: true
        });
      }
      fs.writeFileSync(viewerConfFileName, JSON.stringify(viewerConf));
      let child = require('child_process').execFile;
      let executablePath = path.resolve(viewerExecPath, 'Desktop-Viewer.exe');
      child(executablePath, (err, data) => {
        if (err)
          rej(err);
        else
          res(new RVHelper('EDB00000'));
      });
    });
  }

  _metadatastatus_process(entityName, id, recIds) {
    let curMeta = this.ghsts[0]._metadatastatus[entityName];
    let metanode;

    if (this.ghsts[0]._submissionnumber === 1) {
      if (!curMeta)
        curMeta = [];
      metanode = new MetaDataStatusNode(
        id,
        MetaDataStatus.getMetadataStatusIdbyValue('new'),
        entityName
      );
    } else {
      metanode = new MetaDataStatusNode(
        id,
        MetaDataStatus.getMetadataStatusIdbyValue('nochange'),
        entityName
      );
    }

    let isExist = [];

    if (Array.isArray(curMeta)) {
      isExist = _.filter(curMeta, item => {
        if (item.elementid === id)
          return item;
      });
    }

    if (!recIds) { //not file and document
      if (Array.isArray(curMeta)) {
        if (isExist.length === 1)
          return isExist[0].metadatastatusid;
        else {
          curMeta.push(metanode);
          return metanode.metadatastatusid;
        }
      } else {
        if (!curMeta)
          curMeta = metanode;
        return metanode.metadatastatusid;
      }
    } else { // File or Document
      if (isExist.length === 1)
        return isExist[0];
      else {
        let retVal = new MetaDataStatusNodeWithRA(
          id,
          metanode.metadatastatusid,
          entityName,
          recIds
        );
        curMeta.push(retVal);
        return retVal;
      }
    }
  }

  _buildXmlJson() {
    return new Q((res, rej) => {
      let self = this;
      let fullRet = {
        name: {
          namespaceURI: 'http://www.oecd.org/GHSTS',
          localPart: 'GHSTS',
          key: '{http://www.oecd.org/GHSTS}GHSTS',
          string: '{http://www.oecd.org/GHSTS}GHSTS'
        },
        value: {},
        _filesNeedCopy: []
      };
      let retVal = {
        TYPE_NAME: 'GHSTS.GHSTS',
        specificationversion: self.ghsts[0].specificationversion ? self.ghsts[0].specificationversion : '01.04.00',
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
        toc: '',
        legalentities: {
          TYPE_NAME: 'GHSTS.GHSTS.LEGALENTITIES',
          legalentity: []
        },
        substances: {
          TYPE_NAME: 'GHSTS.GHSTS.SUBSTANCES',
          substance: []
        },
        usedtemplates: {
          TYPE_NAME: 'AnyType'
        }
      };
      let entityClass = require('mongoose').model(self.modelClassName);

      let dbquery = entityClass.find({
        _id: self.ghsts[0]._id
      });
      let pops = [];
      if (self.ghsts[0]._receiver && self.ghsts[0]._receiver.length > 0) {
        pops.push({
          path: '_receiver.receiver'
        });
      }
      pops.push({
        path: '_product',
        populate: [{
          path: 'dossier',
          model: 'DOSSIER',
          populate: {
            path: 'submission'
          }
        }]
      });

      if (self.ghsts[0]._document && self.ghsts[0]._document.length > 0) {
        pops.push({
          path: '_document'
        });
      }

      if (self.ghsts[0]._tocid)
        pops.push({
          path: '_tocid'
        });

      dbquery.populate(pops);
      dbquery.exec((err, rows) => {
        if (err)
          rej(err);
        else {
          try {
            let result = JSON.parse(JSON.stringify(rows[0])); ///Mongoose or Tingo BSON id process has bug, may improve later
            let receiverIds = [], strId;

            // For Receiver
            if (result._receiver) {
              retVal.receivers.receiver = result._receiver.map(item => {
                retVal.legalentities.legalentity.push(item.receiver.toLegalEntityId);
                item.receiver.toLegalEntityId = BACKEND_CONST.ID_PREFIX.legalentity + item.receiver.toLegalEntityId;
                strId = item.receiver._id.toString();
                item.receiver.metadatastatus = self._metadatastatus_process('receiver', strId);
                receiverIds.push(strId);
                return item;
              });
              retVal.receivers.receiver = self._get_xml_jsonix(retVal.receivers.receiver);
              retVal.receivers.receiver = retVal.receivers.receiver.map(item => {
                let ret = item.receiver;
                ret.sender = item.sender.map(senderid => {
                  return _.merge({}, SenderService.edb_getSync({
                    _id: senderid
                  })[0]);
                });
                ret.sender = self._get_xml_jsonix(ret.sender);
                ret.sender.map(sender => {
                  retVal.legalentities.legalentity.push(sender.toLegalEntityId);
                  sender.toLegalEntityId = BACKEND_CONST.ID_PREFIX.legalentity + sender.toLegalEntityId;
                });
                return ret;
              });
            } else
              delete retVal.receivers;

            // For Product, Dossier, Submission
            retVal.product = result._product;
            retVal.product.metadatastatus = self._metadatastatus_process('product', result._product._id);
            retVal.product.productra.map(ra => {
              ra.toSpecificForRAId = BACKEND_CONST.ID_PREFIX.receiver + ra.toSpecificForRAId;
            });
            retVal.product.ingredients.ingredient.map(ing => {
              ing.toSubstanceId = BACKEND_CONST.ID_PREFIX.substance + ing.toSubstanceId;
            });
            retVal.product = self._get_xml_jsonix(result._product);
            delete retVal.product.dossier.product;

            if (retVal.product.dossier.dossierra && retVal.product.dossier.dossierra.length > 0) {
              retVal.product.dossier.dossierra.map(ra => {
                ra.toSpecificForRAId = BACKEND_CONST.ID_PREFIX.receiver + ra.toSpecificForRAId;
              });
            }
            
            if (retVal.product.dossier.submission && retVal.product.dossier.submission.length > 0) {
              retVal.product.dossier.submission.map(sub => {
                sub.submissionversiondate =
                  DateTimeProc.dateToJsonixObj(sub.submissionversiondate);
              });
            }

            // For Document            
            if (result._document && result._document.length > 0) {
              retVal.documents.document = result._document.map(doc => {
                let retDoc = _.merge({}, doc);
                let docMeta = self._metadatastatus_process('document', retDoc._id, receiverIds);
                if (!retDoc.id)
                  retDoc.id = BACKEND_CONST.ID_PREFIX.document + retDoc._id;
                retDoc.documentgeneric.metadatastatus = docMeta.documentgeneric.metadatastatusid;
                let jsonixDCH = self.assignDCHJosnix(doc._id);
                if (jsonixDCH)
                  retDoc.documentgeneric.documentcontentstatushistory = jsonixDCH;
                retDoc.documentra = _.filter(retDoc.documentra, documentra => {
                  return receiverIds.indexOf(documentra.toSpecificForRAId) >= 0;
                });
                if (retDoc.documentra && retDoc.documentra.length > 0) {
                  retDoc.documentra = retDoc.documentra.map(documentra => {
                    for (var i = 0; i < docMeta.documentra.length; i++) {
                      if (docMeta.documentra[i].elementid === documentra.toSpecificForRAId) {
                        documentra.metadatastatus = docMeta.documentra[i].metadatastatusid;
                        break;
                      }
                    }
                    documentra.toSpecificForRAId = BACKEND_CONST.ID_PREFIX.receiver + documentra.toSpecificForRAId;
                    return documentra;
                  });
                } else
                  delete retDoc.documentra;

                if (retDoc._docsourcetype) {
                  delete retDoc.documentgeneric.documentsource;
                  delete retDoc.documentgeneric.documentyear;
                  delete retDoc.documentgeneric.documentissue;
                  delete retDoc.documentgeneric.documentvolume;
                  delete retDoc.documentgeneric.documentpages;
                } else 
                  delete retDoc.documentgeneric.completedocumentsource;

                retDoc.documentgeneric.documentissuedate =
                  DateTimeProc.dateToJsonixObj(retDoc.documentgeneric.documentissuedate);

                // Looking For Files and Substances in Document
                let substances = doc.documentgeneric.relatedtosubstance;
                let files = doc.documentgeneric.referencedtofile;
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
                retDoc.documentgeneric.relatedtosubstance.map(ss => {
                  ss.toSubstanceId = BACKEND_CONST.ID_PREFIX.substance + ss.toSubstanceId;
                });
                retDoc.documentgeneric.referencedtofile.map(fl => {
                  fl.toFileId = BACKEND_CONST.ID_PREFIX.file + fl.toFileId;
                });
                return retDoc;
              });
              retVal.documents.document = self._get_xml_jsonix(retVal.documents.document); ///Working with Project Number bug
            } else
              delete retVal.documents;


            // For Files
            if (retVal.files.file && retVal.files.file.length > 0) {
              retVal.files.file = _.uniq(_.compact(retVal.files.file));
              retVal.files.file = retVal.files.file.map(item => {
                let retFile = _.merge({}, FileService.edb_getSync({
                  _id: item
                })[0]);
                if (retFile) {
                  fullRet._filesNeedCopy.push({
                    source: retFile._filereallocation,
                    dest: retFile.filegeneric.filename
                  });
                  let fileMeta = self._metadatastatus_process('file', item, receiverIds);
                  retFile.filegeneric.metadatastatus = fileMeta.filegeneric.metadatastatusid;
                  retFile.filera = _.filter(retFile.filera, filera => {
                    return receiverIds.indexOf(filera.toSpecificForRAId) >= 0;
                  });
                  if (retFile.filera && retFile.filera.length > 0) {
                    retFile.filera = retFile.filera.map(filera => {
                      for (var i = 0; i < fileMeta.filera.length; i++) {
                        if (fileMeta.filera[i].elementid === filera.toSpecificForRAId) {
                          filera.metadatastatus = fileMeta.filera[i].metadatastatusid;
                          break;
                        }
                      }
                      filera.toSpecificForRAId = BACKEND_CONST.ID_PREFIX.receiver + filera.toSpecificForRAId;
                      return filera;
                    });
                  } else
                    delete retFile.filera;
                  return retFile;
                }
              });
              retVal.files.file = self._get_xml_jsonix(retVal.files.file);
            } else
              delete retVal.files;

            // For TOC
            if (!result._tocid) {
              retVal.toc = _.merge({}, TocService.edb_getSync({
                tocversion: '01.00.01'
              })[0]);
              self.ghsts[0]._tocid = retVal.toc._id;
            } else
              retVal.toc = result._tocid;

            if (self.ghsts[0]._toc2docs)
              TocHelper.assignToc2DocNodes(retVal.toc.structure, self.ghsts[0]._toc2docs);
            retVal.toc.metadatastatus = self._metadatastatus_process('toc', retVal.toc._id);
            retVal.toc = self._get_xml_jsonix(retVal.toc);

            // For Legal Entities
            if (retVal.legalentities.legalentity && retVal.legalentities.legalentity.length > 0) {
              retVal.legalentities.legalentity = _.uniq(_.compact(retVal.legalentities.legalentity));
              retVal.legalentities.legalentity = retVal.legalentities.legalentity.map(les => {
                let ret = _.merge({}, LegalEntityService.edb_getSync({
                  _id: les
                })[0]);
                let metaId = self._metadatastatus_process('legalentity', les);
                ret.metadatastatus = metaId;
                if (!ret.id.startsWith(BACKEND_CONST.ID_PREFIX.legalentity))
                  ret.id = BACKEND_CONST.ID_PREFIX.legalentity + ret.id;
                return ret;
              });
              retVal.legalentities.legalentity = self._get_xml_jsonix(retVal.legalentities.legalentity);
            } else
              delete retVal.legalentities;

            // For Substance
            // Search Substances from Ingredients
            if (result._product.ingredients.ingredient && result._product.ingredients.ingredient.length > 0) {
              result._product.ingredients.ingredient.map(item => {
                retVal.substances.substance.push(item.toSubstanceId.replace(BACKEND_CONST.ID_PREFIX.substance, ''));
              });
            }
            if (retVal.substances.substance && retVal.substances.substance.length > 0) {
              retVal.substances.substance = _.uniq(_.compact(retVal.substances.substance));
              retVal.substances.substance = retVal.substances.substance.map(item => {
                let ret = _.merge({}, SubstanceService.edb_getSync({
                  _id: item
                })[0]);
                let metaId = self._metadatastatus_process('substance', item);
                ret.metadatastatus = metaId;
                if (!ret.id.startsWith(BACKEND_CONST.ID_PREFIX.substance))
                  ret.id = BACKEND_CONST.ID_PREFIX.substance + ret.id;
                return ret;
              });
              retVal.substances.substance = self._get_xml_jsonix(retVal.substances.substance);
            } else
              delete retVal.substances;

            // For Usedtemplates
            if (self.ghsts[0].usedtemplates)
              retVal.usedtemplates = self.ghsts[0].usedtemplates;
            else
              delete retVal.usedtemplates;

            fullRet.value = retVal;
            res(fullRet);
          } catch (err) {
            rej(err);
          }
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
        let svr = new svrClass(self._version);
        let ids = undefined;

        if (subUrlObj.subIds) {
          return svr.edb_get({
            _id: subUrlObj.subIds
          }, true);
        } else if (subUrlObj.subUrl === 'toc') { ///get toc sub-instances of the submission toc2doc assigned
          return new Q((res, rej) => {
            if (!self.ghsts[0]._tocid)
              self.ghsts[0]._tocid = TocService.edb_getSync({
                tocversion: '01.00.01'
              })[0]._id;
            let curToc = TocService.edb_getSync({
              _id: self.ghsts[0]._tocid
            })[0];
//TODO: template change for demo DACO in Paris meeting. Should be removed or modified to handle multiple TOCs.            
            if (!curToc) 
              curToc = TocService.edb_getSync({
                tocversion: '01.00.01'
              })[0];
//End TODO
            curToc = _.merge({}, curToc);
            let docSvr = new DocumentService(self.ghsts[0]._version);
            docSvr.edb_get({
                where: self.ghsts[0]._document
              })
              .then(docRet => {
                let documents = JSON.parse(docRet.data),
                  docTitles = {};
                if (documents && documents.length > 0) {
                  documents.map(doc => {
                    docTitles[doc._id] = doc.documentgeneric.documenttitle;
                  });
                  TocHelper.assignToc2DocNodes(curToc.structure, self.ghsts[0]._toc2docs, docTitles);
                }
                res(new RVHelper('EDB00000', JSON.stringify([curToc])));
              })
              .catch(err => {
                rej(err);
                console.log(err);
              });
          });
        } else { ///get all other sub-instances of the submission
          switch (subUrlObj.subUrl) {
            case 'receiver':
              ids = self.ghsts[0]._receiver; /// need refacting for loading new ghsts, only one submission for release 1
              if (ids) {
                ids = ids.map(item => {
                  return item.receiver;
                });
              }
              break;
            case 'document':
            case 'file':
              let pro = ProductService.edb_getSync({_id: self.ghsts[0]._product})[0];
              ids = {
                fieldname: '_dossier',
                ids: [pro.dossier]
              };
              break;
            default:
              ids = undefined;
          }
          if (!ids)
            return new Q(res => {
              res(new RVHelper('EDB00000'));
            });
          else
            return svr.edb_get({}, false, ids); /// need to return
        }
      } else if (subUrlObj.ghstsId) {
        return super.edb_get({
          _id: subUrlObj.ghstsId
        }, obj._pop, obj._where);
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
  _subUrlProcess4Post(obj) {
    return new Q((res, rej) => {
      let self = this,
        svr = undefined;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curEntity, curMdsProp, curDocProp, curDCHProp, needUpdate = false,
            isExisting;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receiver;
              curMdsProp = self.ghsts[0]._metadatastatus.receiver;
              if (!curProp)
                curProp = [];
              if (!curMdsProp)
                curMdsProp = [];

              if (subUrlObj.senderId) { // put an new sender to receiver
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
                  curEntity = {
                    receiver: obj._id ? obj._id.toString() : subUrlObj.subIds,
                    sender: []
                  };
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
              curDocProp = self.ghsts[0]._document;
              curMdsProp = self.ghsts[0]._metadatastatus.document;
              if (!self.ghsts[0]._toc2docs)
                self.ghsts[0]._toc2docs = {};
              curProp = self.ghsts[0]._toc2docs;

              if (!curProp[obj.tocnodepid])
                curProp[obj.tocnodepid] = [];

              curProp = curProp[obj.tocnodepid];

              if (!curMdsProp)
                curMdsProp = [];
              if (!curDocProp)
                curDocProp = [];

              if (!self.ghsts[0]._documentcontenthistory)
                self.ghsts[0]._documentcontenthistory = {};
              curDCHProp = self.ghsts[0]._documentcontenthistory;

              isExisting = _.filter(curProp, item => {
                if (item.docId === obj.docid)
                  return item;
              });
              if (isExisting.length === 0) {
                let toc2doc = {
                  docId: obj.docid,
                  nodeassignmentstatusId: PickListService.edb_getSync({
                    TYPE_NAME: 'TYPE_NODE_ASSIGNMENT_STATUS',
                    value: 'New'
                  })[0]._id
                };
                curProp.push(toc2doc);
                if (curDocProp.indexOf(obj.docid.toString()) < 0) {
                  curDocProp.push(obj.docid.toString());
                  let receiverIds = self.ghsts[0]._receiver.map(rec => {
                    return rec.receiver;
                  });
                  curMdsProp.push(new MetaDataStatusNodeWithRA(
                    obj.docid.toString(),
                    MetaDataStatus.getMetadataStatusIdbyValue('new'),
                    'document',
                    receiverIds
                  ));
                }
                if (!curDCHProp[obj.docid] || curDCHProp[obj.docid].length <= 0) {
                  let subNumber = self.ghsts[0]._submissionnumber.toString();
                  if (subNumber.length === 1) 
                    subNumber = '0' + subNumber;
                  curDCHProp[obj.docid] = [{
                    submissionNumber: subNumber,
                    docCSId: PickListService.edb_getSync({
                      TYPE_NAME: 'TYPE_DOCUMENT_CONTENT_STATUS',
                      value: 'New'
                    })[0]._id
                  }];
                }
                needUpdate = true;
              }
              break;
            case 'document':
              svr = new DocumentService(self._version);
              break;
            case 'file':
              svr = new FileService(self._version);
              break;
            default:
              curProp = undefined;
          }
          if (!obj._id && !subUrlObj.subIds && !subUrlObj.senderId && !(obj.tocnodepid && obj.docid) && !svr)
            rej(new RVHelper('EDB12014'));
          else if (svr) {
            obj._ghsts = self.ghsts[0]._id;
            svr.edb_post(obj)
              .then(ret => {
                res(ret);
              })
              .catch(err => {
                rej(err);
              });
          } else if (needUpdate) {
            super.edb_put(self.ghsts[0])
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
  _subUrlProcess4Put(obj) {
    return new Q((res, rej) => {
      let self = this,
        svr = undefined;
      if (obj._subUrl) {
        let subUrlObj = self._subUrlToObj(obj._subUrl);
        delete obj._subUrl;
        if (subUrlObj.subUrl) {
          let curProp, curMdsProp, curMdsIndex, curEntityIndex;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receiver;
              curMdsProp = self.ghsts[0]._metadatastatus.receiver;
              break;
            case 'document':
              svr = new DocumentService(self._version);
              break;
            case 'file':
              svr = new FileService(self._version);
              break;
            default:
              curProp = undefined;
          }
          curEntityIndex = _.findIndex(curProp, item => {
            return item.receiver === subUrlObj.subIds;
          });
          if (svr) {
            if (obj._ghsts === self.ghsts[0]._id)
              res(svr.edb_put(obj));
            else {
              obj._ghsts = self.ghsts[0]._id;
              delete obj._id;
              res(svr.edb_post(obj));
            }
          } else {
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
            res(self.edb_put(self.ghsts[0]));
          }
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
          let curProp, curEntity, curMdsProp, curDocProp, curDCHProp, needUpdate = true,
            keys,
            isExisting,
            dossierService, submissionService;
          switch (subUrlObj.subUrl) {
            case 'receiver':
              curProp = self.ghsts[0]._receiver;
              curMdsProp = self.ghsts[0]._metadatastatus.receiver;
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
              curDocProp = self.ghsts[0]._document;
              curMdsProp = self.ghsts[0]._metadatastatus.document;
              curDCHProp = self.ghsts[0]._documentcontenthistory;
              keys = Object.keys(curProp);
              isExisting = [];
              keys.map(key => {
                for (let i = 0; i < curProp[key].length; i++) {
                  if (curProp[key][i].docId === obj.docid) {
                    isExisting.push(curProp[key]);
                    break;
                  }
                }
              });
              if (isExisting.length === 0)
                needUpdate = false;
              else {
                _.remove(curProp[obj.tocnodepid], item => {
                  return item.docId === obj.docid;
                });
                if (curProp[obj.tocnodepid].length === 0)
                  delete curProp[obj.tocnodepid];
                if (isExisting.length === 1) {
                  _.remove(curDocProp, item => {
                    return item === obj.docid;
                  });
                  _.remove(curMdsProp, item => {
                    return item.elementid === obj.docid;
                  });
                  if (curDCHProp)
                    delete curDCHProp[obj.docid];
                }
              }
              break;
            default:
              curProp = undefined;
          }
          if (needUpdate) {
            if (subUrlObj.subUrl === 'submission')
              res(self._deleteSubmission(obj));
            else
              res(super.edb_put(self.ghsts[0]));
          } else
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
          _foldername: {
            type: String,
            required: true
          },
          _submissionid: {
            type: 'ObjectId',
            ref: 'SUBMISSION',
            required: true
          },
          _submissionnumber: {
            type: Number,
            default: 1
          },
          _receiver: [{
            receiver: {
              type: 'ObjectId',
              ref: 'RECEIVER'
            },
            sender: [{
              type: 'ObjectId',
              ref: 'SENDER'
            }]
          }],
          _product: {
            type: 'ObjectId',
            ref: 'PRODUCT'
          },
          _document: [{
            type: 'ObjectId',
            ref: 'DOCUMENT'
          }],
          _documentcontenthistory: {type: Schema.Types.Mixed},
          _tocid: {
            type: 'ObjectId',
            ref: 'TOC'
          },
          _toc2docs: {
            type: Schema.Types.Mixed
          },
          _tocdecription: {
            tocstandardname: {
              type: String,
              required: true,
              default: 'OECD'
            },
            tocversion: {
              type: String,
              required: true,
              default: '01.00.01'
            }
          },
          _metadatastatus: {
            type: Schema.Types.Mixed
          },
          usedtemplates: Schema.Types.Mixed,
          specificationversion: {
            type: String,
            default: self.version
          }
        };
        let mschema = new Schema(jschema, {
          retainKeyOrder: true,
          validateBeforeSave: false,
          toJSON: {
            getters: true,
            virtuals: true
          },
          toObject: {
            getters: true,
            virtuals: true
          }
        });
        mschema.plugin(ServiceLevelPlugin, {
          url: self.modelClassName.toLowerCase()
        });
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
      let self = this,
        packageLocation;
      console.log('package');
      self._buildXmlJson()
        .then(ret => {
          let filesNeedCopy = _.concat([], ret._filesNeedCopy);
          delete ret._filesNeedCopy;
          let doc = self._marsh['01_04_00'].marshalString(ret);
          let exp = new RegExp(/Z<\/SUBMISSION_VERSION_DATE/g);
          doc = doc.replace(exp, '</SUBMISSION_VERSION_DATE');
          exp = new RegExp(/Z<\/DOCUMENT_ISSUE_DATE/g);
          doc = doc.replace(exp, '</DOCUMENT_ISSUE_DATE');
          packageLocation = self._createPackage(doc, filesNeedCopy);
          let subSvr = new SubmissionService(self._version);
          let subObj = SubmissionService.edb_getSync({
            _id: self.ghsts[0]._submissionid
          })[0];
          subObj._state = 'packaged';
          return subSvr._update(subObj);
        })
        .then(ret => {
          self.ghsts[0]._state = 'packaged';
          return super._update(self.ghsts[0]);
        })
        .then(ret => {
          res(new RVHelper('EDB00000', packageLocation));
        })
        .catch(err => {
          console.log(err);
          rej(new RVHelper('EDB30002', err));
        });
    });
  }

  edb_validation() {
    return new Q((res, rej) => {
      let self = this, errWithDSMissing = [], DSMissingPath = [];
      self._buildXmlJson()
        .then(ret => {
          let xmlJsonix = _.merge({}, ret);
          delete xmlJsonix._filesNeedCopy;
          let isValid = self._validate['01_04_00'](xmlJsonix);
          let errors = !isValid ? self._validate['01_04_00'].errors : '';
          if (errors) {
            errors = _.filter(errors, error => {
              if (error.keyword !== 'anyOf')
                return error;
            });
          }
          if (errors && errors.length > 0) { //Fix for bug of Josinx XSD choice
            errors = _.filter(errors, error => {
              if (error.keyword !== 'required' || (error.params.missingProperty !== 'documentsource' && error.params.missingProperty !== 'completedocumentsource'))
                return error;
              else {
                errWithDSMissing.push(error);
                DSMissingPath.push(error.dataPath);
              }
            });
            if (errWithDSMissing.length > 0) {
              DSMissingPath = _.uniq(DSMissingPath);
              DSMissingPath.map(dp => {
                let isErr = _.filter(errWithDSMissing, err => {
                  if (err.dataPath === dp)
                    return err;
                });
                if (isErr.length > 1) { //documentsource and completedocumentsource both missing
                  let newErr = _.merge({}, isErr[0]);
                  newErr.message = "should have required property 'documentsource' or 'completedocumentsource'"; 
                  newErr.params.missingProperty = 'documentsource and completedocumentsource';
                  errors.push(newErr);
                }
              });
            }
          }
          if (errors && errors.length > 0) {
            rej(new RVHelper('EDB30002', errors));
          } else
            res(new RVHelper('EDB00000'));
        })
        .catch(err => {
          rej(err);
        });
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
            self.ghsts[0] = JSON.parse(ret.data)[0]; ///Only one submission for Release 1
            res(ret);
          })
          .catch(err => {
            rej(err);
          });
      });
    }
  }

  edb_post(obj) {
    return new Q((res, rej) => {
      if (!obj) {
        rej(new RVHelper('EDB12017', obj));
        return;
      }

      let self = this;
      if (obj._subUrl)
        res(self._subUrlProcess4Post(obj));
      else {
        if (obj.dossiertitle || obj.dossierId) {
          let subObj, dossObj, prodObj, ghstsObj,
            prodSvr = new ProductService(self._version),
            dossSvr = new DossierService(self._version),
            subSvr = new SubmissionService(self._version);
          if (obj.dossiertitle) { //create dossier and submission 01
            if (!obj.dossiertitle) {
              rej(new RVHelper('EDB12002', obj));
              return;
            }

            if (!obj.product) {
              rej(new RVHelper('EDB12009', obj));
              return;
            }

            if (!obj.tocId) {
              rej(new RVHelper('EDB12011', obj));
              return;
            }
            subObj = {
              submissionnumber: '01',
              _version: self._version ? self._version : '01.04.00'
            };
            dossObj = {
              dossierdescriptiontitle: obj.dossiertitle,
              product: obj.product,
              _tocId: obj.tocId,
              submission: []
            };
            ghstsObj = {
              _submissionid: '',
              _submissionnumber: 1,
              _product: obj.product,
              _foldername: obj.dossiertitle,
              _tocid: obj.tocId,
              _documentcontenthistory: {},
              _metadatastatus: {},
              _version: self._version ? self._version : '01.04.00'
            };
          } else if (obj.dossierId) { //create submission other than 01
            dossObj = _.merge({}, DossierService.edb_getSync({
              _id: obj.dossierId
            })[0]);
            if (!obj.submissionid) { //create submission 01 for existing dossier
              subObj = {
                submissionnumber: '01',
                _version: self._version ? self._version : '01.04.00'
              };
              ghstsObj = {
                _submissionid: '',
                _submissionnumber: 1,
                _product: dossObj.product[0],
                _foldername: dossObj.dossiertitle,
                _tocid: dossObj._tocId,
                _documentcontenthistory: {},
                _metadatastatus: {},
                _version: self._version ? self._version : '01.04.00'
              };
            } else { //create submission other than 01
              ghstsObj = _.merge({}, GhstsService.edb_getSync({
                _submissionid: obj.submissionid
              })[0]);
              delete ghstsObj.__v;
              delete ghstsObj._created;
              delete ghstsObj._id;
              delete ghstsObj._lastMod;
              delete ghstsObj.id;
              delete ghstsObj._state;
              if (!ghstsObj._documentcontenthistory)
                ghstsObj._documentcontenthistory = {};

              let prevSubObj = SubmissionService.edb_getSync({
                _id: obj.submissionid
              })[0];
              subObj = {
                _version: self._version ? self._version : '01.04.00'
              };
              ghstsObj._submissionnumber++;
              subObj.submissionnumber = ghstsObj._submissionnumber.toString();
              if (subObj.submissionnumber.length === 1) subObj.submissionnumber = '0' + subObj.submissionnumber;
              subObj.submissiontitle = prevSubObj.submissiontitle.replace(prevSubObj.submissionnumber, '') + subObj.submissionnumber;
              ghstsObj._metadatastatus = MetaDataStatus.updateMetadataStatus4NewSub(ghstsObj._metadatastatus, 'TYPE_METADATA_STATUS', 'metadatastatusid', 'No Change');
              ghstsObj._toc2docs = MetaDataStatus.updateMetadataStatus4NewSub(ghstsObj._toc2docs, 'TYPE_NODE_ASSIGNMENT_STATUS', 'nodeassignmentstatusId', 'No Change');
              GhstsService.updateDocContentStatus4NewSub(ghstsObj._documentcontenthistory, 'TYPE_DOCUMENT_CONTENT_STATUS', subObj.submissionnumber, ghstsObj._document);
            }
          }
          subSvr._create(subObj)
            .then(subRet => {
              subObj = JSON.parse(subRet.data);
              dossObj.submission.push(subObj._id);
              ghstsObj._submissionid = subObj._id;
              if (dossObj._id)
                return dossSvr._update(dossObj);
              else
                return dossSvr._create(dossObj);
            })
            .then(dossRet => {
              dossObj = JSON.parse(dossRet.data);
              if (obj.product) {
                prodObj = ProductService.edb_getSync({
                  _id: obj.product
                })[0];
                prodObj.dossier = dossObj._id;
              } else {
                prodObj = ProductService.edb_getSync({
                  _id: ghstsObj._product
                })[0];
              }
              return prodSvr._update(prodObj);
            })
            .then(prodRet => {
              prodObj = JSON.parse(prodRet.data);
              if (obj.product)
                ghstsObj._foldername = prodObj.genericproductname + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + ghstsObj._foldername;
              if (obj.dossierId && obj.submissionid)
                return super._create(ghstsObj);
              else
                return self._create(ghstsObj);
            })
            .then(ghstsRet => {
              self.ghsts[0] = JSON.parse(ghstsRet.data);
              res(new RVHelper('EDB00000', {
                submissionid: subObj._id,
                dossiertitle: dossObj.dossierdescriptiontitle,
                dossierid: dossObj._id
              }));
            })
            .catch(err => {
              rej(err);
            });
        } else
          rej(new RVHelper('EDB12017', obj));
      }
    });
  }

  edb_put(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (!self.ghsts[0])
        self.ghsts[0] = _.merge({}, GhstsService.edb_getSync({_id: obj._id})[0]);

      if (obj._subUrl)
        res(self._subUrlProcess4Put(obj));
      else if (obj._state !== self.ghsts[0]._state) { //Change submission state
        let svr = new SubmissionService(self._version);
        let searObj = {_id: self.ghsts[0]._submissionid};
        let curSub = SubmissionService.edb_getSync(searObj)[0];
        curSub._state = obj._state;
        svr._update(curSub)
          .then(retSub => {
            return super._update(obj);
          })
          .then(ret => {
            res(ret);
          })
          .catch(err => {
            rej(err);
          });
      } else
        res(super.edb_put(obj));
    });
  }

  edb_delete(obj) {
    return new Q((res, rej) => {
      let self = this;
      if (obj._subUrl)
        res(self._subUrlProcess4Del(obj));
      else {
        res(super.edb_delete(obj));
      }
    });
  }

  _deleteSubmission(obj) {
    return new Q((res, rej) => {
      let self = this;
      let submissionService, dossierService, dosObj;
      if (!self.ghsts[0])
        self.ghsts[0] = GhstsService.edb_getSync({ _submissionid: obj.submissionId })[0];
      submissionService = new SubmissionService(self._version);
      dossierService = new DossierService(self._version);
      dosObj = _.merge({}, DossierService.edb_getSync({ _id: obj.dossierId })[0]);
      submissionService.edb_delete(obj.submissionId)
        .then(() => {
          return self.edb_delete(self.ghsts[0]._id);
        })
        .then(() => {
          dosObj.submission.splice(dosObj.submission.length - 1, 1);
          return dossierService.edb_put(dosObj);
        })
        .then(dossierRet => {
          res(dossierRet);
        })
        .catch(err => {
          rej(err);
        });
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
    let submissions = DossierService.edb_getSync({
      where: {
        submission: submissionId
      }
    })[0];
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
    let submissions = DossierService.edb_getSync({
      _id: dossierId
    })[0].submission;
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
      if (retVal[0]._state === SHARED_CONST.SUBMISSION_STATUS_IN_PROGRESS)
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

    if (eDB_Urls.indexOf(urlAry[0]) >= 0) { ///It is sub-url 
      retVal.subUrl = urlAry[0];
      curIndex++;
      if (urlAry[curIndex]) { /// It is sub-id(s), 
        retVal.subIds = urlAry[curIndex];
      }
      curIndex++;
    } else { ///ghstsIdOrUrl is ghsts id and subSvrUrlOrId is sub-url  
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

  _createPackage(doc, filesNeedCopy) {
    let curBasePath = path.resolve(fs.realpathSync('./'), BACKEND_CONST.PRODUCTS_DIR),
      curSubFolder, curFolder, curViewerPath = path.resolve(resourceDir, BACKEND_CONST.VIEWER_UTIL_DIR_NAME, this.ghsts[0]._version.replace(/\./g, '_'));
    let prod_dossier_name = this.ghsts[0]._foldername = this.ghsts[0]._foldername.replace('_##_', BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL);
    let sub_id = this.ghsts[0]._submissionnumber;
    if (!prod_dossier_name)
      throw new RVHelper('EDB12002');

    if (!sub_id)
      throw new RVHelper('EDB12007');

    sub_id = sub_id.toString();
    if (sub_id.length === 1)
      sub_id = '0' + sub_id;

    try {
      this._createFolder(curBasePath);
      curBasePath = curFolder = path.resolve(curBasePath, prod_dossier_name);
      this._createFolder(curFolder);
      curSubFolder = path.resolve(curFolder, sub_id);
      this._createFolder(curSubFolder);
      copydir.sync(curViewerPath, curSubFolder);
      curFolder = path.resolve(curSubFolder, BACKEND_CONST.FILE_CONT_DIR_NAME);
      this._createFolder(curFolder);
      this._createFolder(path.resolve(curFolder, BACKEND_CONST.FILE_MAIN_DIR_NAME));
      this._createFolder(path.resolve(curFolder, BACKEND_CONST.FILE_ATTAC_DIR_NAME));
      curFolder = path.resolve(curSubFolder, BACKEND_CONST.FILE_CONF_DIR_NAME);
      this._createFolder(curFolder);
      this._createFolder(path.resolve(curFolder, BACKEND_CONST.FILE_MAIN_DIR_NAME));
      this._createFolder(path.resolve(curFolder, BACKEND_CONST.FILE_ATTAC_DIR_NAME));
      let fileCopyRet = this._copyFiles(curBasePath, filesNeedCopy);

      fs.writeFileSync(
        path.resolve(curSubFolder, 'ghsts.xml'),
        doc
      );
      return curSubFolder;
    } catch (err) {
      throw err;
    }
  }

  _createFolder(folderName) {
    try {
      fs.mkdirSync(folderName);
    } catch (err) {
      if (err.code !== 'EEXIST')
        throw err;
    }
  }

  _copyFiles(subPath, filesNeedCopy) {
    let retVal = [];

    filesNeedCopy.map(file => {
      let realDest = path.join(subPath, file.dest.replace('../', '/'));
      try {
        let data = fs.readFileSync(file.source);
        fs.writeFileSync(realDest, data);
      } catch (err) {
        retVal.push(err);
      }
    });

    return retVal;
  }

  assignDCHJosnix(docid) {
    if (!this.ghsts[0]._documentcontenthistory) 
      return undefined;
      
    let retVal = {
      TYPE_NAME: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTGENERIC.DOCUMENTCONTENTSTATUSHISTORY',
      documentcontentstatus: []
    };

    let curDCH = this.ghsts[0]._documentcontenthistory[docid];
    curDCH.map(dch => {
      let plk = PickListService.edb_getSync({_id: dch.docCSId})[0];
      retVal.documentcontentstatus.push({
        TYPE_NAME: 'GHSTS.GHSTS.DOCUMENTS.DOCUMENT.DOCUMENTGENERIC.DOCUMENTCONTENTSTATUSHISTORY.DOCUMENTCONTENTSTATUS',
        submissionNumber: dch.submissionNumber,
        value: plk.value,
        valuedecode: plk.valuedecode
      });
    });
    return retVal;
  }

  static updateDocContentStatus4NewSub(values, typename, submissionNumber) {
    let dcs = PickListService.edb_getSync({ TYPE_NAME: typename, value: 'No Change' })[0]._id;
    let keys = Object.keys(values);

    keys.map(key => {
      values[key].push({
        submissionNumber: submissionNumber,
        docCSId: dcs
      });
    });
  }
};