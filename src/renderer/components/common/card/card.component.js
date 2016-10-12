import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './card.template';

export default angular.module('card', [
  ngMaterial
])
.component('card', {
  template
})
.name;