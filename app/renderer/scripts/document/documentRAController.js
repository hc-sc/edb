import angular from 'angular';
import {_} from 'lodash';

class DocumentRAController {
    constructor(documentRA, documentController, $mdDialog) {
        this.documentController = documentController;
        this.$mdDialog = $mdDialog;  
        this.documentRA = documentRA; 
        this.isAddMode = false;
        if(_.isEmpty(documentRA) === true){
            this.isAddMode = true;
        }
    }      
  
    cancel($event) {
        this.$mdDialog.cancel();
    };    

    saveDocumentRA($event) {
        
    } 
}

DocumentRAController.$inject = ['documentRA', 'documentController', '$mdDialog'];

export { DocumentRAController }