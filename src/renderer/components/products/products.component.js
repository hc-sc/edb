import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './products.template';

import BaseCtrl from '../common/base.controller';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';

export default angular.module('products', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
  .component('products', {
    template,
    bindings: {
      adminNumberType: '<',
      formulationType: '<',
      unitType: '<',
      dossierData: '<',
      isSubmission: '<'
    },
    controller: class ProductsCtrl extends BaseCtrl {
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'product', $scope, GhstsService, $transitions);

        this.adminNumberType = JSON.parse(this.adminNumberType.data);
        this.formulationType = JSON.parse(this.formulationType.data);
        this.unitType = JSON.parse(this.unitType.data);
        this.addButton = { name: 'add', label: 'Generate PID', color: 'dark' };

        this.picklists = {
          adminNumberType: this.adminNumberType,
          formulationType: this.formulationType,
          unitType: this.unitType
        };

        this.init().then(() => { 
          this.loading = false; 
          if (this.isSubmission) 
            this.$scope.$root.loading = false;
        });
      }

      genPid() {
        this.selected.productpid = this.getPid();
      }
    }
  })
  .name;