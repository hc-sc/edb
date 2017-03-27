export default class TocDocumentCtrl {
  constructor($mdDialog, items, node, $scope, GhstsService) {
    this.$mdDialog = $mdDialog;
    this.items = items;
    this.$scope = $scope;
    this.node = node;
    this.ghstsService = GhstsService.getService();
    this.document;
    this.title = 'Select Document';
  }

  update(prop, value) {
    this[prop] = value;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    let document, toc2docObj = { url: 'toc', data: { tocnodepid: this.node.tocnodepid } };
    for (let i = 0; i < this.items.length; ++i) {
      if (this.items[i]._id === this.document) {
        toc2docObj.data.docid = this.items[i]._id;
        document = {
          _id: this.items[i]._id,
          documenttitle: this.items[i].documentgeneric.documenttitle
        };
        break;
      }
    }
    this.ghstsService.edb_put(toc2docObj).then(ret => {
      console.log(ret);
    });
    this.$mdDialog.hide({ document });
  }
}