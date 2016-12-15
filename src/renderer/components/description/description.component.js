import angular from 'angular';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import template from './description.template';
import {} from 'angular-ui-layout';

import 'angular-ui-layout/src/ui-layout.css';


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
  Tbl,
  'ui.layout'
])
  .component('description', {
    template,
    bindings: {
      dossierData: '<'
    },
    controller: class DescriptionCtrl extends BaseCtrl {
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'dossier', $scope);

        this.init().then(() => {this.loading = false;});
      }
    }
  })
  .name;