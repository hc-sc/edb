import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entities.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import ModelService from '../../services/model.service';
import BaseCtrl from '../common/base.controller';

import modelLegalEntity from '../../view-models/gen/legalentity.json';
import modelContactAddress from '../../view-models/gen/contactaddress.json';
import modelLegalEntityIdentifier from '../../view-models/gen/legalentityidentifier.json';
import modelContactPerson from '../../view-models/gen/contactperson.json';

export default angular.module('legalEntities', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService,
  ModelService
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

      this.picklists = {
        legalEntityIdentifierTypes: this.legalEntityIdentifierTypes
      };

      this.init().then(() => {this.loading = false;});
      this.getModels();
    }

    getModels() {
      this.modelContactAddress = Object.assign(modelContactAddress.fields);
      this.modelContactPerson = Object.assign(modelContactPerson.fields);
      this.modelLegalEntityIdentifier = Object.assign(modelLegalEntityIdentifier.fields);
      this.modelLegalEntity = Object.assign(modelLegalEntity.fields);
      this.modelLegalEntity.contactaddress = Object.assign(this.modelContactAddress);
      this.modelLegalEntity._url = this.url;
    }

    getModel() {
      return angular.copy(this.modelLegalEntityIdentifier);
    }

    add() {
      this.selected = angular.copy(this.modelLegalEntity);
    }

    updateContactAddress(prop, value) {
      this.selected.contactaddress[prop] = value;
    }
  }
})
.name;