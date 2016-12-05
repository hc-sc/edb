import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './documents.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import BaseCtrl from '../common/base.controller';

export default angular.module('documents', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
.component('documents', {
  template,
  bindings: {
    documents: '<',
    metadataStatusOptions: '<',
    contentStatusOptions: '<',
    referenceTypeOptions: '<',
    documentNumberTypeOptions: '<'
  },
  controller: class DOCCtrl extends BaseCtrl{
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, $http) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'document', $http);
      this.metadataStatusOptions = JSON.parse(this.metadataStatusOptions.data);
      this.contentStatusOptions = JSON.parse(this.contentStatusOptions.data);
      this.referenceTypeOptions = JSON.parse(this.referenceTypeOptions.data);
      this.documentNumberTypeOptions = JSON.parse(this.documentNumberTypeOptions.data);
      // Columns to be displayed
      this.contentStatusProjection = [
        'contentstatus',
        'submissionnumber'
      ];

      this.init().then(() => {this.loading = false;});
      //this.getModels();
    }

  }
})
.name;