import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav
])
.component('legalEntities', {
  template,
  bindings: {
    picklists: '<'
  },
  controller: class LECtrl {
    constructor() {
      console.log(this.picklists);
      this.typeValues = this.picklists.data;

    }
  }
})
.name;