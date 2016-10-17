import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './description.template';

import TextInput from '../common/text-input/text-input.component';
import Icon from '../common/icon/icon.component';
import Card from '../common/card/card.component';

export default angular.module('description', [
  ngMaterial,
  TextInput,
  Icon,
  Card
])
.component('description', {
  template,
  bindings: {
    submission: '<'
  },
  controller: class DescriptionCtrl {
    constructor($state) {
      this.$state = $state;
    }

    update(prop, value) {
      this.submission[prop] = value;
    }
  }
})
.name;