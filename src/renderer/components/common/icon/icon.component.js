import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './icon.template';

import './icon.scss';

export default angular.module('icon', [
  ngMaterial
])
.component('icon', {
  template,
  bindings: {
    icon: '<',
    disabled: '<'
  }
})
.name;