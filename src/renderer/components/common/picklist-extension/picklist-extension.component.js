import angular from 'angular';
import template from './picklist-extension.template';
import PickListExtensionCtrl from './picklist-extension.controller';
import iconbutton from '../icon-button/icon-button.component';
export default angular.module('app.picklist-extension', [
  'ui.router',
  'ngMaterial',
  iconbutton
])
.component('picklistExtension', {
  //templateUrl: './renderer/components/common/picklist-extension/picklist-extension.template.html',
  template,
  controller: PickListExtensionCtrl,
    bindings: {
    selectedOption: '<',
    onUpdate:'&',
    onClose:'&'
  }

}).name;