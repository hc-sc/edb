import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './documents.template';

import Tbl from '../common/tbl/tbl.component';
import TextInput from '../common/text-input/text-input.component';

import AppDataService from '../../services/app.data.service';
import PicklistService from '../../services/picklist.service';

export default angular.module('documents', [
  ngMaterial,
  Tbl,
  TextInput,
  AppDataService,
  PicklistService
])
.component('documents', {
  template
})
.name;