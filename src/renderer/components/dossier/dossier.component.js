import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './dossier.template';

import DossierService from '../../services/dossier.service';

import { } from '../../services/ghsts.service';
import { GHSTS_NG_MODULE_NAME } from '../../../constants/shared';

export default angular.module('dossier', [
  ngMaterial,
  GHSTS_NG_MODULE_NAME
])
  .component('dossier', {
    template,
    bindings: {
      dossier: '<'
    },
    controller: class DossierCtrl {
      constructor($state, GhstsService) {
        this.$state = $state;
        this.GhstsService = GhstsService.getService();
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

      //For test loading product only for now.
      loadProduct() {
        this.GhstsService.edb_get().then(result => {
          console.log(result);
          this.$state.go('submission.description');
        }).catch(err => {
          console.log(err);
        });
      }

    }
  })
  .service('DossierService', DossierService)
  .name;