import angular from 'angular';
import ngMaterial from 'angular-material';
import Sidenav from '../common/sidenav/sidenav.component';
import AppDataService from '../../services/app.data.service';
import PicklistService from '../../services/picklist.service';

import template from './substances.template';
import { SubstancesCtrl } from './substances.controller';

import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME } from '../../../constants/shared';



export default angular.module('substances', [
  ngMaterial,
  Sidenav,
  PicklistService,
  AppDataService
])
  .component('substances', {
    template,
    controller: SubstancesCtrl,
    bindings: {//assigned by state resolve
      substances: '<',
      metadataStatusOptions: '<',
      identifierTypeOptions: '<'
    },
  })
  .name;