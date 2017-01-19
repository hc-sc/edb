import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class LECtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'legalentity', $scope);
    console.log(this);
    this.legalEntityTypes = JSON.parse(this.legalEntityType.data);
    this.legalEntityIdentifierTypes = JSON.parse(this.legalEntityIdentifierType.data);
    this.countries = JSON.parse(this.countries.data);

    this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };

    this.picklists = {
      legalEntityIdentifierTypes: this.legalEntityIdentifierTypes
    };

    this.init().then(() => { this.loading = false; });
  }

  updateContactAddress(prop, value) {
    this.selected.contactaddress[prop] = value;
  }

  genPid() {

    this.selected.legalentitypid = this.getPid();
  }
}