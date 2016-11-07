import angular from 'angular';
import ngMaterial from 'angular-material';

import template from './splash.template';

import './splash.scss';

export default angular.module('splash', [
  ngMaterial
])
.component('splash', {
  template
})
.name;