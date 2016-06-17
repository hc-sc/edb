import angular from 'angular';
import {_} from 'lodash';

class MD5GenController {
    constructor(fileController, $mdDialog) {
        this.fileController = fileController;
        this.$mdDialog = $mdDialog;  
        this.inputLetter = ''; 
        this.isAddMode = true;
        /*
        if(_.isEmpty(inputLetter) === true){
            this.isAddMode = true;
        }
        */
    }      
  
    cancel($event) {
        this.$mdDialog.cancel();
    };    

    getMD5Checksum(inputLetter) {
      //  this.legalEntityController.saveContactPerson(this.contactPerson, this.isAddMode);  
       let md= this.fileController.generateMD(inputLetter);
       this.fileController.selected.FILE_GENERIC.MD5CHECKSUM=md;
       this.$mdDialog.hide();
    } 
}

MD5GenController.$inject = ['fileController', '$mdDialog'];

export { MD5GenController }