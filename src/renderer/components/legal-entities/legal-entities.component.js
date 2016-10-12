import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

export default angular.module('legalEntities', [
  ngMaterial
])
.component('legalEntities', {
  template
})
.name;