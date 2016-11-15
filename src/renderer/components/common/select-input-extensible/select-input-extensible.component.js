import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './select-input-extensible.template';

import SelectInput from '../select-input/select-input.component';
import Icon from '../icon/icon.component';

import './select-input-extensible.scss';

export default angular.module('selectInputExtensible', [
  ngMaterial,
  SelectInput,
  Icon
])
.component('selectInputExtensible', {
  template,
  controller: class selectInputExtensibleCtrl {
    constructor() {
      this.addButton = { name: 'add', label: 'Add Extension', color: 'dark' };
    }
  }
})
.name;