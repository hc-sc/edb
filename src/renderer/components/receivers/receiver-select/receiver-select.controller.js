export default class ReceiverSelectCtrl {
  constructor($mdDialog, appDataService) {
    this.$mdDialog = $mdDialog;
    this.receiver = undefined;
    appDataService.edb_get({_url: 'receiver'})
    .then(ret => {
      this.receivers = JSON.parse(ret.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  confirm() {
    this.$mdDialog.hide(this);
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  update(prop, value) {
    console.log('here', prop, value);
    this[prop] = value;
  }
}