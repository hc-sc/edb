import angular from 'angular';
import ngMaterial from 'angular-material';
import TextInput from '../text-input/text-input.component';
import Icon from '../icon/icon.component';
import template from './tbl-new.template';
import './tbl-new.scss';

export default angular.module('tblNew', [
  ngMaterial,
  TextInput,
  Icon
])
.component('tblNew', {
  template,
  bindings: {
    title: '@',
    items: '<',
    minItems: '@',
    defaultSort: '@',
    defaultReverse: '@',
    projection: '<',
    deletable: '@',
    editable: '@',
    viewable: '@',
    onSelect: '&',
    onAdd: '&',
    onDelete: '&',
  },
  controller: class TblCtrl {
    constructor() {
      this.sortField = this.defaultSort || '';
      this.reverse = this.defaultReverse || false;
      this.deletable = this.deletable == null || this.deletable ? true : false;
      this.editable = this.editable || false;
      this.viewable = this.viewable || false;
      this.search = false;
      this.searchText = '';
    }
  }
})
.name;