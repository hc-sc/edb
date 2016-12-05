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
    main: '<',
    onUpdate: '&'
  },
  controller: class SelectInputCtrl {
    update(item) {
      this.onUpdate({ value: item._id });
    }

    getMain(item) {
      return item[this.main];
      // let refs = this.main.split('.');
      // let path = this.item;
      // for (let ref of refs) {
      //   path = path[ref];
      // }
      // return path;
    }
  }
})
.name;