import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './footer.template';

import Toolbar from '../toolbar/toolbar.component';

export default angular.module('footer', [
  ngMaterial,
  Toolbar
])
.component('footer', {
  template
})
.name;