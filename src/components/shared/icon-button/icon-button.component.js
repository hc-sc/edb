import angular from 'angular';

import IconButtonCtrl from './icon-button.controller';

export default angular.module('app.icon-button', [])
.component('iconButton', {
  templateUrl: './components/shared/icon-button/icon-button.template.html',
  controller: IconButtonCtrl,
  bindings: {
    icon: '@',
    colour: '@',
    label: '@',
    onClick: '&'
  }
});