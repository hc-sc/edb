import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import BaseCtrl from '../common/base.controller';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
.component('legalEntities', {
  template,
  bindings: {
    legalEntityType: '<',
    legalEntityIdentifierType: '<',
    countries: '<'
  },
  controller: class LECtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'legalentity');

      let legalEntityTypes = JSON.parse(this.legalEntityType.data);
      let legalEntityIdentifierTypes = JSON.parse(this.legalEntityIdentifierType.data);
      let countries = JSON.parse(this.countries.data);

    }

    add(item) {
      this.showMessage('hi there');
    }

    save() {
      console.log(this.selected);
    }

    toggleList() {
      this.sidenavOpen = !this.sidenavOpen;
    }

    createPLI(value) {
      console.log(value.TYPE_NAME);
      this.createPicklistItem(value)
      .then(results => {
        this[value.TYPE_NAME].push(results);
      });
    }


    update(prop, value) {
      this.selected[prop] = value;
    }
  }
})
.name;