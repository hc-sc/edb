import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './list.template';

export default angular.module('list', [
  ngMaterial
])
.component('list', {
  template,
  bindings: {
    label: '@',
    items: '<'
  }
})
.name;