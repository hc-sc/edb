import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './product.template';

export default angular.module('product', [
  ngMaterial
])
.component('product', {
  template
})
.name;