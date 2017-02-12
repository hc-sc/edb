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
    selected: '<',
    main: '@',
    isOpen: '=',
    onSelect: '&',
    onAdd: '&'
  },
  controller: class SidenavCtrl {
    constructor() {
      this.searchText = '';
    }

    getMain(item) {
      let ref = item;
      let props = this.main.split('.');
      for (let prop of props) {
        ref = ref[prop];
      }
      return ref;
    }

    select(item) {
      this.onSelect({ item });
    }

    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
})
.name;