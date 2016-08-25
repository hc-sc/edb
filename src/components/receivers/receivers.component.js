import angular from 'angular';

import ReceiversCtrl from './receivers.controller';

export default angular.module('app.edit.receivers', [
  'ui.router',
  'ngMaterial'
])
.component('receivers', {
  templateUrl: './components/receivers/receivers.template.html',
  controller: ReceiversCtrl
});