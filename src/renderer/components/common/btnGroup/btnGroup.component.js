import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './icon.template';

import './icon.scss';

export default angular.module('btnGroup', [
  ngMaterial
])
.component('btnGroup', {
  template,
  bindings: {
    name: '@'
  }
})
.name;