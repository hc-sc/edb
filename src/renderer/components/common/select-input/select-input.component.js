import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './select-input.template';

export default angular.module('selectInput', [
  ngMaterial
])
.component('selectInput', {
  template,
  bindings: {
    label: '@',
    selectValue: '<',
    values: '<',
    onUpdate: '&'
  },
  controller: class SelectInputCtrl {
    constructor() {}
    update() {
      this.onUpdate({ value: this.selectValue });
    }
  }
})
.name;