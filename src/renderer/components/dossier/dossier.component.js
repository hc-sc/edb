import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './dossier.template';

import DossierService from '../../services/dossier.service';

export default angular.module('dossier', [
  ngMaterial
])
.component('dossier', {
  template,
  bindings: {
    dossier: '<'
  },
  controller: class DossierCtrl {
    constructor($state) {
      this.$state = $state;
      this.toolbarItems = {
        navIcons: [
          { name: 'back', label: 'Back', state: 'home' }
        ],
        title: this.dossier[0].DOSSIER_DESCRIPTION_TITLE,
        functionIcons: [
          { name: 'settings', label: 'Settings', state: 'settings' },
          { name: 'help', label: 'Help' }
        ]
      }
    }
  }
})
.service('DossierService', DossierService)
.name;