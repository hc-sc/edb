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
  controller: class ListCtrl {
    constructor() {
      this.readonly = false;
      this.removable = true;
    }

    $onChanges() {
      console.log();
      if (this.items && Array.isArray(this.items)) {
        this.items.sort();
      }
    }

    validateChip(chip) {
      for (let item of this.items) {
        if (item.toUpperCase() === chip.toUpperCase()) return null;
      }
      return chip;
    }
  }
})
.name;