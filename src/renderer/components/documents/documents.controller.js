import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class DocumentCtrl extends BaseCtrl{
   constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService,  $scope, GhstsService, $transitions) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'document',  $scope, GhstsService, $transitions);
      this.metadataStatusOptions = JSON.parse(this.metadataStatusType.data);
      this.contentStatusOptions = JSON.parse(this.contentStatusType.data);
      this.referenceTypeOptions = JSON.parse(this.referenceType.data);
      this.documentNumberTypeOptions = JSON.parse(this.documentNumberType.data);
      this.dataprotectionTypeOptions = JSON.parse(this.dataprotectionType.data);
      this.datarequirementTypeOptions = JSON.parse(this.datarequirementType.data);
      this.raDocumentNumberType = JSON.parse(this.raDocumentNumberType.data);
      this.picklists = {
            contentStatusOptions: this.contentStatusOptions,
            referenceTypeOptions: this.referenceTypeOptions,
            documentNumberTypeOptions: this.documentNumberTypeOptions,
            dataprotectionTypeOptions: this.dataprotectionTypeOptions,
            datarequirementTypeOptions: this.datarequirementTypeOptions,
            raDocumentNumberTypeOptions: this.raDocumentNumberType
      };
      
    
      this.contentStatusProjection = [
        {name: "contentstatus", url: "picklist"},
        'submissionnumber'
      ]; 

      this.referencedDocumentProjection = [
        {name: "referencetype", url: "picklist"},
        'internal',
        'documentpid'
      ];

       this.documentnumberProjection = [
         {name: "documentnumbertype", url: "picklist"},
         'identifier'       
      ];

      this.init().then(() => {
        this.loading = false;
        if (this.isSubmission)
          this.$scope.$root.loading = false;
      });
      //this.getModels();
    }


    genPid() {
      this.selected.documentgeneric.documentpid = this.getPid();
    }

    genFamilyPid() {
      this.selected.documentgeneric.documentfamilypid = this.getPid();
    }
    
}
