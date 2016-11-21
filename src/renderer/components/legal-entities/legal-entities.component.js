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

      this.legalEntityTypes = JSON.parse(this.legalEntityType.data);
      this.legalEntityIdentifierTypes = JSON.parse(this.legalEntityIdentifierType.data);
      this.countries = JSON.parse(this.countries.data);

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

    createPicklistItem(prop, arr, value) {
      console.log(prop, value);
      return this.picklistService.edb_put(value)
      .then(result => {
        let item = JSON.parse(result.data);
        console.log(item._id, this.selected[prop]);
        this[arr].slice().concat(item);
        this.selected[prop] = item._id;
        console.log(this.selected[prop]);

        this.showMessage(value.valuedecode, 'added successfully!');
      })
      .catch(err => {
        this.showMessage('Error creating new picklist item');
      });
    }

    update(prop, value) {
      this.selected[prop] = value;
    }
  }
})
.name;