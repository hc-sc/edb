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
    isOpen: '<',
    onSelect: '&',
    onAdd: '&'
  },
  controller: class SidenavCtrl {
    constructor() {
      this.searchText = '';
      this.listOpen = false;
    }

    $onChanges(changes) {
      // this shouldn't run on every change, it will consume a lot of resources with long lists
      if (this.items) {
        this.items.sort((a, b) => {
          return this.getMain(a) >= this.getMain(b);
        });
        this.sorted = true;
      }
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
  }
})
.name;