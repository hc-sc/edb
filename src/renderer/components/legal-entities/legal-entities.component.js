import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import LECtrl from './legal-entities.controller';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';
import List from '../common/list/list.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  List,
  PicklistService,
  AppDataService
])
.component('legalEntities', {
  template,
  bindings: {
    legalEntityType: '<',
    legalEntityIdentifierType: '<',
    countries: '<'
  },
  controller: LECtrl
})
.name;
