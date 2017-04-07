import angular from 'angular';
import template from './tree.template';

import tocDocumentTemplate from '../../documents/toc-document/toc-document.template';
import TocDocumentCtrl from '../../documents/toc-document/toc-document.controller';

import Icon from '../icon/icon.component';

export default angular.module('tree', [
  Icon
])
.component('tree', {
  template,
  bindings: {
    node: '<',
    items: '<'
  },
  controller: class TreeCtrl {
    constructor($mdDialog, $mdToast, GhstsService) {
      // Tree Structure
      // nodename - name of node
      // nodeheading - annotation
      // logicaldeleted - whether or not there can be toc2doc nodes
      // emptynode - flag for if it's a leaf
      // toc2doc - the documents related to this node
      // tocnode - subnodes for this node
      this.$mdDialog = $mdDialog;
      this.$mdToast = $mdToast;
      this.expandIcon = {name: 'down', color: 'dark', label: 'Expand'};
      this.collapseIcon = {name: 'right', color: 'dark', label: 'Collapse'};
      this.addIcon = {name: 'add', color: 'dark', label: 'Add Document'};
      this.documentIcon = {name: 'description', color: 'dark', label: 'Document'};
      this.deleteIcon = {name: 'delete', color: 'dark', label: 'Delete Document'};
      this.isHidden = true;
      this.ghstsService = GhstsService.getService();
    }

    toggleHidden() {
      this.isHidden = !this.isHidden;
    }

    canExpand() {
      return this.node && ((this.node.toc2doc && this.node.toc2doc.length > 0) || (this.node.tocnode && this.node.tocnode.length > 0));
    }

    expandAll() {
      this.isHidden = false;
      if (this.tocnode) this.tocnode.forEach(node => node.expandAll());
    }

    collapseAll() {
      this.isHidden = true;
      if (this.tocnode) this.tocnode.forEach(node => node.collapseAll());
    }

    addDocument() {
      this.$mdDialog.show({
        template: tocDocumentTemplate,
        locals: {
          $mdDialog: this.$mdDialog,
          items: this.items,
          node: this.node
        },
        controllerAs: '$ctrl',
        controller: TocDocumentCtrl
      })
      .then(result => {
        if (!this.node.toc2doc)
          this.node.toc2doc = [result];
        else {
          let isExisting = false;
          for (let i = 0; i < this.node.toc2doc.length; i++) {
            if (this.node.toc2doc[i].document._id === result.document._id) {
              isExisting = true;
              break;
            }
          }
          if (isExisting) {
            this.$mdToast.show(
              this.$mdToast.simple()
                .textContent('Duplicated document for this TOC node.')
                .hideDelay(1200)
            );
          } else
            this.node.toc2doc.unshift(result);
        }
        this.isHidden = false;
      });
    }

    deleteDocument(index) {
      let docid = this.node.toc2doc[index].document._id;
      this.ghstsService.edb_delete({url: 'toc', data: {tocnodepid: this.node.tocnodepid, docid }})
      .then(ret => {
        this.node.toc2doc = this.node.toc2doc.slice(0, index).concat(this.node.toc2doc.slice(index + 1));
      });
    }

    validate() {
      // set flags if needed
    }

  }
})
.name;