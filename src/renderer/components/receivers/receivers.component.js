import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

import TextInput from '../common/text-input/text-input.component';
import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import BaseCtrl from '../common/base.controller';

import receiverSelect from './receiver-select/receiver-select.template';
import ReceiverSelectCtrl from './receiver-select/receiver-select.controller';

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
      this.senders = [];
      this.records = [];
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
        return this.ghstsService.edb_get({}, 'sender');
      })
      .then(senders => {
        this.$scope.$root.loading = false;
      });
    }

    // need to override since the method depends on whether it is a submission or not
    save() {
      if (this.isSubmission) console.log('saving submission receivers to ghsts');
      else super.save();
    }

    add() {
      console.log('need to select a new receiver from the list of global receivers, and then add senders to it');
    }

    addSender(nodeName) {
      this.$mdDialog.show({
        template: receiverSelect,
        controller: ReceiverSelectCtrl,
        controllerAs: '$ctrl',
        locals: {
          appDataService: this.appDataService
        }
      })
      .then(item => {
        console.log(item);
        this.appDataService.edb_put({_url:'sender', data: item})
        .then(ret => {
          console.log(ret)
          this.ghstsService.edb_put({url: `/receiver/${this.selected._id}/sender/${JSON.parse(ret.data)[0]._id}`})
        });
      });
    }

    delete() {
      console.log('deleting this receiver, make sure it isn\'t the receiver from the product');
    }

    selectReceiver(id, index) {
      this.selected = this.records[index];

    }

    newReceiver() {
      // select receiver from globals
      this.$mdDialog.show({
        template: receiverSelect,
        controller: ReceiverSelectCtrl,
        controllerAs: '$ctrl',
        locals: {
          appDataService: this.appDataService
        }
      })
      .then(item => {
        // make sure it's not one already in the list

        return this.ghstsService.edb_put({url: `/receiver/${item.receiver}`});
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
    }

    deleteReceiver(id) {
      console.log('NEED TO CHECK IF WE ARE DELETING THE ONES FROM THE PRODUCT!');
      console.log(id);
    }
  }
})
.name;