import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './product.template';

import Tbl from '../common/tbl/tbl.component';
import SelectInput from '../common/select-input/select-input.component';
import TextInput from '../common/text-input/text-input.component';

import ProductService from '../../services/products.service';

export default angular.module('product', [
  ngMaterial,
  Tbl,
  SelectInput,
  TextInput
])
.component('product', {
  template,
  bindings: {
    product: '<'
  },
  controller: class ProductCtrl {
    constructor() { console.log(this); }
  }
})
.service('ProductService', ProductService)
.name;