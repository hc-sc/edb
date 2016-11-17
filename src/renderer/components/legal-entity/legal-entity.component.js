import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './legal-entity.template';

import TextInput from '../common/text-input/text-input.component';
import SelectInput from '../common/select-input/select-input.component';
import SelectInputExtensible from '../common/select-input-extensible/select-input-extensible.component';

export default angular.module('legalEntity', [
  ngMaterial,
  TextInput,
  SelectInput,
  SelectInputExtensible
])
.component('legalEntity', {
  template,
  bindings: {
    legalEntities: '<',
    id: '<',
    picklists: '<'
  },
  controller: class LECtrl {
    constructor() {
      // if (this.legalEntities) {
      //   this.le = legalEntities.data.legalentities.legalentity.filter(item => {
      //     if
      //   })
      // }
      // this.le = this.legalEntities ? this.legalEntities : new LegalEntity();
      // console.log(this.le);

      console.log(this);
    }

    update(prop, value) {
      this.le[prop] = value;
      console.log(prop, value);
    }
  }
})
.name;

class LegalEntity {
  constructor() {
    this.metadatastatus = '';
    this.legalentitypid = '';
    this.legalentityname = '';
    this.legalentitytype = '';
    this.othername = '';
    this.legalentityidentifier = [];
    this.legalentityidentifierprojection = [];
    this.contactaddress = {
      street1: '',
      street2: '',
      zipcode: '',
      city: '',
      state: '',
      country: {
        value: '',
        valuedecode: ''
      },
      phone: '',
      fax: '',
      email: '',
      website: ''
    },
    this.contactperson = {
      organization: '',
      department: '',
      title: '',
      firstname: '',
      lastname: '',
      phone: '',
      mobile: '',
      fax: '',
      email: ''
    }
  }
}