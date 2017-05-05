import angular from 'angular';
import ngMaterial from 'angular-material';
import tocTemplate from './toc-data/toc-data.template.html';
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
    isSubmission: '<'
  },
  controller: class TOCCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'toc', $scope, GhstsService, $transitions);
      this.showTOCData = false;
      this.getAppData({}, 'toc')
      .then(toc => {
        this.toc = JSON.parse(toc.data)[0];
        this.tree = this.toc.structure;
        this.selectedNode = this.tree;

        // assign the top level node some data to show better
        this.tree.nodename = 'TOC';
        return this.getAppData({}, 'document');
      }).then(docs => {
        this.docs = JSON.parse(docs.data);
        this.docs = this.docs.filter(doc => {
          return doc._dossier === this.dossierData.dossierid;
        });
        return this.picklistService.edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_TOC_OWNER' });
      }).then(ret => {
        this.tocOwnerType = JSON.parse(ret.data);
        this.treeNodes = [];
        this.tree.tocnode.forEach(node => this.getNodes(this.treeNodes, node));
        $scope.$apply(this.$scope.$root.loading = false);
        this.associations = [];
        console.log(this.toc.structure);
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

    showTOCDataModal() {
      this.$mdDialog.show({
        template: tocTemplate,
        controllerAs: '$ctrl',
        controller: class ReceiverSelectCtrl {
          constructor($mdDialog, toc) {
            this.toc = toc
            this.$mdDialog = $mdDialog;
            console.log(this);
          }

          close() {
            this.$mdDialog.hide(this);
          }

          confirm() {
            this.$mdDialog.hide(this);
          }
        },
        locals: {
          toc: this.toc
        }
      });
    }

    updateTOC(node, value) {
      this.toc[node] = value;
    }

    updateStandardReference(node, value) {
      this.toc.standardreference[node] = value;
    }

    showTree() {
      this.selectedNode = this.tree;

      // for testing
      // console.log(sanitizeTreeHelper(this.tree));
    }

    saveTOC() {
      // this.ghstsService.edb_put({url: `/toc`, data: {tocnodepid: ''}});
    }
  }
})
.name;

function sanitizeTreeHelper(tree) {
  const newTree = angular.copy(tree);
  sanitizeTree(newTree);
  return newTree;
}

function sanitizeTree(tree) {
  if (tree) {
    if (tree.toc2doc) {
      tree.toc2doc = tree.toc2doc.map(doc => {
        return doc.document._id;
      });
    }

    if (tree.tocnode) {
      tree.tocnode.forEach(node => sanitizeTree(node));
    }
  }
}