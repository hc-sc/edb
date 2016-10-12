import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

export default angular.module('receivers', [
  ngMaterial
])
.component('receivers', {
  template
})
.name;