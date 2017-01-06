import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import BaseCtrl from '../common/base.controller';
import TextInput from '../common/text-input/text-input.component';

import template from './sub.template';

export default angular.module('sub', [
  uiRouter,
  ngMaterial,
  TextInput,
])
.component('sub', {
  template,
  controller: class SubCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'submission', $scope);
      this.getAppData({}, 'submission')
      .then(sub => {
        this.selected = getSubmission(this.$state.params.submissionid, JSON.parse(sub.data));
        this.$scope.$root.loading = false;
      });
      // this.init().then(() => {this.$scope.$root.loading = false;})
    }
  }
})
.name;

function getSubmission(id, submissions) {
  for (let sub of submissions) {
    if (sub.id == id) {
      return sub;
    }
  }

  console.error('no matching id');
  return null;
}