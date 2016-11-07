import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput
])
.component('legalEntities', {
  template,
  controller: class LECtrl {
    constructor() {
      this.typeValues = [
        {value: 'hello'},
        {value: 'there'}
      ];
      this.legalentitytype = '';

      this.legalentityidentifiers = [];
      this.legalEntityIdentifiersProjection = [];
    }

    update(prop, value) {
      this[prop] = value;
      console.log(this.legalentitytype);
    }
  }
})
.name;