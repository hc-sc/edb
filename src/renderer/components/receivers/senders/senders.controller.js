export default class ContactPersonCtrl {
  constructor($mdDialog, node, AppDataService) {
    this.$mdDialog = $mdDialog;
    this.node = node;
    this.appDataService = AppDataService.getService();
    console.log(this);
    this.appDataService.edb_get({url: 'legalentity', data: {}})
    .then(response => {
      this.legalentities = JSON.parse(response.data);
    });
  }

  confirm() {
    this.$mdDialog.hide(this.node);
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  update(prop, value) {
    this.node[prop] = value;
  }
}