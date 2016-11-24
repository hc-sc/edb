export default class ModalBaseCtrl {
  constructor($mdDialog, index, node) {
    this.$mdDialog = $mdDialog;
    this.index = index;
    this.node = node;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.modal);
  }

  update(prop, value) {
    this.node[prop] = value;
  }
}