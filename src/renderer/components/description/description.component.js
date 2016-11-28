import angular from 'angular';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import template from './description.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Icon from '../common/icon/icon.component';
import Tbl from '../common/tbl/tbl.component';

import BaseCtrl from '../common/base.controller';

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
      dossierData: '<'
    },
    controller: class DescriptionCtrl extends BaseCtrl {
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, $rootScope) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'dossier');
        this.$rootScope = $rootScope;

        this.getAppData({_id: this.dossierData.submissionid}, 'submission')
        .then(result => {
          this.submission = JSON.parse(result.data)[0];
          return this.getAppData({_id: this.dossierData.dossierid}, 'dossier');
        })
        .then(result => {
          this.dossier = JSON.parse(result.data)[0];

          // have two references, so we can still use the base ctrl code
          this.selected = this.dossier;
          this.loading = false;
        });
      }

      // need to have one for submission and another for dossier
      update(prop, value) {
        if (prop === 'dossierdescriptiontitle') {
          this.$rootScope.title = value;
        }
        this.selected[prop] = value;
      }

      /** set up business rules as to which items are deletable */
      markDeletable() {
        for (let dossierra of this.dossier.dossierra) {
          dossierra.deletable = true;
        }
      }
    }
  })
  .name;