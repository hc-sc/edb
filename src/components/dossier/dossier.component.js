import angular from 'angular';

import DossierCtrl from './dossier.controller';

export default angular.module('dossier', [
  'ui.router',
  'ngMaterial'
])
.component('dossier', {
  templateUrl: './components/dossier/dossier.template.html',
  controller: DossierCtrl
});