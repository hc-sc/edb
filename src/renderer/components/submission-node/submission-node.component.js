import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import BaseCtrl from '../common/base.controller';
import TextInput from '../common/text-input/text-input.component';

import template from './submission-node.template';

export default angular.module('submissionNode', [
  uiRouter,
  ngMaterial,
  TextInput,
])
.component('submissionNode', {
  template,
  controller: class SubCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'submission', $scope);
      this.init(this.$state.params.submissionid)
      .then(() => {
        this.$scope.$root.loading = false;
      });
    }
  }
})
.name;