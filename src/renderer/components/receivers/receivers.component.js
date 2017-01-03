import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

import TextInput from '../common/text-input/text-input.component';
import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import BaseCtrl from '../common/base.controller';

export default angular.module('receiver', [
  ngMaterial,
  TextInput,
  Tbl,
  SelectInput
])
.component('receiver', {
  template,
  bindings: {
    dossierData: '<',
    isSubmission: '<'
  },
  controller: class ReceiversCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'receiver', $scope);
      this.ghstsService = GhstsService.getService();
      console.log(this.dossierData);
      this.init()
      .then(() => {
        return this.ghstsService.edb_get({_submissionid: this.dossierData.submissionid});
      })
      .then(ghsts => {
        console.log(ghsts);
        this.ghsts = JSON.parse(ghsts.data)[0];
        return GhstsService.getService().edb_get({_url: 'receiver'});
      })
      .then(receivers => {
        console.log(receivers);
        this.records = receivers.data ? JSON.parse(receivers.data) : [];
      //   return this.getAppData({}, 'legalentity');
      // })
      // .then(legalentities => {
      //   this.legalEntities = JSON.parse(legalentities.data);
        this.$scope.$root.loading = false;
      });
    }

    // need to override since the method depends on whether it is a submission or not
    save() {
      if (this.isSubmission) console.log('saving submission receivers to ghsts');
      else console.log('saving to global receivers');
    }

    add() {
      if (this.isSubmission) {
        console.log('adding new receiver');
        this.$mdDialog.show({
        }).then(result => {
          console.log(result);
        });
      }
      else console.log('need to select a new receiver from the list of global receivers, and then add senders to it');
    }

    delete() {
      console.log('deleting this receiver, make sure it isn\'t the receiver from the product');
    }
  }
})
.name;