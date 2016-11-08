import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './products.template';

import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import TextInput from '../common/text-input/text-input.component';
import Sidenav from '../common/sidenav/sidenav.component';

// for testing
import ProductService from '../../services/products.service';

export default angular.module('products', [
  ngMaterial,
  Tbl,
  SelectInput,
  TextInput,
  Sidenav
])
.component('products', {
  template,
  bindings: {
    products: '<'
  },
  controller: class ProductsCtrl {
    constructor($state) {
      this.$state = $state;
    }

    select(item) {
      console.log(item.pid);
      this.$state.go('globals.products.product', {
        productPID: item.pid
      });
    }
  }
})
.service('ProductService', ProductService)
.name;