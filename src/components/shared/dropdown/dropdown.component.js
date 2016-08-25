import angular from 'angular';

import DropdownCtrl from './dropdown.controller';

export default angular.module('app.dropdown', [
  'ui.router',
  'ngMaterial'
])
.component('dropdown', {
  templateUrl: './components/shared/dropdown/dropdown.template.html',
  controller: DropdownCtrl,
  bindings: {
    type: '@',
    extensible: '<',
  }
})