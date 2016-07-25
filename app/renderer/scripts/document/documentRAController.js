import angular from 'angular';
import { OtherNationalGuideLine, SubmissionContext } from './documentModel';
import {_} from 'lodash';

class DocumentRAController {
    constructor(documentRA, documentController, $mdDialog, PickListService, ReceiverService) {
        this.documentController = documentController;
        this.documentRA = documentRA;
        this.$mdDialog = $mdDialog;
        this.pickListService = PickListService;
        this.receiverService = ReceiverService;

        this.isAddMode = false;
        if(_.isEmpty(documentRA) === true){
            this.isAddMode = true;
        }


        this.pickListService.getType('TYPE_METADATA_STATUS')
            .then(metadataStatusOptions => {
                this.metadataStatusOptions = metadataStatusOptions;
                return this.pickListService.getType('TYPE_RA_DOCUMENT_NUMBER_TYPE');
            })

            .then(radocNumTypes => {
                this.raDocNumTypeOptions = radocNumTypes;
                return this.pickListService.getType('TYPE_DATA_PROTECTION');            
            })

            .then(radataPro => {
                this.radataProOptions = radataPro;
                return this.pickListService.getType('TYPE_DATA_REQUIREMENT');
            })

            .then(radataReq => {
                this.radataReqOptions = radataReq;  
                return this.receiverService.getRAsWithLegalEntityName();
            })
            .then(recs => {
                this.receiversWithNames = recs;
            })
                  
            .catch(err => console.log(err.stack));
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

DocumentRAController.$inject = ['documentRA', 'documentController', '$mdDialog', 'pickListService', 'receiverService'];

export { DocumentRAController }
