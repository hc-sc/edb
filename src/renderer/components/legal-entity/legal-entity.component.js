import angular from 'angular';
import ngMaterial from 'angular-material';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';


import template from './legal-entity.template';

export default angular.module('legalEntity', [
  ngMaterial,
  TextInput,
  SelectInput
])
.component('legalEntity', {
  template,
  bindings: {
    typeValues: '<'
  },
  controller: class LECtrl {
    constructor() {
      console.log(this.typeValues);
      this.legalentitytype = '';
      this.legalentityidentifiers = [];
      this.legalEntityIdentifiersProjection = [];
    }

    update(prop, value) {
      console.log(prop, value);
      this[prop] = value;
      console.log(this.legalentitytype);
    }
  }
})
.name;