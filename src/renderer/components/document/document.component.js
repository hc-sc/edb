import angular from 'angular';
import ngMaterial from 'angular-material';

import template from './document.template';

export default angular.module('document', [
  ngMaterial
])
.component('document', {
  template
})
.name;