import angular from 'angular';
import template from './tree.template';

import './tree.scss';

export default angular.module('tree', [])
.component('tree', {
  template,
  bindings: {
    treeData: '<'
  },
  controller: class TreeCtrl {
    constructor() {
      this.show = true;
      this.isFolder = false;
      this.hasChildren =
        (this.treeData.children !== undefined &&
        this.treeData.children.length > 0);
    }
  }
})
.name;