const BACKEND_CONST = require('../constants/backend');
const BaseService = require('./base.service');
const { dialog } = require('electron');
const Q = require('bluebird');
const fs = require('fs');
const path = require('path');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;
const PicklistService = require('./picklist.service');
const crypto = require('crypto');

module.exports = class FileService extends BaseService {
  constructor(version) {
    super('FILE', true, version);
    this.modelClassNamePre = 'GHSTS.FILES';
    this.referencedBy = { refName: 'document', field: 'documentgeneric.referencedtofile.toFileId' };
    this.pidField = 'filegeneric.filepid';
  }

  edb_put(obj) {
    if (!obj._filereallocation) {
      return new Q((res, rej) => {
        rej(new RVHelper('EDB12018'));
      });
    } else {
      this._beforeSave(obj);
      return super.edb_put(obj);
    }
  }

  edb_post(obj) {
    if (!obj._filereallocation) {
      return new Q((res, rej) => {
        rej(new RVHelper('EDB12018'));
      });
    } else {
      this._beforeSave(obj);
      return super.edb_post(obj);
    }
  }

  edb_selectFolder() {
    return new Q((res, rej) => {
      let self = this;
      let selFolder = dialog.showOpenDialog({
        title: 'Choose a folder',
        properties: ['openDirectory'],
        defaultPath: self.productDir
      });
      if (selFolder.length === 1) {
        res(new RVHelper('EDB00000', selFolder[0]));
      } else {
        res(new RVHelper('EDB00001'));
      }
    });
  }

  edb_selectFile(obj) {
    return new Q((res, rej) => {
      let self = this;
      let selFile = dialog.showOpenDialog({
        title: 'Choose a file',
        properties: ['openFile'],
        defaultPath: self.productDir
      });
      if (selFile.length === 1) {
        try {
          let data = fs.readFileSync(selFile[0]);
          let md5 = crypto.createHash('md5').update(data).digest('hex');
          let entity = obj ? obj : {};
          entity._filereallocation = selFile[0];
          entity.filegeneric.md5CHECKSUM = md5;
          if (entity._id) {
            self.edb_post(entity)
              .then(ret => {
                res(ret);
              })
              .catch(err => {
                rej(err);
              });
          } else {
            self.edb_put(entity)
              .then(ret => {
                res(ret);
              })
              .catch(err => {
                rej(err);
              });
          }
        } catch (err) {
          rej(err);
        }
      } else {
        res(new RVHelper('EDB00001'));
      }
    });
  }

  _beforeSave(obj) {
    let self = this;

    ///
    /// Commented out as 01-04-00 removed CONTENTSTATUS from File element 
    ///
    // let defContentStatusId = PicklistService.edb_getSync({
    //   TYPE_NAME: 'TYPE_CONTENT_STATUS',
    //   value: 'New'
    // })[0]._id;

    let mainFileTypeId = PicklistService.edb_getSync({
      TYPE_NAME: 'TYPE_FILE_TYPE',
      value: 'Main'
    })[0]._id;

    let confStatu = false;

    ///
    /// Commented out as 01-04-00 removed CONTENTSTATUS from File element 
    ///
    // obj.filegeneric.contentstatus = obj.filegeneric.contentstatus ? obj.filegeneric.contentstatus : defContentStatusId;
    
    obj.filegeneric.filetype = obj.filegeneric.filetype ? obj.filegeneric.filetype : mainFileTypeId;
    obj._secondLvlDir = (obj.filegeneric.filetype === mainFileTypeId) ? BACKEND_CONST.FILE_MAIN_DIR_NAME : BACKEND_CONST.FILE_ATTAC_DIR_NAME;
    if (obj.filera && obj.filera.length > 0) {
      for (var i = 0; i < obj.filera.length; i++) {
        if (obj.filera[i].cbidesignation) {
          confStatu = true;
          break;
        }
      }
    }
    obj._firstLvlDir = confStatu ? BACKEND_CONST.FILE_CONF_DIR_NAME : BACKEND_CONST.FILE_CONT_DIR_NAME;
    self._getInternalFileName(obj);
  }

  _getInternalFileName(obj) {
    let subNumber = '01';
    let retFileName = '../';

    if (obj._ghsts) {
      let GhstsService = require('./ghsts.service');
      subNumber = GhstsService.edb_getSync({ _id: obj._ghsts })[0]._submissionnumber.toString();
      if (subNumber.length === 1)
        subNumber = '0' + subNumber;
    }
    retFileName += subNumber + '/';
    retFileName += obj._firstLvlDir + '/';
    delete obj._firstLvlDir;
    retFileName += obj._secondLvlDir + '/';
    delete obj._secondLvlDir;
    let realFN = path.basename(obj._filereallocation), fileExt = path.extname(obj._filereallocation);
    retFileName += obj.filegeneric.filecompanyid ? obj.filegeneric.filecompanyid + fileExt : realFN;
    obj.filegeneric.filename = retFileName;
  }
};

