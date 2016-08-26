import angular from 'angular';

import LegalEntityController from './legal-entity.controller';
import LegalEntityService from './legal-entity.service';
import PickListService from '../shared/services/picklist.service';

export default angular.module('app.edit.legal', [
  'ui.router',
  'ngMaterial'
])
.component('legalEntities', {
  templateUrl: './components/legal-entity/legal-entity.template.html',
  controller: LegalEntityController,
  controllerAs: '_ctrl'
})
.service('legalEntityService', LegalEntityService)
.service('picklistService', PickListService);
