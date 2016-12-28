export default class TocDocumentCtrl {
  constructor($mdDialog, items, $scope) {
    this.$mdDialog = $mdDialog;
    this.items = items;
    this.$scope = $scope;
    this.document;
    console.log(this);
  }

  update(prop, value) {
    this[prop] = value;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    let document;
    for (let i = 0; i < this.items.length; ++i) {
      if (this.items[i]._id === this.document) {
        document = {
          _id: this.items[i]._id,
          documenttitle: this.items[i].documentgeneric.documenttitle
        }
        break;
      }
    }
    console.log(document);
    this.$mdDialog.hide({document});
  }
}