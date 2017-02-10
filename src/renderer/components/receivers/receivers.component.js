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
        super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'receiver', $scope, GhstsService);
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
                  console.log(ghsts);
                  this.ghsts = JSON.parse(ghsts.data)[0];
                  let ids = [];
                  if (this.ghsts._receiver && this.ghsts._receiver.length > 0) {
                    ids = this.ghsts._receiver.map(item => {
                      return item.receiver;
                    });
                  }
                  console.log(ids);
                  if (ids.length > 0) return this.appDataService.edb_get({ _url: '/receiver', data: { where: ids } });
                  else return Promise.resolve([]);
                })
                .then(receivers => {
                  this.records = Array.isArray(receivers) ? receivers : JSON.parse(receivers.data);
                  console.log(this.records);
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


        // this.init()
        // .then(() => {
        //   if (this.isSubmission) {
        //     return this.ghstsService.edb_get({_submissionid: this.dossierData.submissionid});
        //   }
        //   else {
        //     return this.appDataService.edb_get({_url: 'receiver'});
        //   }
        // })
        // .then(result => {
        //   if (this.isSubmission) {
        //     this.ghsts = JSON.parse(result.data)[0];
        //     let ids = this.ghsts._receivers.map(item => {
        //       return item.receiver;
        //     });
        //     let aaa =  this.appDataService.edb_getSync({_url: '/receiver', data: ids}); // this.records = this.ghsts._receivers;
        //     console.log(aaa);
        //     return this.getAppData({}, 'legalentity');
        //   }
        //   else {
        //     this.records = result.data ? JSON.parse(result.data) : [];
        //     return this.getAppData({}, 'legalentity');
        //   }
        // })
        // .then(legalentities => {
        //   console.log(legalentities);

        //   this.legalEntities = JSON.parse(legalentities.data);
        //   return this.ghstsService.edb_get({}, 'sender');
        // })
        // .then(senders => {
        //   this.$scope.$root.loading = false;
        // });
      }

      // need to override since the method depends on whether it is a submission or not
      save() {
        if (this.isSubmission) {
          this.ghstsService.edb_post(angular.copy(this.ghsts))
            .then(result => {
              console.log(result);
              this.ghsts = JSON.parse(result.data);
              this.showMessage('Saved successfully');
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
            }
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
              this.sender = [];
            }
          })
          .catch(err => console.log(err));
      }

      deleteReceiver(id, index) {
        this.ghsts._receiver = [...this.ghsts._receiver.slice(0, index), ...this.ghsts._receiver.slice(index + 1)];
        this.records = [...this.records.slice(0, index), ...this.records.slice(index + 1)];
        this.sender = [];
        this.selected = undefined;
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
    }
  })
  .name;