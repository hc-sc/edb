import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import template from'./tbl.template';

import Toolbar from '../toolbar/toolbar.component';
import Icon from '../icon/icon.component';
import IndexFilter from '../../../filters/index.filter';

import './tbl.scss';

export default angular.module('tbl', [
  uiRouter,
  mdTable,
  Toolbar,
  Icon,
  IndexFilter
])
.component('tbl', {
  template,
  bindings: {
    title: '@',
    items: '<',
    minItems: '@',
    defaultSort: '@',
    defaultReverse: '@',
    projection: '<',
    deletable: '@',
    onSelect: '&',
    onAdd: '&',
    onDelete: '&'
  },
  controller: class TableCtrl {
    constructor() {
      this.searchIcon = { name: 'search', label: 'Search' };
      this.addIcon = { name: 'add', label: 'Add' };
      this.deleteIcon = { name: 'delete', label: 'Delete', color: 'dark' };
      this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
      this.sortField = this.defaultSort ? this.defaultSort : '';
      this.reverse = this.defaultReverse ? true : false;
      this.deletable = this.deletable || true;
      this.search = false;
      this.searchText = '';
      this.mapProjection();
    }

    $onChanges() {
      console.log('changed');
      this.mapProjection();
    }

    setSort(item) {
      if (this.sortField === item.paramName) {
        this.reverse = !this.reverse;
      }
      else {
        this.reverse = false;
        this.sortField = item.paramName;
      }
    }

    // takes the input and re-orders the rows
    mapProjection() {
      if (this.projection) {
        this.headers = this.projection.map(item => {
          return { name: item, paramName: item };
        });
      }

      if (this.items) {
        this.rows = this.items.map(item => {
          let row = [];
          for (let header of this.headers) {
            row.push(item[header.name]);
          }
          row.push(item['_id']);
          return row;
        });
      }
    }

    update(prop, value) {
      this[prop] = value;
    }

    select(id, index) {
      this.onSelect({ id, index });
    }

    add() {
      this.onAdd();
    }

    delete(index) {
      this.onDelete({ index });
    }

    toggleSearch() {
      // clear the search field when closing
      if (this.search === true) {
        this.searchText = '';
      }
      this.search = !this.search;
    }
  }
})
.name;