import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

import TextInput from '../common/text-input/text-input.component';
import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import BaseCtrl from '../common/base.controller';

export default angular.module('receiver', [
  ngMaterial,
  TextInput,
  Tbl,
  SelectInput
])
.component('receiver', {
  template,
  bindings: {
    dossierData: '<'
  },
  controller: class ReceiversCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'receiver', $scope);
      this.init()
      .then(() => {
        return this.getAppData({}, 'legalentity');
      })
      .then(legalentities => {
        this.legalEntities = JSON.parse(legalentities.data);
        this.$scope.$root.loading = false;
      });
    }
  }
})
.name;