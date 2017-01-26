import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class DocumentCtrl extends BaseCtrl{
   constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService,  $scope, GhstsService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'document',  $scope, GhstsService);
      this.metadataStatusOptions = JSON.parse(this.metadataStatusType.data);
      this.contentStatusOptions = JSON.parse(this.contentStatusType.data);
      this.referenceTypeOptions = JSON.parse(this.referenceType.data);
      this.documentNumberTypeOptions = JSON.parse(this.documentNumberType.data);
      this.dataprotectionTypeOptions = JSON.parse(this.dataprotectionType.data);
      this.datarequirementTypeOptions = JSON.parse(this.datarequirementType.data);
      this.raDocumentNumberTypeOptions = JSON.parse(this.raDocumentNumberType.data);
      this.picklists = {
            contentStatusOptions: this.contentStatusOptions,
            referenceTypeOptions: this.referenceTypeOptions,
            documentNumberTypeOptions: this.documentNumberTypeOptions,
            dataprotectionTypeOptions: this.dataprotectionTypeOptions,
            datarequirementTypeOptions: this.datarequirementTypeOptions,
            raDocumentNumberTypeOptions: this.raDocumentNumberTypeOptions
      };
      this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };
      // projection item name must match with name defined in propertyInfos of jsonschema definition    
   
      this.contentStatusProjection = [
        {name: "contentstatus", url: "picklist"},
        'submissionnumber'
      ]; 

      this.referencedDocumentProjection = [
        {name: "referencetype", url: "picklist"},
        'internal',
        'documentpid',
        {name: "documentnumbertype", url: "picklist"}
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

    add() {
            this.selected = angular.copy(this.getModel('document'));
    }

    genPid() {
      this.selected.legalentitypid = this.getPid();
    }
    
}
