import angular from 'angular';
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js';
import {FileRA, FileGeneric, File} from './fileModel.js'
//import uuid from 'node-uuid';
class FileController {
    constructor($mdDialog, fileService) {
        this.fileService = fileService;
        //  this.legalEntityService = LegalEntityService;
        this.$mdDialog = $mdDialog;
        this.selected = null;
        this.files = [];
        this.selectedIndex = 0;
        this.filterText = null;
        this.getAllFiles();
    }
    // clear all fields
    createFile() {
        this.selected = { FILE_RA: [] };
        this.selectedIndex = null;
    }
    saveFile($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            this.fileService.updateFile(this.selected).then(function (affectedRows) {
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Updated Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
        }
        else {
            this.fileService.createFile(this.selected).then(affectedRows =>
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                ).then(this.getAllFiles())
            );
        }
    }
    /*
    updateFile($event){
                let self = this;
            this.fileService.updateFile(this.selected).then(function (affectedRows) {
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Updated Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                    );
            });
    }
    */
    deleteFile($event) {
        let confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this File?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);

        this.$mdDialog.show(confirm).then(() => {
            let self = this;
            self.fileService.deleteFile(self.selected._id)
                .then(affectedRows => {self.files.splice(self.selectedIndex, 1);self.createFile();});
        });
    }

    getAllFiles() {
        let self = this;
        this.fileService.getFiles().then(files => {
            self.files = [].concat(files);
            self.selected = files[0];
        });
    }
    filterFile() {
        if (this.filterText == null || this.filterText == "") {
            this.getAllFiles();
            console.log(this.files);
        }
        else {
            // this.getAllFiles();

            this.fileService.getFileByName(this.filterText).then(files => {
                this.files = [].concat(files);
                this.selected = files[0];
            });

            console.log(this.files);
        }
    }
    selectFile(file, index) {
        this.selected = angular.isNumber(file) ? this.files[file] : file;
        this.selectedIndex = angular.isNumber(file) ? file : index;
    }
    addFileRA() {
        // this.selected.FILE_RA.push(''); METADATA_STATUS
        // let metaStatus = new ValueStruct("DUNS-number", "DUNS-number"); 
        if(this.selected==null) this.createFile();
        let fileRA = new FileRA();
        fileRA.METADATA_STATUS = { VALUE: '', VALUE_DECODE: '' };
        fileRA.CBI_DESIGNATION = '';
        fileRA.FILE_COMMENT = '';
        this.selected.FILE_RA.push(fileRA);

    }
    deleteFileRA(index, $event) {
        let confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this File RA?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);

        this.$mdDialog.show(confirm).then(() => {
            let self = this;
            // delete the specific identifier
            // _.remove(this.selected.FILE_RA, { IDENTIFIER: identifier });
            // let pos=selected.FILE_RA.indexof(fileRA)
            this.selected.FILE_RA.splice(index, 1);
            // update the legal entity            
            this.fileService.updateFile(this.selected);
        });
    }
    addTestFile() {
        // read from sample ghsts and populate the database with legal entities.       
        this.fileService.addFileToDB().then(this.getAllFiles());
    }
    initializeFile() {
        // read from sample ghsts and populate the database with legal entities. 
        let self=this;      
        this.fileService.initializeFile(self);
        //this.getAllFiles(); 

    }
    viewFileJson($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            let leJson = JSON.stringify(this.selected);
            self.$mdDialog.show(
                self.$mdDialog
                    .alert()
                    .clickOutsideToClose(true)
                    .title('File JSON')
                    .content(leJson)
                    .ok('Ok')
                    .targetEvent($event)
            );
        }
    }
    viewFileGHSTS($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            this.fileService.getFileById(this.selected._id).then(xml =>
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Legal Entity GHSTS')
                        .content(xml)
                        .ok('Ok')
                        .targetEvent($event)
                )
            );
        };
    }
}

FileController.$inject = ['$mdDialog', 'fileService'];

export { FileController }