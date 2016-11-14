import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Tbl from '../common/tbl/tbl.component';

export default angular.module('toc', [
  ngMaterial,
  TextInput,
  SelectInput,
  Tbl
])
.component('toc', {
  template
})
.name;