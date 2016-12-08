import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import template from'./tbl.template';

import QueryCtrl from '../query.controller';
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
  controller: class TableCtrl extends QueryCtrl {
    constructor(AppDataService, PicklistService) {
      super(PicklistService, AppDataService);
      this.searchIcon = { name: 'search', label: 'Search' };
      this.addIcon = { name: 'add', label: 'Add' };
      this.deleteIcon = { name: 'delete', label: 'Delete', color: 'dark' };
      this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
      this.sortField = this.defaultSort ? this.defaultSort : '';
      this.reverse = this.defaultReverse ? true : false;
      this.deletable = this.deletable || true;
      this.search = false;
      this.searchText = '';

      this.projection = [{name: 'legalentityidentifiertype'}];
      console.log(this.items[0]);

      Promise.all(this.projection.forEach(proj => {
        // if it doesn't have main, it's a picklist
        if (!proj.main) {
          this.picklistService.edb_get('EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE')
          .then(results => {
            const picklists = JSON.parse(results.data);
            for (let picklist of picklists) {
              for (let item of this.items) {
                if (item[proj.name] === picklist._id) {
                  console.log(picklist.valuedecode);
                }
              }
            }
          });
        }
        else {
          this.appDataService.edb_get(proj._url)
          .then(results => {
            console.log(JSON.parse(results.data));
          })
        }
      }));

      // this.mapIdToEntities(this.items[0][this.projection[0].name], 'picklists', 'EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE')
      // .then(result => {
      //   console.log(result);
      // });



      // this.ids = new Map();
      // this.ids.set('legalentityidentifiertype', []);

      this.mapProjection();

    }

    $onChanges(changes) {
      this.mapProjection();
    }

    getData(data, index) {
      // if (this.headers && this.ids && this.ids.has(this.headers[index].name)) {
      //   for (let value of this.ids.get(this.headers[index].name)) {
      //     if (data === value._id) return value.valuedecode;
      //   }
      // }
      return data;
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
            if (this.ids.has(header.name)) {
              // this.picklistService.
            }
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