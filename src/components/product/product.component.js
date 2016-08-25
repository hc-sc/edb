import angular from 'angular';

import ProductCtrl from './product.controller';
import ProductService from './product.service';

export default angular.module('app.edit.product', [
  'ui.router',
  'ngMaterial'
])
.component('product', {
  templateUrl: './components/product/product.template.html',
  controller: ProductCtrl

  // if you want to follow to convention from the old demo
  // I followed the Angular convention for this, using the default
  // $ctrl that is assigned
  // controllerAs: '_ctrl'
})
.service('productService', ['$mdDialog', ProductService]);