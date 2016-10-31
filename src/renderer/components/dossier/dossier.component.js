import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './dossier.template';

import Tbl from '../common/tbl/tbl.component';
import DossierService from '../../services/dossier.service';

import {} from '../../services/ghsts.service';
import {
GHSTS_NG_MODULE_NAME
} from '../../../constants/shared';

export default angular.module('dossier', [
  ngMaterial,
  GHSTS_NG_MODULE_NAME,
  Tbl
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
        navIcons: [{
          name: 'back',
          label: 'Back',
          state: 'home'
        }],
        title: this.dossier[0].DOSSIER_DESCRIPTION_TITLE,
        functionIcons: [{
          name: 'settings',
          label: 'Settings',
          state: 'settings'
        }, {
          name: 'help',
          label: 'Help'
        }]
      };

      this.submissionProjection = [
        'SUBMISSION_TITLE',
        'SUBMISSION_NUMBER',
        'ADMIN_NUMBER',
        'PACKAGE_TYPE',
        'STATUS',
        'DATE_CREATED',
        'LAST_MODIFIED'
      ];
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

    select(index) {
      this.$state.go('submission.description', {
        dossierPID: this.dossier[0].DOSSIER_PID,
        submissionNumber: this.dossier[0].SUBMISSIONS[index].SUBMISSION_NUMBER
      });
    }
  }
})
.service('DossierService', DossierService)
.name;