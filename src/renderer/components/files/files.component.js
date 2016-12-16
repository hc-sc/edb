import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './files.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import BaseCtrl from '../common/base.controller';

import modelFile from '../../view-models/gen/file.json';

export default angular.module('files', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
.component('files', {
  template,
  bindings: {
    fileType: '<',
    contentStatus: '<'
  },

  controller: class FileCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'file', $scope);

      this.fileType = JSON.parse(this.fileType.data);
      this.contentStatus = JSON.parse(this.contentStatus.data);
      this.listFileButton = { name: 'list', label: 'Select File', color: 'dark' };

      this.init().then(() => {this.loading = false;});
    }

    add() {
      this.selected = angular.copy(this.getModel('file'));
    }
    
    selectFile() {
      this.appDataService.edb_get({_url: 'file', method: 'selectFile', data: angular.copy(this.selected)})
        .then(ret => {
          this.selected = JSON.parse(ret.data)[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
})
.name;