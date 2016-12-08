import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class DocumentCtrl extends BaseCtrl{
   constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService,  $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'document',  $scope);
      this.metadataStatusOptions = JSON.parse(this.metadataStatusType.data);
      this.contentStatusOptions = JSON.parse(this.contentStatusType.data);
      this.referenceTypeOptions = JSON.parse(this.referenceType.data);
      this.documentNumberTypeOptions = JSON.parse(this.documentNumberType.data);
      //console.log(JSON.stringify(this.documentNumberTypeOptions));
      this.picklists = {
            contentStatusOptions: this.contentStatusOptions,
            referenceTypeOptions: this.referenceTypeOptions,
            documentNumberTypeOptions: this.documentNumberTypeOptions
      };
      // projection item name must match with name defined in propertyInfos of jsonschema definition
      this.contentStatusProjection = [
        'contentstatus',
        'submissionnumber'
      ];

      this.init().then(() => {this.loading = false;});
      //this.getModels();
    }

        // updateDocumentNumber(prop, value) {
        //     this.selected.contactaddress[prop] = value;
        // }

        updateDocumentNumber(value) {
            console.log(value);
        }
}
// DocumentCtrl.$inject = ['$mdDialog', '$mdToast', '$state', 'PicklistService', 'AppDataService', 'ModelService',  '$scope']
// export {DocumentCtrl}