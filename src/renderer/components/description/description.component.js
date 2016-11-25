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
      submission: '<',
      dossier: '<'
    },
    controller: class DescriptionCtrl {
      constructor($mdDialog, $state, $stateParams, AppDataService) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;

        this.loading = true;
        this.AppDataService = AppDataService.getService();

        this.AppDataService
          .edb_get({ url: 'submission', data: { _id: $stateParams.submissionid } })
          .then(ret => {
            this.submission = JSON.parse(ret.data)[0];
            return this.AppDataService.edb_get({ url: 'dossier', data: { _id: $stateParams.dossierid } });
          })
          .then(ret => {
            this.dossier = JSON.parse(ret.data)[0];
            // this.markDeletable();
            this.toolbarItems.title = this.dossier.dossierdescriptiontitle;
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });

        this.dossierraProjection = [
          'regulatorytype',
          'applicationtype',
          'projectidnumber'
        ];

        this.referencedDossierProjection = [
          'referenceddossierreason',
          'referenceddossiernumber'
        ];

      }

      update(prop, value) {
        this.submission[prop] = value;
      }

      /** set up business rules as to which items are deletable */
      markDeletable() {
        for (let dossierra of this.dossier.dossierra) {
          dossierra.deletable = true;
        }
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
              dossierra: this.dossier.dossierra[index]
            }
          })
            .then(item => {
              this.dossier.dossierra[index] = item;
              // angular doesn't trigger update if just one element is updated, need to change the object itself
              this.dossier.dossierra = this.dossier.dossierra.slice();
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
              referencedDossier: this.dossior.referenceddossier[index]
            }
          })
            .then(item => {
              this.dossior.referenceddossier[index] = item;
              // angular doesn't trigger update if just one element is updated, need to change the object itself
              this.dossior.referenceddossier = this.dossior.referenceddossier.slice();
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
