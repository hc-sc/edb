import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class LECtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'legalentity');
    console.log(arguments);
    this.legalEntityTypes = JSON.parse(this.legalEntityType.data);
    this.legalEntityIdentifierTypes = JSON.parse(this.legalEntityIdentifierType.data);
    this.countries = JSON.parse(this.countries.data);

    this.picklists = {
      legalEntityIdentifierTypes: this.legalEntityIdentifierTypes
    };

    this.init().then(() => {this.loading = false;});
  }

  add() {
    this.selected = angular.copy(this.getModel('legalentity'));
  }

  updateContactAddress(prop, value) {
    this.selected.contactaddress[prop] = value;
  }
}