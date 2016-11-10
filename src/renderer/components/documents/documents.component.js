import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './documents.template';

import Tbl from '../common/tbl/tbl.component';
import TextInput from '../common/text-input/text-input.component';

export default angular.module('documents', [
  ngMaterial,
  Tbl,
  TextInput
])
.component('documents', {
  template
})
.name;