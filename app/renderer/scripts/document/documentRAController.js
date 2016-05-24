import angular from 'angular';
import {_} from 'lodash';

class DocumentRAController {
    constructor(documentRA, documentController, $mdDialog, PickListService) {
        this.documentController = documentController;
        this.documentRA = documentRA; 
        this.$mdDialog = $mdDialog;  
        this.pickListService = PickListService;
        
        this.isAddMode = false;
        if(_.isEmpty(documentRA) === true){
            this.isAddMode = true;
        }
        
        // options for metadata status
        this.metadataStatusOptions = this.pickListService.getMetadataStatusOptions();
        
        this.yesnoOptions = this.pickListService.getYesNoOptions();
        
        this.raDocNumTypeOptions = this.pickListService.getRADocNumberTypeOptions();
        
    }      
  
    cancel($event) {
        this.$mdDialog.cancel();
    };    

    saveDocumentRA($event) {
        
    } 
    
     updateSelectedStatusDecode(){
        // update metadata status value decode upon selection change
        //let selectedStatusValue = this.selected.METADATA_STATUS.VALUE;
        // find the value decode in themetadata status options
        // let leStatusValueDecode = _(this.metadataStatusOptions)
        //                                 .filter(c => c.VALUE == selectedStatusValue)
        //                                 .map(c => c.VALUE_DECODE)
        //                                 .value()[0];
        //this.selected.METADATA_STATUS.VALUE_DECODE = leStatusValueDecode;
    }
}

DocumentRAController.$inject = ['documentRA', 'documentController', '$mdDialog', 'pickListService'];

export { DocumentRAController }