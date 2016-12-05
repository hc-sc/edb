export default class ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService) {
    this.$mdDialog = $mdDialog;
    this.index = index;
    this.node = node;
    this.picklistService = picklistService;
    console.log(picklistService);
    console.log(this.picklistService);
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide(this.node);
  }

  update(prop, value) {
    this.node[prop] = value;
  }

  // generates a picklist item.
  // prop - the node your changing
  // arr - the array of picklist items used to population the select field
  // value - the new picklist value
  createPicklistItem(prop, arr, value) {
    console.log(prop, arr, value);
    return this.picklistService.edb_put(value)
    .then(result => {
      let item = JSON.parse(result.data);
      this[arr].push(item);

      // need to allow the select component to update BEFORE assigning a new selected
      // in the future, have the select component use lifecycle methods to return when it is finished
      setTimeout(() => {
        this.selected[prop] = item._id;
      }, 200);

      this.showMessage(value.valuedecode + ' added successfully!');
    })
    .catch(err => {
      this.showMessage('Error creating new picklist item');
    });
  }
}