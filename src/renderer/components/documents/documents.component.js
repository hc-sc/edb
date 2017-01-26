import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './documents.template';
import DocumentCtrl from './documents.controller';

import Sidenav from '../common/sidenav/sidenav.component';
import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

import PicklistService from '../../services/picklist.service';
import AppDataService from '../../services/app.data.service';
import BaseCtrl from '../common/base.controller';

export default angular.module('documents', [
  ngMaterial,
  Sidenav,
  TextInput,
  SelectInput,
  SelectInputExtensible,
  PicklistService,
  AppDataService
])
.component('documents', {
  template,
  bindings: {
    metadataStatusType: '<',
    contentStatusType: '<',
    referenceType: '<',
    documentNumberType: '<',
    dataprotectionType: '<',
    datarequirementType: '<',
    raDocumentNumberType: '<',
    dossierData: '<',
    isSubmission: '<'
  },
  controller: DocumentCtrl
})
.name;