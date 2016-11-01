import angular from 'angular';
import ngMaterial from 'angular-material';
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
    constructor($scope, $mdDialog, $state) {
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

      this.markDeletable();
      this.incremental = true;
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
          controller: DossierRACtrl,
          locals: {
            index,
            dossierRA: this.submission.DOSSIER_RA[index],
            descriptionCtrl: this
          }
        })
        .then(item => {
          console.log('okayed ', item === this.submission.DOSSIER_RA[index]);
        }, item => {
          console.log('cancelled ', item);
        });
      }
      else if (nodeName === 'REFERENCED_DOSSIER') {
        this.$mdDialog.show({
          template: referencedDossierTemplate,
          controllerAs: '$ctrl',
          controller: ReferencedDossierCtrl
        });
      }
    }
  }
})
.name;

class DossierRACtrl {
  constructor(index, dossierRA, descriptionCtrl, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.dossierRA = Object.assign(dossierRA);
    this.index = index;
    this.descriptionCtrl = descriptionCtrl;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.dossierRA);
  }
}

class ReferencedDossierCtrl {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
    console.log(arguments);
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}