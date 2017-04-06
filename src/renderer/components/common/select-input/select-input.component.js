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
    isDisabled: '<',
    isRequired: '<',
    showValue: '<',
    selectValue: '<',
    values: '<',
    main: '@',
    onUpdate: '&'
  },
  controller: class SelectInputCtrl {
    $onChanges() {
      if (this.values) {
        this.values.sort((a, b) => {
          let av = this.main ? this.getMain(a).toLowerCase() : a.lowvaluedecode ? a.lowvaluedecode : a.valuedecode ? a.valuedecode.toLowerCase() : '';
          let bv = this.main ? this.getMain(b).toLowerCase() : b.lowvaluedecode ? b.lowvaluedecode : b.valuedecode ? b.valuedecode.toLowerCase() : '';
          // return av < bv ? -1 : av > bv ? 1 : 0;
          return  av.localeCompare(bv);
        });
      }
    }

    update(item) {
      this.onUpdate({ value: item._id });
    }

    getMain(item) {
      let refs = this.main.split('.');
      let path = item;
      for (let ref of refs) {
        path = path[ref];
      }
      return path;
    }
  }
})
.name;