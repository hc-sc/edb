import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './footer.template';

import Navbar from '../navbar/navbar.component';

import './footer.scss';

export default angular.module('footer', [
  ngMaterial,
  Navbar
])
.component('footer', {
  template,
  bindings: {
    items: '<'
  }
})
.name;