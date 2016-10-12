import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mdDataTable from 'angular-material-data-table';
import template from'./tbl.template';

import Toolbar from '../toolbar/toolbar.component';

export default angular.module('tbl', [
  uiRouter,
  mdDataTable
])
.component('tbl', {
  template,
  bindings: {
    headers: '<',
    rows: '<',
    selected: '=',
    functions: '<'
  }
})
.name;