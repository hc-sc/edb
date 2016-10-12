import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './files.template';

export default angular.module('files', [
  ngMaterial
])
.component('files', {
  template
})
.name;