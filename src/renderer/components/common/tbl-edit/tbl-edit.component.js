import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdTable from 'angular-material-data-table';
import template from './tbl-edit.template';

import Toolbar from '../toolbar/toolbar.component';
import Icon from '../icon/icon.component';
import IndexFilter from '../../../filters/index.filter';

<<<<<<< HEAD
import {
  DOSSIER_STATUS_OPEN,
  DOSSIER_STATUS_CLOSED,
  SUBMISSION_STATUS_IN_PROGRESS,
  SUBMISSION_STATUS_PACKAGED,
  SUBMISSION_STATUS_SENT
} from '../../../../constants/shared.js';

=======
>>>>>>> 1b27233af97ecfdafce3537b720bedd252fefb92
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
      deletable: '@',
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
        this.editIcon = {name: 'edit', label: 'Edit', color: 'dark'};
        this.closeIcon = { name: 'close', label: 'Close', color: 'dark' };
        this.sortField = this.defaultSort ? this.defaultSort : '';
        this.reverse = this.defaultReverse ? true : false;
        this.deletable = this.deletable || true;
        this.viewable = this.viewable || false;
        this.editable = this.editable || false;
        this.search = false;
        this.searchText = '';

        this.picklistService = PicklistService.getService();
        this.appDataService = AppDataService.getService();

        this.mapProjection();

      }

      $onChanges(changes) {
<<<<<<< HEAD
=======
        console.log(changes);
>>>>>>> 1b27233af97ecfdafce3537b720bedd252fefb92
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

            // need to append properties 'deletable', 'editable', 'viewable'
            if (item._url === 'submission') {
<<<<<<< HEAD
              row.deletable = this.canDeleteSubmission(item);
              row.editable = this.canEditSubmission(item);
              row.viewable = this.canViewSubmission(item);
            }

            if (item._url === 'dossier') {
              row.deletable = this.canDeleteDossier(item);
              row.editable = this.canEditDossier(item);
=======
              if (item._state === 'Sent') {
                row.deletable = false;
                row.editable = false;
                row.viewable = true;
              }
              else {
                row.deletable = true;
                row.editable = true;
                row.viewable = false;
              }
            }

            if (item._url === 'dossier') {
              row.editable = true;
              if (item._state === 'active') {
                // check if it has no submissions first
                row.deletable = true;
              }
>>>>>>> 1b27233af97ecfdafce3537b720bedd252fefb92
            }

            row.push(item['_id']);

<<<<<<< HEAD
            // convert times
            for (let col of row) {
              try {
                let date = Date.parseDate(col);
                col = date.toUTCString();
              }
              /* eslint-disable no-empty */
              catch(e) {}
=======
            for (let col of row) {
              try {
                console.log(col);
                let date = Date.parseDate(col);
                console.log(date);
                col = date.toUTCString();
              }
              catch(e) {
                console.log('not a date');
              }
>>>>>>> 1b27233af97ecfdafce3537b720bedd252fefb92
            }
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
        console.log('here');
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
              // console.log(JSON.parse(results.data));

              return mappings;
            });
        }
      }

<<<<<<< HEAD
      // BUSINESS RULES FOR WORKFLOW

      // can delete if in-progress or packaged
      canDeleteSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_IN_PROGRESS));
      }

      // if in-progress, will be set to packaged by packager
      // if packaged, can set to sent or back to in-progress
      // if sent, cannot change
      canEditSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_PACKAGED));
      }

      // can view submission if packaged or sent
      canViewSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_SENT) ||
                state.test(SUBMISSION_STATUS_PACKAGED));
      }

      // can delete dossier if there are no sent submissions
      canDeleteDossier(item) {
        const state = new RegExp(item._state, 'i');
        if (state.test(DOSSIER_STATUS_CLOSED)) return false;
        return true;
      }

      // if dossier is open, can closed if all submissions are sent
      // if dossier is closed, can open
      canEditDossier(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(DOSSIER_STATUS_OPEN))
      }
=======
>>>>>>> 1b27233af97ecfdafce3537b720bedd252fefb92
    }
  })
  .name;