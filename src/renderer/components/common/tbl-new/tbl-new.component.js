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
    }

    mapItems() {
      if (this.projection) {
        this.headers = this.projection.map(header => {
          if (typeof header === 'string') return header;
          else return header.name
        });
      }

      if (this.items) {
        this.rows = this.items.map(item => {
          let row = [];
          for (let header of this.projection) {
            if (typeof header === 'string') row.push(item[header]);
            else {
              let _id = item[header.name];
              let returnValue;
              if (header.url === 'picklists') {
                returnValue = this.picklists.edb_getSync({_id})[0];
              }
              else {
                returnValue = this.appDataService.edb_getSync({url: header.url, data: {_id}})[0];
              }

              if (returnValue && returnValue.hasOwnProperty('valuedecode')) {
                row.push(returnValue.valuedecode);
              }
              else row.push('undefined');
            }
          }

          row = row.map(data => {
            let date = moment(data, moment.ISO_8601, true);
            if (date._isValid) {
              return date.format('YYYY-MM-DD');
            }
            return data;
          });

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

    isSelected(header) {
      return header === this.sortField;
    }

    getSortIndex(item) {
      console.log(item);
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