import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'substance', $scope, GhstsService, $transitions);
    this.substanceIdentifierTypes = JSON.parse(this.substanceIdentifierTypes.data);
    this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };
    this.picklists = {
      identifierTypes: this.substanceIdentifierTypes
    };

    this.init().then(() => { this.loading = false; });
  }

  genPid() {
    this.selected.substancepid = this.getPid();
  }
}