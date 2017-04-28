import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './text-area-input.template';

export angular.module('textAreaInput', [
  ngMaterial
])
.component('textAreaInput', {
  template,
  bindings: {
    label: '@',
    textValue: '<',
    isRequired: '<',
    isDisabled: '<',
    maxLength: '@',
    message: '@',
    onUpdate: '&'
  },
  controller: class TextAreaInputCtrl {
    constructor() {
      this.isValid = true;
      this.exceededLimit = false;
      this.checkValid();
    }

    checkValid() {
      if (this.textValue) {
        this.exceededLimit = this.maxLength && this.textValue.toString().length > this.maxLength;
      }
    }

    update() {
      this.onUpdate({value: this.textValue});
    }

    $onChanges() {
      this.checkValid();
    }
  }
})