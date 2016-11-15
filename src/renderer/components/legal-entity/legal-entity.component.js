import angular from 'angular';
import ngMaterial from 'angular-material';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import template from './legal-entity.template';

export default angular.module('legalEntity', [
  ngMaterial,
  TextInput,
  SelectInput,
  SelectInputExtensible
])
.component('legalEntity', {
  template,
  bindings: {
    picklists: '<'
  },
  controller: class LECtrl {
    constructor() {
      console.log(this.picklists);
      this.legalentitytype = '';
      this.legalentityidentifiers = [];
      this.legalEntityIdentifiersProjection = [];
    }

    update(prop, value) {
      this[prop] = value;
    }
  }
})
.name;