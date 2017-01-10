import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './list.template';

export default angular.module('list', [
  ngMaterial
])
.component('list', {
  template,
  bindings: {
    label: '@',
    items: '<'
  },
  controller: function() {
    return {
      validateChip: function(chip) {
        if (this.items.indexOf(chip) >= 0) return null;
      }
    };
  }
})
.name;