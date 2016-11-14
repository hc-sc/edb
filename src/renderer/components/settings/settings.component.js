import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './settings.template';

import Toolbar from '../common/toolbar/toolbar.component.js';

export default angular.module('settings', [
  uiRouter,
  Toolbar
])
.component('settings', {
  template,
  controller: class SettingsCtrl {
    constructor() {
      this.toolbarItems = {
        navIcons: [
          { name: 'back', label: 'Back', state: 'home' },
          { name: 'home', label: 'Home', state: 'splash' }
        ],
        title: 'Settings',
        functionIcons: [
          { name: 'help', label: 'Help' }
        ]
      };
    }
  }
})
.name;