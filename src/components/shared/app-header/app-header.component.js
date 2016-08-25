import angular from 'angular';

import AppHeaderCtrl from './app-header.controller';

import IconButton from '../icon-button/icon-button.component';

export default angular.module('app.app-header', [
  IconButton.name
])
.component('appHeader', {
  templateUrl: './components/shared/app-header/app-header.template.html',
  controller: AppHeaderCtrl,
  bindings: {
    icons: '=',
    colour: '@',
    back: '<',
    project: '<'
  }
});