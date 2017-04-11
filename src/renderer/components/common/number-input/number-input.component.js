import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './number-input.template';

import './number-input.scss';

export default angular.module('numberInput', [
  ngMaterial
])
.component('numberInput', {
  template,
  bindings: {
    label: '@',
    textValue: '<',
    isRequired: '<',
    isDisabled: '<',
    maxLength: '@',
    hasPattern: '@',
    message: '@',
    onUpdate: '&'
  },
  controller: class NumberInputCtrl {
    constructor() {
      this.isValid = true;
      this.pattern = this.hasPattern ? new RegExp(this.hasPattern) : new RegExp('.*');
      this.exceededLimit = false;
      this.validPattern = true;
      this.checkValid();
    }

    checkValid() {
      if (this.textValue) {
        this.exceededLimit =
          (this.maxLength && this.maxLength < this.textValue.toString().length) ?
            true : false;

        this.validPattern =
          (this.textValue.toString().match(this.pattern)) ?
            true : false;
      }
    }

    update() {
      this.onUpdate({ value: this.textValue });
    }

    $onChanges(changes) {
      this.checkValid();
    }
  }
})
.name;