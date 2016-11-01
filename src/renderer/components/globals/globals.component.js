import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './globals.template';

export default angular.module('globals', [
  ngMaterial
])
.component('globals', {
  template
})
.name;