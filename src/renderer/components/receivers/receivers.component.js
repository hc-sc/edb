import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

import TextInput from '../common/text-input/text-input.component';
import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import BaseCtrl from '../common/base.controller';

export default angular.module('receivers', [
  ngMaterial,
  TextInput,
  Tbl,
  SelectInput
])
.component('receivers', {
  template,
  controller: class ReceiversCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, url, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'receiver', $scope);
    }
  }
})
.name;