import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './files.template';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import BaseCtrl from '../common/base.controller';

import modelFile from '../../view-models/gen/file.json';
// import modelContactAddress from '../../view-models/gen/contactaddress.json';
// import modelLegalEntityIdentifier from '../../view-models/gen/legalentityidentifier.json';
// import modelContactPerson from '../../view-models/gen/contactperson.json';

export default angular.module('files', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
.component('files', {
  template,
  bindings: {
    fileType: '<',
    contentStatus: '<'
  },

  controller: class FileCtrl extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'file');

      this.fileType = JSON.parse(this.fileType.data);
      this.contentStatus = JSON.parse(this.contentStatus.data);

      this.init().then(() => {this.loading = false;});
      this.getModels();
    }

    getModels() {
      this.modelFile = Object.assign(modelFile.fields);
      // this.modelContactPerson = Object.assign(modelContactPerson.fields);
      // this.modelLegalEntityIdentifier = Object.assign(modelLegalEntityIdentifier.fields);
      // this.modelLegalEntity = Object.assign(modelLegalEntity.fields);
      // this.modelLegalEntity.contactaddress = Object.assign(this.modelContactAddress);
      this.modelFile._url = this.url;
      // this.modelLegalEntity.legalentitytype = this.legalEntityTypes[0];
      // this.modelLegalEntity.contactaddress.country = this.countries[0];
    }

    add() {
      this.selected = angular.copy(this.modelFile);
    }

    // updateContactAddress(prop, value) {
    //   this.selected.contactaddress[prop] = value;
    // }
  }
})
.name;