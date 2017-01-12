import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './select-input-extensible.template';

import SelectInput from '../select-input/select-input.component';
import Icon from '../icon/icon.component';
import PicklistService from '../../../services/picklist.service';

import './select-input-extensible.scss';

export default angular.module('selectInputExtensible', [
  ngMaterial,
  SelectInput,
  Icon,
  PicklistService
])
.component('selectInputExtensible', {
  template,
  bindings: {
    label: '@',
    showValue: '<',
    isRequired: '<',
    selectValue: '<',
    values: '<',
    typeName: '@',
    onUpdate: '&',
    onAdd: '&'
  },
  controller: class selectInputExtensibleCtrl {
    constructor(PicklistService) {
      console.log(this.label);
      this.picklistService = PicklistService.getService();
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
        const picklistItem = {
          TYPE_NAME: this.typeName,
          value: this.value,
          valuedecode: this.valuedecode || this.value,
          isExt: true
        };

        this.onAdd({value: picklistItem});

        this.value = '';
        this.valuedecode = '';
        this.adding = false;
      }
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
      this.onUpdate({ value });
    }
  }
})
.name;