import angular from 'angular';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import template from './description.template';
import dossierraTemplate from './dossier-ra.template';
import referencedDossierTemplate from './referenced-dossier.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Icon from '../common/icon/icon.component';
import Tbl from '../common/tbl/tbl.component';

export default angular.module('description', [
  ngMaterial,
  TextInput,
  SelectInput,
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

      this.dossierraProjection = [
        'REGULATORY_TYPE',
        'APPLICATION_TYPE',
        'PROJECT_ID_NUMBER'
      ];

      this.referencedDossierProjection = [
        'referenceddossier_REASON',
        'referenceddossier_NUMBER'
      ];

      this.markDeletable();
      this.incremental = true;
    }

    update(prop, value) {
      this.submission[prop] = value;
    }

    /** set up business rules as to which items are deletable */
    markDeletable() {
      for (let dossierra of this.submission.dossierra) {
        dossierra.deletable = true;
      }
    }

    delete(nodeName, index) {
      this.submission[nodeName].splice(index, 1);
    }

    select(nodeName, index) {
      //get object by name to remove if/else, add diagram object map
      if (nodeName === 'dossierra') {
        this.$mdDialog.show({
          template: dossierraTemplate,
          controllerAs: '$ctrl',
          controller: dossierraCtrl,
          locals: {
            index,
            dossierra: this.submission.dossierra[index]
          }
        })
        .then(item => {
          this.submission.dossierra[index] = item;
          // angular doesn't trigger update if just one element is updated, need to change the object itself
          this.submission.dossierra = this.submission.dossierra.slice();
        }, item => {
          console.log('cancelled ', item);
        });
      }
      else if (nodeName === 'referenceddossier') {
        this.$mdDialog.show({
          template: referencedDossierTemplate,
          controllerAs: '$ctrl',
          controller: ReferencedDossierCtrl,
          locals: {
            index,
            referencedDossier: this.submission.referenceddossier[index]
          }
        })
        .then(item => {
          this.submission.referenceddossier[index] = item;
          // angular doesn't trigger update if just one element is updated, need to change the object itself
          this.submission.referenceddossier = this.submission.referenceddossier.slice();
        }, item => {
          console.log('cancelled ', item);
        });
      }
    }
  }
})
.name;

class dossierraCtrl {
  constructor(index, dossierra, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.dossierra = this.clone(dossierra);
    this.index = index;
  }

  // this will need to be upgrades for nested objects
  clone(object) {
    let newObj = {};
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        newObj[prop] = object[prop];
      }
    }
    return newObj;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.dossierra);
  }

  update(prop, value) {
    this.dossierra[prop] = value;
  }
}

class ReferencedDossierCtrl {
  constructor(index, referencedDossier, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.referencedDossier = this.clone(referencedDossier);
    this.index = index;
  }

  clone(object) {
    let newObj = {};
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        newObj[prop] = object[prop];
      }
    }
    return newObj;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.referencedDossier);
  }

  update(prop, value) {
    this.referencedDossier[prop] = value;
  }
}
