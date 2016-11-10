import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import Tbl from '../common/tbl/tbl.component';
import Footer from '../common/footer/footer.component';
import DossierService from '../../services/dossier.service';
import { } from '../../services/ghsts.service';
import { } from '../../services/app.data.service';
import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME,PICKLIST_NG_MODULE_NAME } from '../../../constants/shared';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  GHSTS_NG_MODULE_NAME,
  APP_DATA_NG_MODULE_NAME,
  PICKLIST_NG_MODULE_NAME,
  Toolbar,
  Tbl,
  Footer
])
.component('home', {
  template,
  bindings: {
    dossiers: '<'
  },
  controller: class HomeCtrl {
    constructor($mdDialog, $state, GhstsService, DossierService) {
      this.$mdDialog = $mdDialog;
      this.$state = $state;
      this.toolbarItems = {
        navIcons: [
          { name: 'home', label: 'Home', state: 'splash' }
        ],
        title: 'Manage Dossiers',
        functionIcons: [
          { name: 'globals', state: 'globals.legalEntities', label: 'Entities' },
          { name: 'settings', state: 'settings', label: 'Settings' },
          { name: 'help', label: 'Help', func: this.backend.bind(this) }
        ]
      };

      this.globalItems = [
        { title: 'Legal Entities', state: 'globals.legalEntities' },
        { title: 'Substances', state: 'globals.substances' },
        { title: 'Products', state: 'globals.products' },
        { title: 'Files', state: 'globals.files' },
        { title: 'Picklists', state: 'globals.picklists' }
      ];

      this.dossierProjection = [
        'DOSSIER_DESCRIPTION_TITLE',
        'DOSSIER_PID',
        'PRODUCT_NAME',
        'STATUS',
        'DATE_CREATED',
        'LAST_MODIFIED'
      ];

      this.dossier;
      this.submissions = [];
      this.submissionProjection = [
        'SUBMISSION_TITLE',
        'SUBMISSION_NUMBER',
        'ADMIN_NUMBER',
        'PACKAGE_TYPE',
        'STATUS',
        'DATE_CREATED',
        'LAST_MODIFIED'
      ];

      this.results = this.dossiers.slice();
      this.GhstsService = GhstsService.getService();
    }

    selectDossier(id, index) {
      // this.$state.go('dossier', { dossierPID: this.dossiers[index].DOSSIER_PID });
      this.dossier = this.dossiers.filter(dossier => {
        return dossier._id === id;
      })[0];
      this.submissions = this.dossier.SUBMISSIONS;
    }

    newDossier() {
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

    deleteDossier(index) {
      this.dossiers = this.dossiers.slice(0, index).concat(this.dossiers.slice(index + 1, 0));
    }

    selectSubmission(id, index) {
      this.$state.go('submission.description', {
        dossierPID: this.dossier.DOSSIER_PID,
        submissionNumber: this.submissions[index].SUBMISSION_NUMBER
      });
    }

    update(prop, value) {
      this[prop] = value;
    }

    backend() {
      console.log('for backend test');
      this.GhstsService.edb_get()
        .then(result => {
          console.log(result);
        })
        .catch(err => { 
          console.log(err);
        });
    }
  }
})
.service('DossierService', DossierService)
.name;