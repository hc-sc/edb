import AppDataService from '../../services/app.data.service';
import PicklistService from '../../services/picklist.service';

export default class BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, url) {
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.url = url;
    this.picklistService = PicklistService.getService();
    this.appDataService = AppDataService.getService();
    this.loading = true;

    this.getAppData().then(records => {
      console.log(records);
      this.records = JSON.parse(records.data);
      this.selected = this.records[0];
      console.log(this.selected);

      this.loading = false;
    });
  }

  getAppData(data = {}, url = this.url) {
    return this.appDataService.edb_get({url, data});
  }

  createAppData(data = {}, url = this.url) {
    return this.appDataService.edb_put({url});
  }

  updateAppData(data = {}, url = this.url) {}

  deleteAppData(id, url = this.url) {}

  getPicklist(typename) {
    return this.picklistService.edb_get({ 'TYPE_NAME': typename });
  }

  getGHSTS() {}



  // used to display notifications to the user
  showMessage(message) {
    this.$mdToast.show(
      this.$mdToast.simple()
      .textContent(message)
      .position('bottom')
      .hideDelay(2000)
    );
  }

  updateSelected(data) {
    this.selected = this.records.filter(record => {
      return record.id === data.id;
    })[0];
  }

  // used to compare current node to a valid or old node (for validation and/or updating metadata status)
  equals(node1, node2) {}

  // get(data = {}) {
  //   return this.AppDataService.edb_get({
  //     url: this.url,
  //     data: {}
  //   });
  // }

  // createRecord(data) { // set data with url
  //   return this.AppDataService.edb_put(data);
  // }

  // saveRecord($event) {
  //   let that = this;
  //   if (this.selectedRecord && this.selectedRecord._id) {
  //     this.AppDataService.edb_post({
  //       url: this.url,
  //       data: this.selectedRecord
  //     }).then(

  //       affectedRows => {
  //         console.log("test");
  //         that.$mdDialog.show(
  //           that.$mdDialog
  //           .alert()
  //           .clickOutsideToClose(true)
  //           .title('Success')
  //           .content('Data Updated Successfully!')
  //           .ok('Ok')
  //           .targetEvent($event)
  //         )
  //       }

  //     );
  //   } else {
  //     this.AppDataService.edb_put({
  //       url: this.url,
  //       data: this.selectedRecord
  //     }).then(affectedRows =>
  //       that.$mdDialog.show(
  //         that.$mdDialog
  //         .alert()
  //         .clickOutsideToClose(true)
  //         .title('Success')
  //         .content('Data Added Successfully!')
  //         .ok('Ok')
  //         .targetEvent($event)
  //       )
  //     );

  //     // refresh the substance list
  //     that.getRecords();
  //   }

  //   console.log("save record");
  // }
  // addRecord(name) { //factory method by entity name
  //   let record = NewFactory.getObject(name);
  //   //substance.SUBSTANCE_NAME = 'New';
  //   this.records.push(record);
  //   this.selectedRecord = record;
  //   this.selectedIndex = this.records.length - 1;
  // }
  // deleteRecord($event) {

  //   let confirm = this.$mdDialog.confirm()
  //     .title('Are you sure?')
  //     .content('Are you sure you want to delete this substance?')
  //     .ok('Yes')
  //     .cancel('No')
  //     .targetEvent($event);

  //   this.$mdDialog.show(confirm).then(() => {
  //     console.log("delete record.");
  //     // that.DossierDataService.edb_delete({ url: this.url, data: {} });
  //   });


  // }
  // updateRecord(data) {
  //   this.AppDataService.edb_post(data);
  // }
}