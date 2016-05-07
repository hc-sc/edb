import Nedb from 'nedb';
import xml2js from 'xml2js';
import {GHSTS} from '../common/ghsts.js'
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js';
import {FileRA, FileGeneric, File} from './fileModel.js'
class FileService {
    constructor($q) {
        this.$q = $q;
        this.files = new Nedb({ filename: __dirname + '/db/files', autoload: true });
    }
    createFile(File) {
        //file test data
        let deferred = this.$q.defer();
        this.files.insert(File, function (err, result) {
            console.log(err)
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    /*
        getReceivers() {
            let deferred = this.$q.defer();
            this.receivers.find({}, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
    
        getReceiverById(id) {
            let deferred = this.$q.defer();
            this.receivers.find({ '_id': id }, function (err, result) {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
    
        getReceiverByName(name) {
            let deferred = this.$q.defer();
            this.receivers.find({ 'SHORT_NAME': name }, function (err, result) {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
    */
    getFiles() {
        let deferred = this.$q.defer();
        this.files.find({}, function (err, rows) {
            console.log(rows);
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
        var re = new RegExp(name);
        let condition={ $regex: re };
        //{ $regex: /DOCX/ }
        this.files.find({_identifier:{ $regex: /[^]+/ }, 'FILE_GENERIC.FILENAME': condition }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
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
            console.log(res);
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
        fileGeneric.CONTENT_STATUS = new ValueStruct('New', 'New');;          // of ValueStruct
        fileGeneric.REPLACED_FILE_PID = 'replaced id';
        fileGeneric.FILE_TYPE = new ValueStruct('Main', 'Main');;                 // of ValueStruct
        fileGeneric.FORMAT_COMMENT = 'Format comment 01_0';
        fileGeneric.MD5CHECKSUM = 'fd9e7db91db1b98bbe2067a2e24df220';
        fileGeneric.FILENAME = '../01/confidential/main/T-423640-01-1.PDF';

        file.FILE_GENERIC = fileGeneric;

        console.log(JSON.stringify(file));
        return file;
    }

    addFileToDB() {
        // add a new receiver to database
        let file = this._createSampleFile();
       return this.createFile(file);
    }

    initializeFile(fileCtr) {
        // read from sample ghsts and populate the database with legal entities.
        let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");
        let promise = ghsts.readObjects();
        let self = this;
        promise.then(function (contents) {
            let entities = ghsts.files;
            entities.forEach(f => {
                // convert GHSTS json to legalEntities objects
                // xml2js' use-and-abuse array setting is on to play safe for now, hence the default array references.   
                //  let status = new ValueStruct(f.METADATA_STATUS[0].VALUE[0], f.METADATA_STATUS[0].VALUE_DECODE[0]);
                // let type = new ValueStruct(f.LEGALENTITY_TYPE[0].VALUE[0], f.LEGALENTITY_TYPE[0].VALUE_DECODE[0]);                
                //let legalEntity = new LegalEntity(status, le.LEGALENTITY_PID[0], le.LEGALENTITY_NAME[0], type); 
                let file = new File();
                file.fileId = f.attr$.Id;
                //let IdType = new ValueStruct(le.COUNTRY[0].VALUE[0], le.COUNTRY[0].VALUE_DECODE[0]);
                //let identifier = new IdentifierStruct('LEGALENTITY_IDENTIFIER_TYPE', IdType, "DUNS00001")

                file.FILE_GENERIC = new FileGeneric();
                file.FILE_GENERIC.METADATA_STATUS = f.FILE_GENERIC[0].METADATA_STATUS[0];
                file.FILE_GENERIC.FILENAME = f.FILE_GENERIC[0].FILENAME[0];
                file.FILE_GENERIC.FILE_PID = f.FILE_GENERIC[0].FILE_PID[0];
                file.FILE_GENERIC.FILE_COMPANY_ID = f.FILE_GENERIC[0].FILE_COMPANY_ID[0];
                file.FILE_GENERIC.CONTENT_STATUS = new ValueStruct(f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE[0], f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE_DECODE[0]);
                file.FILE_GENERIC.FILE_TYPE = new ValueStruct(f.FILE_GENERIC[0].FILE_TYPE[0].VALUE[0], f.FILE_GENERIC[0].FILE_TYPE[0].VALUE_DECODE[0]);
                file.FILE_GENERIC.REPLACED_FILE_PID = (f.FILE_GENERIC[0].REPLACED_FILE_PID === undefined ? null : f.FILE_GENERIC[0].REPLACED_FILE_PID);
                file.FILE_GENERIC.FORMAT_COMMENT = f.FILE_GENERIC[0].FORMAT_COMMENT[0];
                file.FILE_GENERIC.MD5CHECKSUM = f.FILE_GENERIC[0].MD5CHECKSUM[0];
                file.FILE_GENERIC.FILENAME = f.FILE_GENERIC[0].FILENAME[0];
                /*
                    (f.FILE_GENERIC[0].REPLACED_FILE_PID === undefined ? null : f.FILE_GENERIC[0].REPLACED_FILE_PID),
                    new ValueStruct(f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE[0], f.FILE_GENERIC[0].CONTENT_STATUS[0].VALUE_DECODE[0]),
                    new ValueStruct(f.FILE_GENERIC[0].FILE_TYPE[0].VALUE[0], f.FILE_GENERIC[0].FILE_TYPE[0].VALUE_DECODE[0]),
                    f.FILE_GENERIC[0].FORMAT_COMMENT[0],
                    f.FILE_GENERIC[0].MD5CHECKSUM[0],
                    f.FILE_GENERIC[0].FILENAME[0]

                    */

                f.FILE_RA.forEach(fr => {
                    let fileRA = new FileRA();
                    fileRA.METADATA_STATUS = new ValueStruct(fr.METADATA_STATUS[0].VALUE[0], fr.METADATA_STATUS[0].VALUE_DECODE[0]);
                    fileRA.CBI_DESIGNATION = fr.CBI_DESIGNATION[0];
                    fileRA.FILE_COMMENT = (fr.FILE_COMMENT === undefined ? null : fr.FILE_COMMENT[0]);
                    file.addFileRA(fileRA);


                }

                );

                console.log('---------------------JSON Model----------------\n' + JSON.stringify(file));
                console.log('------------------------GHSTS Format--------------------\n' + JSON.stringify(file.toGHSTSJson()));
                // enable the following to insert into db.
                self.createFile(file);

            })/*
            .catch(function (e) {
                console.log(e);
            } ) */
            self.getFiles().then(
                files=>{
                    fileCtr.files=[].concat(files);
                    fileCtr.selected=files[0];
                }
            );
        });
    }

}
FileService.$inject = ['$q'];

export { FileService }