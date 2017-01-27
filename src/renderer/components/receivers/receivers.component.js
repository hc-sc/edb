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
        }),

        // get app receivers OR submission receivers and senders
        Promise.resolve().then(() => {
          if (this.isSubmission) {
            return this.ghstsService.edb_get({_submissionid: this.dossierData.submissionid})
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
              if (ids.length > 0) return this.appDataService.edb_get({_url: '/receiver', data: { where: ids} });
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
      if (this.isSubmission) console.log('saving submission receivers to ghsts');
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
        return this.appDataService.edb_post({_url: 'sender', data: item});
      })
      .then(res => {
        this.senders[index] = sender;
        this.senders = this.senders.slice();
      });
    }

    addSender() {
      let sender = {};
      let isSenderExit = [], isExitInView = [];
      this.$mdDialog.show({
        template: senderSelect,
        controller: SenderSelectCtrl,
        controllerAs: '$ctrl',
        locals: {
          node: angular.copy(this.modelService.getModel('sender'))
        }
      })
      .then(item => {
        for(var i = 0; i < this.senders.length; i++) {
          if ((this.senders[i].toLegalEntityId === item.toLegalEntityId) &&
              (this.senders[i].companycontactregulatoryrole === item.companycontactregulatoryrole) &&
              (this.senders[i].remark === item.remark)) {
                isExitInView.push(item);
                break;
              }
        }
        if (isExitInView.length > 0) {
          return Promise.resolve({data: JSON.stringify(isExitInView[0])});
        } else {
          isSenderExit = this.appDataService.edb_getSync({_url: 'sender', data: item});
          if (isSenderExit.length > 0)
            return Promise.resolve({data: JSON.stringify(isSenderExit[0])});
          else
            return this.appDataService.edb_put({_url: 'sender', data: item}); 
        }
      })
      .then(ret => {
        if (isExitInView.length > 0) {
          sender = ret;
          return Promise.resolve(ret);
        }
        else {
          sender = JSON.parse(ret.data);
          return this.ghstsService.edb_put({url: `/receiver/${this.selected._id}/sender/${sender._id}`, data: {sender}});
        }
      })
      .then(res => {
        if (isExitInView.length === 0) {
          this.ghsts = res.data;
          this.senders = this.senders.concat(sender);
        }
      })
      .catch(err => console.error(err));
    }

    // MAKE SURE IT'S ACTUALLY DELETED IN THE DB
    deleteSender(index) {
      this.ghstsService.edb_delete({url: `/receiver/${this.selected._id}/sender/${this.senders[index]._id}`})
      .then(ret => {
        console.log(ret);
        this.ghsts = ret.data;
        this.senders = [...this.senders.slice(0, index), ...this.senders.slice(index +1)];
      });
    }

    selectReceiver(id, index) {
      this.selected = this.records[index];
      let receiver = this.ghsts._receiver.filter(item => {
        return item.receiver === this.selected._id;
      });
      this.appDataService.edb_get({_url: 'sender', data: {where: receiver[0]['sender']}})
      .then(res => {
        this.senders = JSON.parse(res.data);
      });
    }

    addReceiver() {
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
        return this.ghstsService.edb_put({url: `/receiver/${item.receiver}`});
      })
      .then(response => {
        console.log(response);
        this.ghsts = response.data;
        let ids = this.ghsts._receiver.map(item => {
          return item.receiver;
        });
        console.log(ids);
        return this.appDataService.edb_get({ _url: '/receiver', data: { where: ids } });
      })
      .then(result => {
        console.log(result);
        this.records = JSON.parse(result.data);
        this.sender = [];
      })
      .catch(err => console.log(err));
    }

    deleteReceiver(id, index) {
      this.ghstsService.edb_delete({url: `/receiver/${id}`})
      .then(ret => {
        console.log(ret);
        this.ghsts = ret.data;
        this.records = [...this.records.slice(0, index), ...this.records.slice(index +1)];
        this.sender = [];
        this.selected = undefined;
      }) 
      .catch(err => console.log(err));
    }
  }
})
.name;