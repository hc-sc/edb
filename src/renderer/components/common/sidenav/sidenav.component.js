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
    main: '@',
    onSelect: '&',
    onAdd: '&'
  },
  controller: class SidenavCtrl {
    constructor() {
      this.searchText = '';
      this.listOpen = false;
    }

    toggleList() {
      this.listOpen = !this.listOpen;
    }

    select(item) {
      console.log('here');
      this.onSelect({ item });
    }

    add(item) {
      console.log('adding');
      this.onAdd({ item: 'hello' });
    }
  }
})
.name;