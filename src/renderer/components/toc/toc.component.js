import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

import BaseCtrl from '../common/base.controller';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Tbl from '../common/tbl/tbl.component';
import Tree from '../common/tree/tree.component';

import '../common/tree/tree.scss';

export default angular.module('toc', [
  ngMaterial,
  TextInput,
  SelectInput,
  Tbl,
  Tree
])
.component('toc', {
  template,
  bindings: {
    dossierData: '<',
  },
  controller: class TOCCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'toc', $scope);
      this.ghstsService = GhstsService.getService();
      this.showTOCData = false;
      this.getAppData({}, 'toc')
      .then(toc => {
        this.toc = JSON.parse(toc.data)[0];
        this.tree = this.toc.structure[0];
        this.selectedNode = this.tree;

        // assign the top level node some data to show better
        this.tree.nodename = 'TOC';
        return this.getAppData({}, 'document');
      }).then(docs => {
        this.docs = JSON.parse(docs.data);
        return this.picklistService.edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_TOC_OWNER' });
      }).then(ret => {
        this.tocOwnerType = JSON.parse(ret.data);
        this.treeNodes = [];
        this.tree.tocnode.forEach(node => this.getNodes(this.treeNodes, node));
        this.$scope.$root.loading = false;
      });
    }

    updateSelected(value) {
      const node = this.findNode(this.tree, value);
      this.selectedNode = node ? node : this.selectedNode;
    }

    findNode(tree, pid) {
      if (tree.tocnodepid && tree.tocnodepid === pid) return tree;
      if (!tree.tocnode) return null;
      for (let node of tree.tocnode) {
        const result = this.findNode(node, pid);
        if (result !== null) return result;
      }
      return null;
    }

    getNodes(list, tree) {
      list.push({nodename: tree.nodename, _id: tree.tocnodepid});
      if (tree.tocnode) tree.tocnode.forEach(node => this.getNodes(list, node));
    }

    toggleShowTOCData() {
      this.showTOCData = !this.showTOCData;
    }

    updateTOC(node, value) {
      this.toc[node] = value;
    }

    updateStandardReference(node, value) {
      this.toc.standardreference[node] = value;
    }

    showTree() {
      this.selectedNode = this.tree;
      console.log(this.tree);
    }

    saveTOC() {
      this.ghstsService.edb_put({url: `/toc`, data: {tocnodepid: ''}})
    }
  }
})
.name;
