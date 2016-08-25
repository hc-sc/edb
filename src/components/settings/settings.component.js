import angular from 'angular';

import SettingsCtrl from './settings.controller';

export default angular.module('app.settings', [
  'ui.router'
])
.component('settings', {
  templateUrl: './components/settings/settings.template.html',
  controller: SettingsCtrl
});