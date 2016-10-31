import angular from 'angular';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import template from './description.template';
import dossierRATemplate from './dossier-ra.template';
import referencedDossierTemplate from './referenced-dossier.template';

import TextInput from '../common/text-input/text-input.component';
import Icon from '../common/icon/icon.component';
import Tbl from '../common/tbl/tbl.component';

export default angular.module('description', [
  ngMaterial,
  TextInput,
  Icon,
  Tbl
])
.component('description', {
  template,
  bindings: {
    submission: '<'
  },
  controller: class DescriptionCtrl {
    constructor($mdDialog, $state, $rootScope) {
      this.$state = $state;
      this.$mdDialog = $mdDialog;

      this.dossierRAProjection = [
        'REGULATORY_TYPE',
        'APPLICATION_TYPE',
        'PROJECT_ID_NUMBER'
      ];

      this.referencedDossierProjection = [
        'REFERENCED_DOSSIER_REASON',
        'REFERENCED_DOSSIER_NUMBER'
      ];
      this.submissionProjection = [
        'SUBMISSION_TITLE',
        'SUBMISSION_NUMBER',
        'SUBMISSION_VERSION_DATE',
        'INCREMENTAL'
      ];

      this.markDeletable();

    }

    update(prop, value) {
      this.submission[prop] = value;
    }

    /** set up business rules as to which items are deletable */
    markDeletable() {
      for (let dossierRA of this.submission.DOSSIER_RA) {
        dossierRA.deletable = true;
      }
    }

    delete(nodeName, index) {
      this.submission[nodeName].splice(index, 1);
    }

    select(nodeName, index) {
      if (nodeName === 'DOSSIER_RA') {
        this.$mdDialog.show({
          template: dossierRATemplate,
          controllerAs: '$ctrl',
          controller: DossierRACtrl
        });
      }
      else if (nodeName === 'REFERENCED_DOSSIER') {
        this.$mdDialog.show({
          template: referencedDossierTemplate,
          controllerAs: '$ctrl',
          controller: ReferencedDossierCtrl
        });
      }
      else if (nodeName === 'SUBMISSION') {
      }
    }

    // $onDestroy() {
    //   console.log(this);
    //   // this is where we save the data to the db
    // }
  }
})
.name;

class ReferencedDossierCtrl {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
    console.log(this);
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}

class DossierRACtrl {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}
