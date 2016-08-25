import angular from 'angular';

import SubstanceCtrl from './substance.controller';
import SubstanceService from './substance.service';
import PickListService from '../shared/services/picklist.service';
import CardButton from '../shared/card-button/card-button.component';

export default angular.module('app.edit.substance', [
  'ui.router',
  'ngMaterial',
  CardButton.name
])
.component('substance', {
  templateUrl: './components/substance/substance.template.html',
  controller: SubstanceCtrl,
  controllerAs: '_ctrl'
})
.service('substanceService', SubstanceService)
.service('picklistService', PickListService);