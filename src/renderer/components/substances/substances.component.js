import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './substances.template';

import Sidenav from '../common/sidenav/sidenav.component';

export default angular.module('substances', [
  ngMaterial,
  Sidenav
])
.component('substances', {
  template,
  controller: class SubstancesCtrl {
    constructor() {
      this.items = [
        { name: 'First' },
        { name: 'Second' }
      ];
    }

    select(item) {
      console.log(item);
    }
  }
})
.name;