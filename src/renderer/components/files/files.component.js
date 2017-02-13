import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './files.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import GhstsService from '../../services/ghsts.service';
import BaseCtrl from '../common/base.controller';
import _ from 'lodash';

export default angular.module('files', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService,
  GhstsService
])
  .component('files', {
    template,
    bindings: {
      fileType: '<',
      contentStatus: '<',
      dossierData: '<',
      isSubmission: '<'
    },

    controller: class FileCtrl extends BaseCtrl {
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'file', $scope, GhstsService, $transitions);

        this.fileType = JSON.parse(this.fileType.data);
        this.contentStatus = JSON.parse(this.contentStatus.data);
        this.listFileButton = { name: 'list', label: 'Select File', color: 'dark' };
        this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };
        this.init().then(() => { 
          this.loading = false; 
          if (this.isSubmission) 
            this.$scope.$root.loading = false;
        });
      }

      selectFile() {
        this.appDataService.edb_get({ _url: 'file', method: 'selectFile', data: angular.copy(this.selected) })
          .then(ret => {
            let isExist = false;
            this.selected = JSON.parse(ret.data);
            for (var i = 0; i < this.records.length; i++) {
              if (this.records[i]._id === this.selected._id) {
                this.records[i] = this.selected;
                isExist = true;
                break;
              }
            }
            if (!isExist)
              this.records.push(this.selected);
            console.log(this.selected);
          })
          .catch(err => {
            console.log(err);
          });
      }
      genPid() {
        this.selected.filegeneric.filepid = this.getPid();
      }
    }
  })
  .name;