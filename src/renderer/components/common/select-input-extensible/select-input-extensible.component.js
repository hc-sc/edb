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
    label: '<',
    showValue: '<',
    isRequired: '<',
    selectValue: '<',
    values: '<',
    onUpdate: '&'
  },
  controller: class selectInputExtensibleCtrl {
    constructor() {
      this.addButton = { name: 'add', label: 'Add Extension', color: 'dark' };
      this.cancelButton = { name: 'close', label: 'Cancel', color: 'dark' };
      this.saveButton = { name: 'save', label: 'Save', color: 'dark' };
      this.adding = false;
      this.valid = true;
      this.value = '';
      this.valuedecode = '';
    }

    toggleAdd() {
      this.adding = !this.adding;
    }

    // update the database
    savePicklistItem() {
      if (this.valid) {
        //update

        this.value = '';
        this.valuedecode = '';
        this.adding = false;
      }

      // refresh selected value
    }

    checkValid() {
      if (this.values.filter(item => {
        return item.value === this.value;
      }).length >= 1) {
        this.valid = false;
      }
      else this.valid = true;
    }

    update(prop, value) {
      this[prop] = value;

      // may need to debounce this to make sure it isn't fired too often
      this.checkValid();
    }

    updateSelected(value) {
      console.log(value);
      this.onUpdate({ value });
    }
  }
})
.name;