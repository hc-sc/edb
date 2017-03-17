import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './receivers.template';

import TextInput from '../common/text-input/text-input.component';
import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import BaseCtrl from '../common/base.controller';

import receiverSelect from './receiver-select/receiver-select.template';
import ReceiverSelectCtrl from './receiver-select/receiver-select.controller';
import senderSelect from './senders/senders.template';
import SenderSelectCtrl from './senders/senders.controller';
import _ from 'lodash';

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
      constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'receiver', $scope, GhstsService, $transitions);
        this.senders = [];
        this.records = [];

        Promise.all([
          // get legal entities
          this.getAppData({}, 'legalentity')
            .then(legalEntities => {
              this.legalEntities = JSON.parse(legalEntities.data);
              let raId = this.picklistService.edb_getSync({ value: 'Regulatory Authority' })[0]._id;
              this.legalEntities = this.legalEntities.filter((el) =>
                el.legalentitytype && (el.legalentitytype.toLowerCase() === raId)
              );
            }),

          // get app receivers OR submission receivers and senders
          Promise.resolve().then(() => {
            if (this.isSubmission) {
              return this.ghstsService.edb_get({ _submissionid: this.dossierData.submissionid })
                .then(ghsts => {
                  this.ghsts = JSON.parse(ghsts.data)[0];
                  let ids = [];
                  if (this.ghsts._receiver && this.ghsts._receiver.length > 0) {
                    ids = this.ghsts._receiver.map(item => {
                      return item.receiver;
                    });
                  }
                  if (ids.length > 0) return this.appDataService.edb_get({ _url: '/receiver', data: { where: ids } });
                  else return Promise.resolve([]);
                })
                .then(receivers => {
                  this.records = Array.isArray(receivers) ? receivers : JSON.parse(receivers.data);
                  if (this.records.length > 0) {
                    this.sortData();
                    this.resetSelected(this.records[0]._id);
                    this.selectReceiver(this.records[0]._id, 0);
                  } else {
                    this.oriSelected = JSON.stringify(this.ghsts._receiver);
                  }
                });
            }
            else {
              return this.init();
            }
          })
        ])
          .then(() => {
            console.log('finished');
            this.$scope.$root.loading = false;
            this.$scope.$apply();
          });
      }

      // need to override since the method depends on whether it is a submission or not
      save() {
        if (this.isSubmission) {
          this.ghstsService.edb_post(angular.copy(this.ghsts))
            .then(result => {
              console.log(result);
              this.ghsts = JSON.parse(result.data);
              if (this.records.length > 0) {
                this.sortData();
                this.resetSelected(this.selected._id);
                this.selectReceiver(this.selected._id, this.selectedIndex);
              } else {
                this.oriSelected = JSON.stringify(this.ghsts._receiver);
              }
              this.showMessage('Saved successfully.');
            })
            .catch(err => {
              this.showMessage(err);
            });
        }
        else super.save();
      }

      newReceiver() {
        super.add('receiver');
      }

      selectSender(index) {
        let sender;
        this.$mdDialog.show({
          template: senderSelect,
          controller: SenderSelectCtrl,
          controllerAs: '$ctrl',
          locals: {
            node: this.senders[index]
          }
        })
          .then(item => {
            sender = item;
            this.senders[index] = this.appDataService.edb_getSync({ _url: 'sender', data: { _id: item._id } })[0];
            this.senders = this.senders.slice();
          });
      }

      addSender() {
        let sender = {};
        let isExitInView = [];
        this.$mdDialog.show({
          template: senderSelect,
          controller: SenderSelectCtrl,
          controllerAs: '$ctrl',
          locals: {
            node: angular.copy(this.modelService.getModel('sender'))
          }
        })
          .then(item => {
            for (var i = 0; i < this.senders.length; i++) {
              if (this.senders[i]._id === item._id) {
                isExitInView.push(item);
                break;
              }
            }
            if (isExitInView.length === 0) {
              sender = this.appDataService.edb_getSync({ _url: 'sender', data: { _id: item._id } })[0];
              this.senders = this.senders.concat(sender);
              this.updateGhstsReceiver();
            } else 
              this.showMessage('Duplicate item.');
          })
          .catch(err => console.error(err));
      }

      // MAKE SURE IT'S ACTUALLY DELETED IN THE DB
      deleteSender(index) {
        this.senders = [...this.senders.slice(0, index), ...this.senders.slice(index + 1)];
        this.updateGhstsReceiver();
      }

      selectReceiver(id, index) {
        this.selected = this.records[index];
        let receiver = this.ghsts._receiver.filter(item => {
          return item.receiver === this.selected._id;
        });
        this.appDataService.edb_get({ _url: 'sender', data: { where: receiver[0]['sender'] } })
          .then(res => {
            this.senders = JSON.parse(res.data);
          });
      }

      addReceiver() {
        let receiver = {};
        let isExitInView = [];
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
            for (var i = 0; i < this.records.length; i++) {
              if (this.records[i]._id === item.receiver) {
                isExitInView.push(item);
                break;
              }
            }
            if (isExitInView.length === 0) {
              receiver = this.appDataService.edb_getSync({ _url: 'receiver', data: { _id: item.receiver } })[0];
              this.ghsts._receiver.push({receiver: item.receiver, sender: []});
              this.records = this.records.concat(receiver);
              this.senders = [];
            } else 
              this.showMessage('Duplicate item.');
          })
          .catch(err => console.log(err));
      }

      deleteReceiver(id, index) {
        this.ghsts._receiver = this.ghsts._receiver.filter(item => {
          return item.receiver !== this.records[index]._id;
        });
        this.records = [...this.records.slice(0, index), ...this.records.slice(index + 1)];
        if (this.records.length > 0) {
          this.sortData();
          this.resetSelected(this.records[0]._id);
          this.selectReceiver(this.records[0]._id, 0);
        } else {
          this.selectedIndex = -1;
          this.selected = undefined;
          this.oriSelected = undefined;
          this.senders = [];
        }
      }

      updateGhstsReceiver() {
        let senderIds = this.senders.map(senderitem => {
          return senderitem._id;
        });
        for (var i = 0; i < this.ghsts._receiver.length; i++) {
          let item = this.ghsts._receiver[i];
          if (item.receiver === this.selected._id) {
            item.sender = senderIds;
            break;
          }
        }
      }

      dirtCheck() {
        if (this.isSubmission)
          return super.dirtCheck(this.oriSelected, JSON.stringify(this.ghsts._receiver));
        else
          return super.dirtCheck();
      }

      resetSelected(id) {
        super.resetSelected(id);
        if (this.isSubmission)
          this.oriSelected = JSON.stringify(this.ghsts._receiver);
      }
    }
  })
  .name;