import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import moment from 'moment';
import template from './tbl-edit.template';

import Toolbar from '../toolbar/toolbar.component';
import Icon from '../icon/icon.component';
import IndexFilter from '../../../filters/index.filter';

import './tbl-edit.scss';

export default angular.module('tblEdit', [
  uiRouter,
  mdTable,
  Toolbar,
  Icon,
  IndexFilter
])
  .component('tblEdit', {
    template,
    bindings: {
      title: '@',
      items: '<',
      minItems: '@',
      defaultSort: '@',
      defaultReverse: '@',
      projection: '<',
      deletable: '<',
      viewable: '<',
      editable: '<',
      onSelect: '&',
      onAdd: '&',
      onDelete: '&',
      onView: '&',
      onEdit: '&'
    },
    controller: class TableEditCtrl {
      constructor(AppDataService, PicklistService) {
        this.searchIcon = { name: 'search', label: 'Search' };
        this.addIcon = { name: 'add', label: 'Add' };
        this.deleteIcon = { name: 'delete', label: 'Delete', color: 'dark' };
        this.viewIcon = {name: 'view', label: 'View', color: 'dark'};
        this.editIcon = {name: 'check', label: 'Edit Status', color: 'dark'};
        this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
        this.sortField = this.defaultSort ? this.defaultSort : '';
        this.reverse = this.defaultReverse ? true : false;
        this.deletable = this.deletable;
        this.viewable = this.viewable;
        this.editable = this.editable;
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

            // convert times
            row = row.map(col => {
              try {
                // let date = new Date('YYYY-MM-DD', col);
                // let yyymmdd = new RegExp(/\d{4}-\d{2}-\d{2}/);
                // let utctime = new RegExp(/\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/)
                // console.log(date);
                // if (date.toString() !== "Invalid Date" && !isNaN(date)) {
                //   console.log(col, typeof col);
                //   col = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                // }
                let date = moment(col, moment.ISO_8601, true);
                if (date._isValid) {
                  col = date.format('YYYY-MM-DD');
                }
                return col;
              }

              /* eslint-disable no-empty */
              catch(e) {
                console.log('errored');
              }
            });

            // need to append properties 'deletable', 'editable', 'viewable'
            row.deletable = item.deletable;
            row.editable = item.editable;
            row.viewable = item.viewable;

            // show if it's selected
            row.isSelected = item.isSelected;
            // if (item._url === 'dossier') console.log(row, item);

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

      view(index) {
        this.onView({index});
      }

      edit(index) {
        this.onEdit({index});
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
              return mappings;
            });
        }
      }
    }
  })
  .name;