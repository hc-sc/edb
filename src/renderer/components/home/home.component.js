import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import Tbl from '../common/tbl/tbl.component';
import DossierService from '../../services/dossier.service';

import * as SHARED_CONST from '../../../constants/shared';
import {} from '../../services/ghsts.service';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  SHARED_CONST.GHSTS_NG_MODULE_NAME,
  Toolbar,
  Tbl
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
          { name: 'settings', state: 'settings', label: 'Settings' },
          { name: 'help', label: 'Help' }
        ]
      };

      this.dossierProjection = [
        'DOSSIER_DESCRIPTION_TITLE',
        'DOSSIER_PID',
        'PRODUCT_NAME',
        'STATUS',
        'DATE_CREATED',
        'LAST_MODIFIED'
      ];

      this.GhstsService = GhstsService.getService();
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
          this.GhstsService.edb_put({ productShortName: nameAry[0], dossierShortName: nameAry[1] }).then(result => {
            console.log(result);
            this.$state.go('submission.description', { dossierPID: 43243, submissionNumber: 1 });
          }).catch(err => {
            console.log(err);
          });
        });
    }

    select(index) {
      this.$state.go('dossier', { dossierPID: this.dossiers[index].DOSSIER_PID });
    }

    add() {
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
          this.GhstsService.edb_put({ productShortName: nameAry[0], dossierShortName: nameAry[1] }).then(result => {
            console.log(result);
            this.$state.go('submission.description', { dossierPID: 43243, submissionNumber: 1 });
          }).catch(err => {
            console.log(err);
          });
        });
    }

    delete(index) {
      this.dossiers = this.dossiers.slice(0, index).concat(this.dossiers.slice(index + 1, 0));
    }

    update(prop, value) {
      this[prop] = value;
    }
  }
})
.service('DossierService', DossierService)
.name;