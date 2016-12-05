import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'substance');
    this.substanceIdentifierTypes = JSON.parse(this.substanceIdentifierTypes.data);

    this.picklists = {
      substanceIdentifierTypes: this.substanceIdentifierTypes
    };

    this.identifierProjection = [
      'identifier',
      'substanceidentifiertype'
    ];
    this.init().then(() => {this.loading = false;});
  }

  add() {
    this.selected = angular.copy(this.getModel('substance'));
  }

}