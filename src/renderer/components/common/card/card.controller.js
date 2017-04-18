import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './card.template';
import './card.scss';

export default angular.module('card', [
  ngMaterial
])
.component('card', {
  template,
  bindings: {
    icon: '@',
    label: '@'
  }
})
.name;