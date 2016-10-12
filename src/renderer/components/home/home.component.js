import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import DossierService from '../../services/dossier.service';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  Toolbar,
])
.component('home', {
  template,
  bindings: {
    dossiers: '<'
  },
  controller: class HomeCtrl {
    constructor($state) {
      this.$state = $state;
      this.toolbarItems = {
        navIcons: [],
        title: 'eDossier Builder',
        functionIcons: [
          { name: 'settings', state: 'settings', label: 'Settings' },
          { name: 'help', label: 'Help' }
        ]
      };

      this.selected = [];
      this.query = {
        orderBy: 'name',
        order: 'asc',
        filter: '',
        limit: 1,
        page: 1
      };
      this.results = this.dossiers.slice();
    }

    /**
     * queries the db to return the matching query params
     */
    getDossiers() {
      this.results = this.results.slice();
    }

    trigger(index) {
      this.$state.go('dossier', { dossierPID: this.results[index].DOSSIER_PID });
    }
  }
})
.service('DossierService', DossierService)
.name;