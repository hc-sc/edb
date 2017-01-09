import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import Accordion from '../common/accordion/accordion.component';

import template from './picklists.template';

export default angular.module('picklists', [
  uiRouter,
  ngMaterial,
  Accordion
])
.component('picklists', {
  template,
  bindings: {
    picklists: '<'
  },
  controller: class PicklistCtrl {
    constructor() {}
  }
})
.name;