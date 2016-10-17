import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import template from './sidenav.template';

import './sidenav.scss';

export default angular.module('sidenav', [
  uiRouter,
  ngMaterial
])
.component('sidenav', {
  template,
  bindings: {
    items: '<',
    onSelect: '&'
  },
  controller: class SidenavCtrl {
    constructor() {
      this.searchText = '';
      this.listOpen = true;
    }

    toggleList() {
      this.listOpen = !this.listOpen;
    }

    select(item) {
      this.onSelect({ item });
    }
  }
})
.name;