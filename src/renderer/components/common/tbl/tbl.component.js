import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import template from './tbl.template';

import Toolbar from '../toolbar/toolbar.component';
import Icon from '../icon/icon.component';
import IndexFilter from '../../../filters/index.filter';

// import './tbl.scss';

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
      onDelete: '&',
      canAdd: '<'
    },
    controller: class TableCtrl {
      constructor(AppDataService, PicklistService) {
        //      super(PicklistService, AppDataService);
        this.searchIcon = { name: 'search', label: 'Search' };
        this.addIcon = { name: 'add', label: 'Add' };
        this.deleteIcon = { name: 'delete', label: 'Delete', color: 'dark' };
        this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
        this.sortField = this.defaultSort ? this.defaultSort : '';
        this.reverse = this.defaultReverse ? true : false;
        this.deletable = this.deletable || true;
        this.search = false;
        this.searchText = '';

        this.picklistService = PicklistService.getService();
        this.appDataService = AppDataService.getService();

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
        return Array.isArray(data) ? data.join(', ') : data;
      }

      setSort(item) {
        if (this.sortField === item.paramName) {
          this.reverse = !this.reverse;
        }
        else {
          this.reverse = false;
          this.sortField = item.paramName;
        }

        return item.paramName
      }

      getSortField(item) {
      }

      sort(a, b) {
      }


      // takes the input and re-orders the rows
      mapProjection() {
        if (this.projection) {
          this.headers = this.projection.map(item => {
            if (typeof item === 'string' )
              return { name: item, paramName: item };
            else
              return { name: item.name, paramName: item.name}
          });
        }

        if (this.items && this.items.length > 0) {
          this.rows = this.items.map(item => {
            let row = [];
            for (let header of this.projection) {
              if (typeof header === 'string') {
                row.push(item[header]);
              } else {
                let id = item[header.name];
                let query = {_id: id};
                // let value;
                if (header.url === 'picklist') {
                  let queryRet = this.picklistService.edb_getSync(query)[0];
                  if (queryRet && queryRet.hasOwnProperty('valuedecode'))
                    row.push(queryRet.valuedecode);
                  else
                    row.push(item[header.name]);
                } else {
                  query = {
                    url: header.url,
                    data: query
                  };
                  let queryRet = this.appDataService.edb_getSync(query)[0];
                  if (queryRet && queryRet.hasOwnProperty('valuedecode'))
                    row.push(queryRet.valuedecode);
                  else
                    row.push(item[header.name]);
                }
              }
            }
            row.push(item['_id']);
            return row;
          });
        } else
          this.rows = [];
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

      mapIdToEntities(ids, url) {
        console.log(ids, url);
        let mappings = [];
        if (!Array.isArray(ids)) ids = [ids];
        if (url === 'picklist') {
          return this.picklistService.edb_get({data: {where: '_id in ' + ids}})
            .then(results => {
              const data = JSON.parse(results.data);
              // console.log(data);
              ids.forEach(id => {
                let index = -1;
                for (let i = 0; i < data.length; ++i) {
                  if (data[i]._id === id) {
                    index = i;
                    break;
                  }
                }
                if (index >= 0) {
                  mappings.push({ id, name: data[index].valuedecode });
                }
              });

              return mappings;
            });
        }
        else {
          return this.appDataService.edb_get({ _url: url })
            .then(results => {
              // console.log(JSON.parse(results.data));

              return mappings;
            });
        }
      }
    }
  })
  .name;