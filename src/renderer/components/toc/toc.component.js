import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

import BaseCtrl from '../common/base.controller';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import Tbl from '../common/tbl/tbl.component';
import Tree from '../common/tree/tree.component';
import Spinner from '../common/spinner/spinner.component';

export default angular.module('toc', [
  ngMaterial,
  TextInput,
  SelectInput,
  Tbl,
  Tree,
  Spinner
])
.component('toc', {
  template,
  bindings: {
    dossierData: '<',
    toc: '<',
    tocOwnerType: '<'
  },
  controller: class TOCCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'toc', $scope);
      console.log(this);
      this.toc = JSON.parse(this.toc.data)[0];
      this.tree = this.toc.structure[0];
      this.tree.nodename = 'TOC';
      this.tocOwnerType = JSON.parse(this.tocOwnerType.data);
      this.appDataService.edb_get({_url: 'product'}).then(ret => {
        this.products = JSON.parse(ret.data);
        return this.appDataService.edb_get({_url: 'dossier'});
      }).then(ret => {
        this.dossiers = JSON.parse(ret.data);
        // return this.appDataService.edb_get({_url: 'submission'});
        this.loading = false;
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
