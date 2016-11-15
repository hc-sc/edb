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
      console.log(this.picklists);
      // PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_LEGALENTITY_TYPE' })
      // .then(items => { console.log(items); });

      // PicklistService.getService().edb_get({ 'TYPE_NAME': 'EXTENSION_TYPE_COUNTRY' })
      // .then(items => { console.log(items); });
    }
  }
})
.name;