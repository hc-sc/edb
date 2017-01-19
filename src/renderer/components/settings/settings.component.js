import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './settings.template';
import SettingsCtrl from './settings.controller.js';
import Toolbar from '../common/toolbar/toolbar.component.js';

export default angular.module('settings', [
  uiRouter,
  Toolbar
])
.component('settings', {
  template,
  controller: SettingsCtrl
})
.name;