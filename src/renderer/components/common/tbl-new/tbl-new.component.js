import angular from 'angular';
import ngMaterial from 'angular-material';
import moment from 'moment';
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
    deletable: '<',
    editable: '<',
    viewable: '<',
    searchable: '<',
    onSelect: '&',
    onAdd: '&',
    onDelete: '&',
  },
  controller: class TblNewCtrl {
    constructor(PicklistService, AppDataService) {
      this.sortField = this.defaultSort || '';
      this.reverse = this.defaultReverse || false;
      this.search = false;
      this.searchText = '';
      this.deletable = (this.deletable == null || this.deletable) ? true : false;
      this.editable = this.editable || false;
      this.viewable = this.viewable || false;
      this.addable = true;
      this.searchable = true;
      this.picklistService = PicklistService.getService();
      this.appDataService = AppDataService.getService();
    }

    $onChanges() {}

    setSort(header) {
      if (this.sortField === header) {
        this.reverse = !this.reverse;
      }
      else {
        this.reverse = false;
        this.sortField = header;
      }
    }

    // if the header is a string, use it, if its an object, use the name
    getHeader(header) {
      if (typeof header === 'string') return header;
      return header.name;
    }

    getValue(item, header) {
      // test if its an id that requires a lookup
      if (typeof header !== 'string') {
        let _id = item[header.name].id;
        let returnValue;

        if (header.url === 'picklist') {
          returnValue = this.picklistService.edb_getSync({_id})[0];
        }
        else {
          returnValue = this.appDataService.edb_getSync({url: header.url, data: {_id}})[0];
        }

        if (returnValue && returnValue.hasOwnProperty('valuedecode')) {
          return returnValue.valuedecode;
        }

        return item[header.name];
      }

      // test if it's a date
      // need to use moment because standard js date parsing is insufficient
      let date = moment(item[header], moment.ISO_8601, true);
      if (date._isValid) {
        return date.format('YYYY-MM-DD');
      }

      return item[header];
    }

    compareItems(a, b) {
      if (a.type === 'string') return a.value.localeCompare(b.value);
      if (a.type === 'number') return a.value < b.value;
    }

    toggleSearch() {
      // clear the search field so it isn't still filtering
      this.searchText = '';
      this.search = !this.search;
    }

    isSelected(header) {
      if (typeof header === 'string') return header === this.sortField;
      return header.name === this.sortField;
    }

    update(prop, value) {
      this[prop] = value;
    }

    select(item) {
      this.selected = item;
      this.onSelect({id: item.id, index: item.index});
    }

    delete(index) {
      this.onDelete({index});
    }

    edit(index) {
      this.onEdit({index});
    }

    view(index) {
      this.onView({index});
    }
  }
})
.name;