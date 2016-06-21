import angular from 'angular';
import { OtherNationalGuideLine, SubmissionContext } from './documentModel';
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

        this.specificRaIdOptions = this.pickListService.getSpecificRaIdOptions();
    }

    cancel($event) {
        this.$mdDialog.cancel();
    };

    // saveDocumentRA($event) {
    //     this.documentController.saveDocumentRA(this.documentRA, this.isAddMode);
    //     this.$mdDialog.hide();
    // }

    saveDocumentRA($event) {
        this.documentController.saveDocumentRA(this.documentRA);
        this.$mdDialog.hide();
    }

    addDocumentRAComment($event){
        this.documentRA.DOCUMENT_COMMENT.push('');
    }

    deleteDocumentRAComment(raComment, $event){
         _.pull(this.documentRA.DOCUMENT_COMMENT, raComment);
    }

    addDocumentRAONG($event){
        this.documentRA.OTHER_NATIONAL_GUIDELINE.push(new OtherNationalGuideLine());
    }

    deleteDocumentRAONG(raOgl, $event){
         _.pull(this.documentRA.OTHER_NATIONAL_GUIDELINE, raOgl);
    }

    addRDNSubmissionContext($event){
        this.documentRA.RA_DOCUMENT_NUMBER.SUBMISSION_CONTEXT.push(new SubmissionContext());
    }

    deleteRDNSubmissionContext(sc, $event){
         _.pull(this.documentRA.RA_DOCUMENT_NUMBER.SUBMISSION_CONTEXT, sc);
    }

    updateSelectedStatusDecode(){
        // update metadata status value decode upon selection change
        let selectedStatusValue = this.documentRA.METADATA_STATUS.VALUE;
        // find the value decode in themetadata status options
        let docRaStatusValueDecode = _(this.metadataStatusOptions)
                                         .filter(c => c.VALUE == selectedStatusValue)
                                         .map(c => c.VALUE_DECODE)
                                         .value()[0];
        this.documentRA.METADATA_STATUS.VALUE_DECODE = docRaStatusValueDecode;
    }

    updateSelectedDataProDecode(){
        let selectedYesNoValue = this.documentRA.DATA_PROTECTION.VALUE;
        let dataValueDecode = _(this.yesnoOptions)
                                         .filter(c => c.VALUE == selectedYesNoValue)
                                         .map(c => c.VALUE_DECODE)
                                         .value()[0];
        this.documentRA.DATA_PROTECTION.VALUE_DECODE = dataValueDecode;
    }

    updateSelectedDataReqDecode(){
        let selectedYesNoValue = this.documentRA.DATA_REQUIREMENT.VALUE;
        let dataValueDecode = _(this.yesnoOptions)
                                         .filter(c => c.VALUE == selectedYesNoValue)
                                         .map(c => c.VALUE_DECODE)
                                         .value()[0];
        this.documentRA.DATA_REQUIREMENT.VALUE_DECODE = dataValueDecode;
    }

    updateSelectedRaDocNumTypeDecode(){
        let selectedValue = this.documentRA.RA_DOCUMENT_NUMBER.RA_DOCUMENT_NUMBER_TYPE.VALUE;
        let valueDecoded = _(this.raDocNumTypeOptions)
                                         .filter(c => c.VALUE == selectedValue)
                                         .map(c => c.VALUE_DECODE)
                                         .value()[0];
        this.documentRA.RA_DOCUMENT_NUMBER.RA_DOCUMENT_NUMBER_TYPE.VALUE_DECODE = valueDecoded;
    }
}

DocumentRAController.$inject = ['documentRA', 'documentController', '$mdDialog', 'pickListService'];

export { DocumentRAController }
