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
      this.deleteIcon = { name: 'delete', label: 'Delete' };
      this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
      this.sortField = this.defaultSort ? this.defaultSort : '';
      this.reverse = this.defaultReverse ? true : false;
      this.deletable = false;

      this.search = false;
      this.searchText = '';

      console.log(this.items);

      this.mapProjection();
    }

    $onChanges(changes) {
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
    }

    inProjection(key) {
      return (this.projection.indexOf(key) >= 0) ? true : false;
    }

    update(prop, value) {
      this[prop] = value;
    }

    select(index) {
      this.onSelect({ index });
    }

    add() {
      this.onAdd();
    }

    delete(index) {
      this.onDelete({ index });
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