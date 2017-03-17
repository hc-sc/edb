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
        this.listFileButton = { name: 'list', label: 'Select File', color: 'dark' };
        this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };
        this.init().then(() => { 
          return this.getPicklist('TYPE_FILE_TYPE');
        })
        .then(ft => {
          this.fileType = JSON.parse(ft.data);
          return this.getPicklist('TYPE_CONTENT_STATUS');
        })
        .then(cs => {
          this.contentStatus = JSON.parse(cs.data);
          this.picklists = {
            fileType: this.fileType,
            contentStatus: this.contentStatus
          };
          this.loading = false; 
          if (this.isSubmission) 
            this.$scope.$root.loading = false;
        });
      }

      selectFile() {
        let curData = angular.copy(this.selected);
        if (this.isSubmission) {
          curData._dossier = this.dossierData.dossierid;
          curData._ghsts = this.ghsts._id;
        }
        this.appDataService.edb_get({ _url: 'file', method: 'selectFile', data: curData })
          .then(ret => {
            let data = JSON.parse(ret.data);            
            let isExist = this.selected._id === data._id;

            if (!isExist) {
              this.records.push(data);
            } else {
              this.records[this.selectedIndex] = data;
            }
            this.sortData();
            this.resetSelected(data._id);
            this.showMessage('Selected file.');
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