export default class ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope) {
    this.$mdDialog = $mdDialog;
    this.index = index;
    this.node = node;
    this.picklists = picklists;
    this.picklistService = picklistService;
    this.$scope = $scope;
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
    return this.picklistService.edb_put(value)
    .then(result => {
      let item = JSON.parse(result.data);
      this.picklists[arr].push(item);

      // need to allow the select component to update BEFORE assigning a new selected
      // in the future, have the select component use lifecycle methods to return when it is finished
      setTimeout(() => {
        this.node[prop] = item._id;
        this.$scope.$apply();
      }, 200);
    })
    .catch(err => {
      console.log('Error creating new picklist item');
    });
  }
}