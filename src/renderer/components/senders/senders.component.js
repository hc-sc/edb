import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './senders.template';

import SendersCtrl from './senders.controller';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';

export default angular.module('sender', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
  .component('sender', {
    template,
    controller: SendersCtrl,
    bindings: {//assigned by state resolve
      senders: '<'
    },
  })
  .name;