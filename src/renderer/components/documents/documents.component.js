import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './documents.template';

export default angular.module('documents', [
  ngMaterial
])
.component('documents', {
  template
})
.name;