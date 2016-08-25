import angular from 'angular';

import DropdownsCtrl from './dropdowns.controller';
import CardButton from '../shared/card-button/card-button.component';

export default angular.module('app.dropdowns', [
  'ui.router',
  'ngMaterial',
  CardButton.name
])
.component('dropdowns', {
  templateUrl: './components/dropdowns/dropdowns.template.html',
  controller: DropdownsCtrl
});
