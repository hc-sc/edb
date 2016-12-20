import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

import BaseCtrl from '../common/base.controller';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Tbl from '../common/tbl/tbl.component';
import Tree from '../common/tree/tree.component';

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
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'toc', $scope);

      this.appDataService.edb_get({_url: 'toc'})
      .then(toc => {
        this.toc = JSON.parse(toc.data)[0];
        this.tree = this.toc.structure[0];
        this.tree.nodename = 'TOC';
        return this.picklistService.edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_TOC_OWNER' });
      })
      .then(tocOwnerType => {
        this.tocOwnerType = JSON.parse(tocOwnerType.data);
        return this.appDataService.edb_get({_url: 'product'})
      })
      .then(ret => {
        this.products = JSON.parse(ret.data);
        return this.appDataService.edb_get({_url: 'dossier'});
      }).then(ret => {
        this.dossiers = JSON.parse(ret.data);

        this.$scope.$root.loading = false;
      });
    }

    updateTOC(node, value) {
      this.toc[node] = value;
    }

    updateStandardReference(node, value) {
      this.toc.standardreference[node] = value;
    }
  }
})
.name;
