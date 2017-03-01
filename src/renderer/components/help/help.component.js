import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './help.template';
import HelpCtrl from './help.controller.js';
import Toolbar from '../common/toolbar/toolbar.component.js';

export default angular.module('help', [
    uiRouter,
    Toolbar
  ])
  .component('help', {
    template,
    controller: HelpCtrl
  })
  .name;