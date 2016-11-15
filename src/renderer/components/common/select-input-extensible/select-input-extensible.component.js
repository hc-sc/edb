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
  bindings: {
    selectValue: '<',
    values: '<',
    onValueUpdate: '&'
  },
  controller: class selectInputExtensibleCtrl {
    constructor() {
      this.addButton = { name: 'add', label: 'Add Extension', color: 'dark' };
      this.cancelButton = { name: 'close', label: 'Cancel', color: 'dark' };
      this.saveButton = { name: 'save', label: 'Save', color: 'dark' };
      this.adding = false;
      this.value = '';
      this.valuedecode = '';
      this.selected;
    }

    toggleAdd() {
      this.adding = !this.adding;
    }

    // update the database
    savePicklistItem() {
      console.log('saving values: ', this.value, this.valuedecode);
    }

    update(prop, value) {
      this[prop] = value;
    }
  }
})
.name;