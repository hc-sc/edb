import angular from 'angular';
import template from './icon-button.template';
import IconButtonCtrl from './icon-button.controller';

export default angular.module('app.icon-button', [])
.component('iconButton', {
//  templateUrl: './renderer/components/common/icon-button/icon-button.template.html',
template,
  controller: IconButtonCtrl,
  bindings: {
    icon: '@',
    colour: '@',
    label: '@',
    onUpdate: '&'
  }
}).name;