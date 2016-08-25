import angular from 'angular';

import LegalEntitiesCtrl from './legal-entities.controller';

export default angular.module('app.legal-entities', [
  'ui.router',
  'ngMaterial'
])
.component('legalEntities', {
  templateUrl: './components/legal-entities/legal-entities.template.html',
  controller: LegalEntitiesCtrl
});