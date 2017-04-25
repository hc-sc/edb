import angular from 'angular';
import ngMaterial from 'angular-material';
import TextInput from '../text-input/text-input.component';
import Icon from '../icon/icon.component';
import IndexFilter from '../../../filters/index.filter';
import template from './tbl-new.template';
import './tbl-new.scss';

export default angular.module('tblNew', [
  ngMaterial,
  TextInput,
  Icon,
  IndexFilter
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
  controller: class TblNewCtrl {
    constructor() {
      this.sortField = this.defaultSort || '';
      this.reverse = this.defaultReverse || false;
      this.search = false;
      this.searchText = '';
      this.deletable = this.deletable == null || this.deletable ? true : false;
      this.editable = this.editable || false;
      this.viewable = this.viewable || false;
      this.addable = true;
      this.searchable = true;
      // this.selectable
      // this.pageable
    }

    $onChanges() {
      console.log(this.items);
    }

    setSort(header) {
      if (this.sortField === header) {
        this.reverse = !this.reverse;
      }
      else {
        this.sortField = header;
      }
    }
  }
})
.name;