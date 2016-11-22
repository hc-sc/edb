export default class IdentifierCtrl {
  constructor(index, identifer, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.identifer = this.clone(identifer);
    this.index = index;
  }

  // this will need to be upgrades for nested objects
  clone(object) {
    let newObj = {};
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        newObj[prop] = object[prop];
      }
    }
    return newObj;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.identifer);
  }

  update(prop, value) {
    this.identifer[prop] = value;
  }
}