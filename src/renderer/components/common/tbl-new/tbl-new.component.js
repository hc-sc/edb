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
    isRequired: '<',
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
    onEdit: '&',
    onView: '&'
  },
  controller: class TblNewCtrl {
    constructor(PicklistService, AppDataService) {
      this.required = this.isRequired || false;
      this.sortField = this.defaultSort || '';
      this.reverse = this.defaultReverse || false;
      this.search = false;
      this.searchText = '';
      this.deletable = (this.deletable == null || this.deletable) ? true : false;
      this.editable = this.editable || false;
      this.viewable = this.viewable || false;
      this.addable = true;
      this.searchable = true;
      this.rows = this.items.slice();
      this.headers = this.projection.slice();
      this.picklistService = PicklistService.getService();
      this.appDataService = AppDataService.getService();
    }

    $onChanges() {
      this.mapItems();
      console.log(this.items);
    }

    mapItems() {
      if (this.projection) {
        this.headers = this.projection.map(header => {
          if (typeof header === 'string') return header;
          else return header.name;
        });
      }

      if (this.items) {
        this.rows = this.items.map(item => {
          let row = {};
          let value;
          let headerName;
          for (let header of this.projection) {
            if (typeof header === 'string') {
              headerName = header;
              value = item[header];
            }
            else {
              headerName = header.name;
              let _id = item[headerName];
              let returnValue;
              if (header.url === 'picklists') {
                returnValue = this.picklists.edb_getSync({_id})[0];
              }
              else {
                returnValue = this.appDataService.edb_getSync({url: header.url, data: {_id}})[0];
              }

              if (returnValue && returnValue.hasOwnProperty('valuedecode')) {
                value = returnValue.valuedecode;
              }
              else value = 'undefined';
            }


            let date = moment(value, moment.ISO_8601, true);
            if (date._isValid) {
              row[headerName] = date.format('YYYY-MM-DD');
            }
            else {
              row[headerName] = value;
            }
          }
          row.deletable = item.deletable == null ? true : item.deletable;
          row.editable = item.editable == null ? false : item.editable;
          row.viewable = item.viewable == null ? false: item.viewable;
          row._id = item._id;
          return row;
        });
      }
    }

    setSort(header) {
      if (this.sortField === header) {
        this.reverse = !this.reverse;
      }
      else {
        this.reverse = false;
        this.sortField = header;
      }
    }

    compareItems(a, b) {
      if (a.type === 'string') return a.value.localeCompare(b.value);
      if (a.type === 'number') return a.value - b.value;
    }

    toggleSearch() {
      // clear the search field so it isn't still filtering
      this.searchText = '';
      this.search = !this.search;
    }

    update(prop, value) {
      this[prop] = value;
    }

    select(item) {
      this.row = item;
      this.onSelect({id: item._id, index: item.index});
    }

    delete(index) {
      if (!this.deletable) return;
      this.onDelete({index});
    }

    edit(index) {
      if (!this.editable) return;
      this.onEdit({index});
    }

    view(index) {
      if (!this.deletable) return;
      this.onView({index});
    }
  }
})
.name;