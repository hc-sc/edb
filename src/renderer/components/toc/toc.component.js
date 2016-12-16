import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './toc.template';

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
    toc: '<'
  },
  controller: class TOCCtrl {
    constructor(AppDataService) {
      console.log(this);
      this.loading = true;
      this.appDataService = AppDataService.getService();
      this.tree = JSON.parse(this.toc.data)[0].structure[0];
      console.log(this.tree);
      this.tree.nodename = 'TOC';
      this.appDataService.edb_get({_url: 'product'}).then(ret => {
        this.products = JSON.parse(ret.data);
        console.log(this.products);
        return this.appDataService.edb_get({_url: 'dossier'});
      }).then(ret => {
        this.dossiers = JSON.parse(ret.data);
        console.log(this.dossiers);
        // return this.appDataService.edb_get({_url: 'submission'});
        this.loading = false;
      }); 

      // Tree Structure
      // nodename - name of node
      // nodeheading - annotation
      // logicaldeleted - ?????
      // emptynode - flag for if it's a leaf
      // toc2doc - the documents related to this node
      // tocnode - subnodes for this node
    }
  }
})
.name;
