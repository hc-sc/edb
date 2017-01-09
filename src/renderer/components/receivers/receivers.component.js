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
      this.init()
      .then(() => {
        if (this.isSubmission) {
          return this.ghstsService.edb_get({_submissionid: this.dossierData.submissionid});
        }
        else {
          return this.appDataService.edb_get({_url: 'receiver'});
        }
      })
      .then(result => {
        console.log(result);
        if (this.isSubmission) {
          this.ghsts = JSON.parse(result.data)[0];
        }
        else {
          this.records = result.data ? JSON.parse(result.data) : [];
        }
        return this.getAppData({}, 'legalentity');
      })
      .then(legalentities => {
        this.legalEntities = JSON.parse(legalentities.data);
        return this.getAppData({}, 'sender');
      })
      .then(senders => {
        console.log(JSON.parse(senders.data));
        this.$scope.$root.loading = false;
      });
    }

    // need to override since the method depends on whether it is a submission or not
    save() {
      if (this.isSubmission) console.log('saving submission receivers to ghsts');
      else super.save();
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

    addTblItem(nodeName) {
      this.$mdDialog.show(this.buildModal(nodeName, this.selected.length, true))
      .then(item => {
        console.log(item);
      });
    }

    delete() {
      console.log('deleting this receiver, make sure it isn\'t the receiver from the product');
    }
  }
})
.name;