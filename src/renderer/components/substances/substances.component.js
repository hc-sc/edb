import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './substances.template';

import SubstancesCtrl from './substances.controller';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';

export default angular.module('substances', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
  .component('substances', {
    template,
    controller: SubstancesCtrl,
    bindings: {//assigned by state resolve
      substanceIdentifierTypes: '<'
    },
  })
  .name;