import angular from 'angular';
import template from './tree.template';

import Icon from '../icon/icon.component';
import './tree.scss';

export default angular.module('tree', [
  Icon
])
.component('tree', {
  template,
  bindings: {
    node: '<'
  },
  controller: class TreeCtrl {
    constructor() {
      this.expand = {name: 'down'};
      this.collapse = {name: 'right'};
      this.add = {name: 'add'};
      this.isHidden = false;
    }

    toggleHidden() {
      this.isHidden = !this.isHidden;
    }

    canExpand() {
      return (this.node.toc2DOC && this.node.toc2DOC.length > 0) || (this.node.tocnode && this.node.tocnode.length > 0);
    }

    expandAll() {
      this.isHidden = false;
      if (this.tocnode) this.tocnode.forEach(node => node.expandAll());
    }

    collapseAll() {
      this.isHidden = true;
      if (this.tocnode) this.tocnode.forEach(node => node.collapseAll());
    }

    addDocument() {}

    deleteDocument() {}

    validate() {
      // set flags if needed
    }
  }
})
.name;