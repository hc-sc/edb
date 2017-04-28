import angular from 'angular';
import ngMaterial from 'angular-material';
import Icon from '../icon/icon.component';
import template from './card.template';
import './card.scss';

export default angular.module('card', [
  ngMaterial,
  Icon
])
.component('card', {
  template,
  bindings: {
    icon: '@',
    label: '@',
    color: '@'
  }
})
.name;