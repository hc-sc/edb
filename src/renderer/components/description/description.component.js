import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './description.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Icon from '../common/icon/icon.component';
import Tbl from '../common/tbl/tbl.component';

import BaseCtrl from '../common/base.controller';

export default angular.module('description', [
  ngMaterial,
  TextInput,
  SelectInput,
  Icon,
  Tbl
])
  .component('description', {
    template,
    bindings: {
      dossierData: '<'
    },
    controller: class DescriptionCtrl extends BaseCtrl {
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'dossier', $scope);
        this.init().then(() => {
          return this.getPicklist('EXTENSION_TYPE_REGULATORY_TYPE');
        }).then(regulatorytype => {
          this.regulatoryTypes = JSON.parse(regulatorytype.data);
          return this.getPicklist('EXTENSION_TYPE_APPLICATION_TYPE');
        }).then(applicationtype => {
          this.applicationTypes = JSON.parse(applicationtype.data);
          this.picklists = {
            regulatoryTypes: this.regulatoryTypes,
            applicationTypes: this.applicationTypes
          };
          this.$scope.$root.loading = false;
        });
      }
    }
  })
  .name;