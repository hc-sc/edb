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
    constructor($mdDialog, $state) {
      this.$state = $state;
      this.$mdDialog = $mdDialog;

      this.dossierRAProjection = [
        'REGULATORY_TYPE',
        'APPLICATION_TYPE',
        'PROJECT_ID_NUMBER'
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

      // for (let referencedDossier of this.submission.REFERENCED_DOSSIER) {
      //   referencedDossier.deletable = true;
      // }
    }

    delete(nodeName, index) {
      this.submission[nodeName].splice(index, 1);
    }

    select(nodeName, index) {
      this.$mdDialog.show(
        (nodeName === 'DOSSIER_RA') ? dossierRA : referencedDossier
      )
      .then(answer => {

      });
    }
  }
})
.name;

const dossierRA = {
  template: dossierRATemplate,
  controllerAs: '$ctrl',
  controller: DossierRACtrl
};

const referencedDossier = {
  template: referencedDossierTemplate,
  controllerAs: '$ctrl',
  controller: ReferencedDossierCtrl
};

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
    console.log(this);
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}
