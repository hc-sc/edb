import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import template from './toolbar.template';

import Icon from '../icon/icon.component';

import './toolbar.scss';

export default angular.module('toolbar', [
  uiRouter,
  ngMaterial,
  Icon
])
.component('toolbar', {
  template,
  bindings: {
    items: '<',
  },
  controller: class ToolbarCtrl {
    constructor($state, $rootScope) {
      this.$state = $state;
      this.$rootScope = $rootScope;
    }

    trigger(item) {
      if (item.state) {
        this.$state.go(item.state);
      }
      else if (item.func) {
        item.func();
      }
      else {
        console.error('Needs to have either a state or func prop for icons');
      }
    }
  }
})
.name;