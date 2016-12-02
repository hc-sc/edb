import angular from 'angular';

import modelLegalEntity from '../view-models/gen/legalentity.json';
import modelContactAddress from '../view-models/gen/contactaddress.json';
import modelLegalEntityIdentifier from '../view-models/gen/legalentityidentifier.json';
import modelContactPerson from '../view-models/gen/contactperson.json';

export default angular.module('ModelService', [])
.service('ModelService', class ModelService {
  constructor() {}
  getModel(prop) {
    let model = {};
    switch(prop) {
      case 'contactaddress':
        return Object.assign(modelContactAddress.fields);
      case 'legalentityidentifier':
        return Object.assign(modelLegalEntityIdentifier.fields);
      case 'contactperson':
        return Object.assign(modelContactPerson.fields);
      case 'legalentity':
        model = Object.assign(modelLegalEntity.fields);
        model.contactaddress = this.getModel('contactaddress');
        model._url = 'legalentity';
        return model;
    }
  }
})
.name;

