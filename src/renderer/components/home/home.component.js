import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import DossierService from '../../services/dossier.service';

import * as SHARED_CONST from '../../../constants/shared';
import {} from '../../services/ghsts.service';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  SHARED_CONST.GHSTS_NG_MODULE_NAME,
  Toolbar
])
  .component('home', {
    template,
    bindings: {
      dossiers: '<'
    },
    controller: class HomeCtrl {
      constructor($mdDialog, $state, GhstsService) {
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.toolbarItems = {
          navIcons: [],
          title: 'eDossier Builder',
          functionIcons: [
            { name: 'add', label: 'New Dossier', func: this.createDossier.bind(this) },
            { name: 'settings', state: 'settings', label: 'Settings' },
            { name: 'help', label: 'Help' }
          ]
        };

        this.selected = [];
        this.query = {
          orderBy: 'name',
          order: 'asc',
          filter: '',
          limit: 1,
          page: 1
        };
        this.results = this.dossiers.slice();
        this.GhstsService = GhstsService.getService();
      }

      /**
       * queries the db to return the matching query params
       */
      getDossiers() {
        this.results = this.results.slice();
      }

      createDossier() {
        let prompt = this.$mdDialog.prompt()
          .title('New Product')
          .textContent('Enter the short name of the product, typically the name of the product. This cannot be changed after creation')
          .placeholder('Name')
          .ariaLabel('New Project Dialog')
          .ok('Okay')
          .cancel('Cancel');

        this.$mdDialog.show(prompt)
          .then(name => {
            let nameAry = name.split('/');
            this.GhstsService.edb_put({ productShortName: nameAry[0], dossierShortName: nameAry[1] })
              .then(result => {
                console.log(result);
                this.$state.go('submission.substances', { });
              })
              .catch(err => {
                console.log(err);
              });
          });
      }

      trigger(index) {
        this.$state.go('dossier', { dossierPID: this.results[index].DOSSIER_PID });
      }
    }
  })
  .service('DossierService', DossierService)
  .name;