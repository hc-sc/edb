import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import template from './navbar.template';

import './navbar.scss';

export default angular.module('navbar', [
  uiRouter,
  ngMaterial
])
.component('navbar', {
  template,
  bindings: {
    items: '<'
  }
})
.name;