import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import template from'./tbl.template';

import Toolbar from '../toolbar/toolbar.component';

import './tbl.scss';

export default angular.module('tbl', [
  uiRouter,
  mdTable,
  Toolbar
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
    onSelect: '&',
    onAdd: '&',
    onDelete: '&'
  },
  controller: class TableCtrl {
    constructor() {
      this.searchIcon = { name: 'search', label: 'Search' };
      this.addIcon = { name: 'add', label: 'Add' };
      this.deleteIcon = { name: 'delete', label: 'Delete' };
      this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
      this.sortField = this.defaultSort ? this.defaultSort : '';
      this.reverse = this.defaultReverse ? true : false;
      this.selected = [];

      this.search = false;
      this.searchText = '';

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

    mapProjection() {
      this.headers = this.projection.map(item => {
        return { name: item, paramName: item };
      });

      this.rows = this.items;

      // this.rows = this.items.map(item => {
      //   let obj = {};
      //   for (let param of this.projection) {
      //     obj[param] = item[param];
      //   }
      //   return obj;
      // });
    }

    $onChanges(changes) {
      this.mapProjection();
    }

    checkRow(index) {
      console.log(index);
    }

    update(prop, value) {
      this[prop] = value;
    }

    select(item, index) {
      console.log('clicked');
      this.onSelect({ item, index });
    }

    add() {
      this.onAdd();
    }

    delete(items) {
      this.onDelete(items);
    }

    toggleSearch() {
      if (this.search === true) {
        this.searchText = '';
      }
      this.search = !this.search;
    }
  }
})
.name;