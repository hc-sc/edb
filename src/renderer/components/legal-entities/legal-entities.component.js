import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  PicklistService,
  AppDataService
])
.component('legalEntities', {
  template,
  bindings: {
    legalEntities: '<',
    legalEntityType: '<',
    legalEntityIdentifierType: '<',
    countries: '<'
  },
  controller: class LECtrl {
    constructor($state, AppDataService) {
      this.$state = $state;
      this.AppDataService = AppDataService;

      // won't need this line when using db instead of file
      this.legalEntities = this.legalEntities.data.legalentities.legalentity;
      this.selected = this.legalEntities[0];
      console.log(this.selected);

      this.picklists = {
        legalEntityType: JSON.parse(this.legalEntityType.data),
        legalEntityIdentifierType: JSON.parse(this.legalEntityIdentifierType.data),
        countries: JSON.parse(this.countries.data)
      };
    }

    select(item) {
      this.selected = this.legalEntities.filter(le => {
        return le.id === item.id;
      })[0];
    }

    add(item) {
      // this.AppDataService.getService().edb_put({
      //   url: 'legal-entities',
      // });
    }
  }
})
.name;