import angular from 'angular';
import AppDataService from '../../services/app.data.service';
import PicklistService from '../../services/picklist.service';

export default class BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, url) {
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.url = url;
    this.picklistService = PicklistService.getService();
    this.appDataService = AppDataService.getService();
    this.sidenavOpen = false;
    this.loading = true;

    this.getAppData().then(records => {
      this.records = JSON.parse(records.data);
      this.selected = this.records[0];
      console.log(this.selected);

      this.loading = false;
    });
  }

  getAppData(data = {}, url = this.url) {
    return this.appDataService.edb_get({url, data});
  }

  createAppData(data = {}, url = this.url) {
    return this.appDataService.edb_put({url});
  }

  updateAppData(data = {}, url = this.url) {
    return this.appDataService.edb_post(data);
  }

  deleteAppData(id, url = this.url) {}

  getPicklist(typename) {
    return this.picklistService.edb_get({ 'TYPE_NAME': typename });
  }

  createPicklistItem(prop, arr, value) {
    return this.picklistService.edb_put(value)
    .then(result => {
      let item = JSON.parse(result.data);
      this[arr].push(item);

      // need to allow the select component to update BEFORE assigning a new selected
      // in the future, have the select component use lifecycle methods to return when it is finished
      setTimeout(() => {
        this.selected[prop] = item._id;
      }, 200);

      this.showMessage(value.valuedecode + ' added successfully!');
    })
    .catch(err => {
      this.showMessage('Error creating new picklist item');
    });
  }

  getGHSTS() {}

  toggleList() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  addItem() {

  }

  deleteItem() {

  }

  // used to display notifications to the user
  showMessage(message) {
    this.$mdToast.show(
      this.$mdToast.simple()
      .textContent(message)
      .position('bottom')
      .hideDelay(2000)
    );
  }

  updateSelected(data) {
    this.selected = this.records.filter(record => {
      return record.id === data.id;
    })[0];
  }

  // used to compare current node to a valid or old node (for validation and/or updating metadata status)
  equals(node1, node2) {}

  // enables selection from tables
  selectItem(nodeName, index) {
    this.$mdDialog.show(this.buildModal(nodeName, index))
    .then(item => {
      console.log(item, this.selected[nodeName][index]);
      this.selected[nodeName][index] = item;
      this.selected[nodeName] = this.selected[nodeName].slice();
      this.showMessage('Updated');
    }, item => {
      this.showMessage('Cancelled');
    });
  }

  // used as a generic function to build our modals
  buildModal(nodeName, index) {
    const {template, controller} = getModalValues(nodeName);
    return {
      template,
      controller,
      controllerAs: '$ctrl',
      locals: {
        index,
        node: angular.copy(this.selected[nodeName][index])
      }
    };
  }
}

// in the future, use templateURL instead
import ContactPersonCtrl from '../legal-entities/contact-person/contact-person.controller';
import contactPersonTemplate from '../legal-entities/contact-person/contact-person.template';
import LegalEntityIdentifierCtrl from '../legal-entities/identifier/identifier.controller';
import legalEntityIdentiferTemplate from '../legal-entities/identifier/identifier.template';

function getModalValues(nodeName) {
  switch(nodeName) {
    case 'contactperson':
      return {
        template: contactPersonTemplate,
        controller: ContactPersonCtrl
      };

    case 'legalentityidentifier':
      return {
        template: legalEntityIdentiferTemplate,
        controller: LegalEntityIdentifierCtrl
      }
    default:
      return null;
  }
}