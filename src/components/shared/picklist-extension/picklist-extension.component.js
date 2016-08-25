import angular from 'angular';

import PickListExtensionCtrl from './picklist-extension.controller';

export default angular.module('app.picklist-extension', [
  'ui.router',
  'ngMaterial',
])
.component('picklistExtension', {
  templateUrl: './components/shared/picklist-extension/picklist-extension.template.html',
  controller: PickListExtensionCtrl
});