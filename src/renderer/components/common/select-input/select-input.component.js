import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './select-input.template';

import './select-input.scss';

export default angular.module('selectInput', [
  ngMaterial
])
.component('selectInput', {
  template,
  bindings: {
    label: '@',
    isRequired: '<',
    showValue: '<',
    selectValue: '<',
    values: '<',
    onUpdate: '&'
  },
  controller: class SelectInputCtrl {
    constructor() {}

    update(item) {
      this.onUpdate({ value: item._id });
    }
  }
})
.name;