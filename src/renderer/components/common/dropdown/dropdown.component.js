import angular from 'angular';
//import PickListService from '../services/picklist.service';
import DropdownCtrl from './dropdown.controller';
import template from './dropdown.template';
import picklistext from '../picklist-extension/picklist-extension.component';
import iconbutton from '../icon-button/icon-button.component';
export default angular.module('app.dropdown', [
  'ui.router',
  'ngMaterial',
  picklistext,
  iconbutton
  // 'app.service.picklist'
])
  .component('dropdown', {
    // templateUrl: './components/common/dropdown/dropdown.template.html',
    template,
    controller: DropdownCtrl,
    bindings: {
      options: '<',//
      typename: '@', //type name
      extensible: '<', //boolean
    }
  }).name;