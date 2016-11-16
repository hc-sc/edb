import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';

import PicklistService from '../../services/picklist.service';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  PicklistService
])
.component('legalEntities', {
  template,
  bindings: {
    legalEntityType: '<',
    legalEntityIdentifierType: '<',
    countries: '<'
  },
  controller: class LECtrl {
    constructor() {
      this.picklists = {
        legalEntityType: JSON.parse(this.legalEntityType.data),
        legalEntityIdentifierType: JSON.parse(this.legalEntityIdentifierType.data),
        countries: JSON.parse(this.countries.data)
      };
    }

    select(item) {
      console.log('selected', item);
    }

    add(item) {
      console.log('hello');
    }
  }
})
.name;