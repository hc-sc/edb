const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.FileService = class FileService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'files', undefined, 'FILE', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
  }
};

//import Nedb from 'nedb';
/*import xml2js from 'xml2js';
import { GHSTS } from '../shared/ghsts';
import { ValueStruct, ExtValueStruct } from '../shared/shared.model';
import {FileRA, FileGeneric, File} from './file.model';

import BaseService from '../shared/base.service';

export default class FileService extends BaseService {
  constructor($q) {
    super($q, 'files', 'File', 'FILE', 'FILE_GENERIC.FILENAME');
  }

  createFile(File) {
    //file test data
    let deferred = this.$q.defer();
    this.files.insert(File, function (err, result) {
      if (err) deferred.reject(err);
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  getFiles() {
    let deferred = this.$q.defer();
    this.files.find({}, function (err, rows) {
      if (err) deferred.reject(err);
      deferred.resolve(rows);
    });
    return deferred.promise;
  }
  getFileById(id) {
    let deferred = this.$q.defer();
    this.files.find({ '_id': id }, function (err, result) {
      if (err) deferred.reject(err);
      deferred.resolve(result);
    });
    return deferred.promise;
  }
  getFileByName(name) {
    let deferred = this.$q.defer();
    // searching file needs more condition since sub document
    var re = new RegExp(name, 'i');
    let condition = { $regex: re };
    //{ $regex: /DOCX/ }
    // sub doc element as a condition
    //   this.files.find({_identifier:{ $regex: /[^]+/ }, 'FILE_GENERIC.FILENAME': condition }, function (err, result) {
    this.files.find({ 'FILE_GENERIC.FILENAME': condition }, function (err, result) {
      if (err) deferred.reject(err);
      deferred.resolve(result); // update child promise which can pass the result to call back, defered is a promise builder
    });
    return deferred.promise;
  }
  updateFile(file) {
    let deferred = this.$q.defer();
    this.files.update({ _id: file._id }, file, {}, function (err, numReplaced) {
      if (err) deferred.reject(err);
      deferred.resolve(numReplaced);
    });
    return deferred.promise;
  }
  deleteFile(id) {
    let deferred = this.$q.defer();
    this.files.remove({ '_id': id }, function (err, res) {
      if (err) deferred.reject(err);
      deferred.resolve(res.affectedRows);
    });
    return deferred.promise;
  }
  _createSampleFile() {
    // private method: create a sample file for tests
    let file = new File();
    file.fileId = 'D_Document_J_01_T-423579_0003052902R';

    let fileRA = new FileRA();
    fileRA.METADATA_STATUS = new ValueStruct('NewRA', 'NewRA');
    fileRA.CBI_DESIGNATION = 'Ottawa';
    fileRA.FILE_COMMENT = 'RA comment';
    file.addFileRA(fileRA);

    let fileGeneric = new FileGeneric();
    fileGeneric.METADATA_STATUS = new ValueStruct('New', 'New');         // of ValueStruct
    fileGeneric.FILE_PID = 'urn:pppww:C563739E-F406-4D58-B417-9905C1BC060F';
    fileGeneric.FILE_COMPANY_ID = 'T-423579-01-1';
    fileGeneric.CONTENT_STATUS = new ValueStruct('New', 'New');        // of ValueStruct
    fileGeneric.REPLACED_FILE_PID = 'replaced id';
    fileGeneric.FILE_TYPE = new ValueStruct('Main', 'Main');             // of ValueStruct
    fileGeneric.FORMAT_COMMENT = 'Format comment 01_0';
    fileGeneric.MD5CHECKSUM = 'fd9e7db91db1b98bbe2067a2e24df220';
    fileGeneric.FILENAME = '../01/confidential/main/T-423640-01-1.PDF';

    file.FILE_GENERIC = fileGeneric;

    return file;
  }

  addFileToDB() {
    // add a new receiver to database
    let file = this._createSampleFile();
    return this.createFile(file);
  }
  initializeFile(submission) {
    let entities = submission.files;
    entities.forEach(f => {
      let file = new File();
      file.fileId = f.attr$.Id;

      file.FILE_GENERIC = new FileGeneric();
      //   file.FILE_GENERIC.METADATA_STATUS = f.FILE_GENERIC[0].METADATA_STATUS[0];
      file.FILE_GENERIC.METADATA_STATUS = new ValueStruct(f.FILE_GENERIC[0].METADATA_STATUS[0].VALUE[0], f.FILE_GENERIC[0].METADATA_STATUS[0].VALUE_DECODE[0]);
      file.FILE_GENERIC.FILENAME = f.FILE_GENERIC[0].FILENAME[0];
      file.FILE_GENERIC.FILE_PID = f.FILE_GENERIC[0].FILE_PID[0];
      file.FILE_GENERIC.FILE_COMPANY_ID = f.FILE_GENERIC[0].FILE_COMPANY_ID[0];
      file.FILE_GENERIC.CONTENT_STATUS = new ValueStruct(f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE[0], f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE_DECODE[0]);
      file.FILE_GENERIC.FILE_TYPE = new ValueStruct(f.FILE_GENERIC[0].FILE_TYPE[0].VALUE[0], f.FILE_GENERIC[0].FILE_TYPE[0].VALUE_DECODE[0]);
      file.FILE_GENERIC.REPLACED_FILE_PID = (f.FILE_GENERIC[0].REPLACED_FILE_PID === undefined ? null : f.FILE_GENERIC[0].REPLACED_FILE_PID);
      file.FILE_GENERIC.FORMAT_COMMENT = f.FILE_GENERIC[0].FORMAT_COMMENT[0];
      file.FILE_GENERIC.MD5CHECKSUM = f.FILE_GENERIC[0].MD5CHECKSUM[0];
      file.FILE_GENERIC.FILENAME = f.FILE_GENERIC[0].FILENAME[0];

      f.FILE_RA.forEach(fr => {
        let fileRA = new FileRA();
        fileRA._toSpecificForRAId = fr.attr$.To_Specific_for_RA_Id;
        fileRA.METADATA_STATUS = new ValueStruct(fr.METADATA_STATUS[0].VALUE[0], fr.METADATA_STATUS[0].VALUE_DECODE[0]);
        fileRA.CBI_DESIGNATION = fr.CBI_DESIGNATION[0];
        fileRA.FILE_COMMENT = (fr.FILE_COMMENT === undefined ? null : fr.FILE_COMMENT[0]);
        file.addFileRA(fileRA);
      });

      this.createFile(file);

    });
  }

}

FileService.$inject = ['$q'];

export { FileService };
*/