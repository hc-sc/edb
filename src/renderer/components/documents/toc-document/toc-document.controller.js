export default class TocDocumentCtrl {
  constructor($mdDialog, items, $scope) {
    this.$mdDialog = $mdDialog;
    this.items = items;
    this.$scope = $scope;
    this.document;
    this.documentra;
    this.documentras;
    console.log(this);
  }

  update(prop, value) {
    console.log(prop, value);
    if (prop === 'document') {
      this[prop] = value;
      this.getDocumentRAs();

    }
    else this[prop] = value;
  }

  getDocumentRAs() {
    this.items.forEach(item => {
      if (item._id === this.document) {
        this.documentras = item.documentra;
      }
    });
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide({
      document: this.document,
      documentra: this.documentra
    });
  }
}