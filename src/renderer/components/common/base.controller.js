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
  }

  init() {
    return this.getAppData()
    .then(records => {
      this.records = JSON.parse(records.data);
      this.selected = this.records[0];
    });
  }

  getAppData(data = {}, url = this.url) {
    return this.appDataService.edb_get({url, data});
  }

  createAppData(data = {}, url = this.url) {
    console.log('here');
    return this.appDataService.edb_put({url, data});
  }

  updateAppData(data = {}, url = this.url) {
    return this.appDataService.edb_post(data);
  }

  deleteAppData(id, url = this.url) {}

  getPicklist(typename) {
    return this.picklistService.edb_get({ 'TYPE_NAME': typename });
  }

  // generates a picklist item.
  // prop - the node your changing
  // arr - the array of picklist items used to population the select field
  // value - the new picklist value
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

  // update an item in the database
  save() {
    console.log(this.selected);
    // if it doesn't have an id, it's a new item that has been in the database yet
    if (!this.selected.hasOwnProperty('_id')) {
      this.createAppData(angular.copy(this.selected))
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        this.showMessage(err);
      });
    }
    else {
      this.updateAppData(angular.copy(this.selected))
      .then(result => {
        this.showMessage('Saved successfully');
      })
      .catch(err => {
        this.showMessage(err);
      });
    }
  }

  // update the field values, only works for first level deep items
  // overload it if you need additional ones
  update(prop, value) {
    this.selected[prop] = value;
  }

  // toggles whether the sidenav component is open or not for listable components
  toggleList() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  deleteTblItem(nodeName, index) {
    // need to change the reference so the lists know to update
    this.selected[nodeName] =
      this.selected[nodeName].slice(0, index).concat(this.selected[nodeName].slice(index+1));
  }

  // enables selection from tables
  selectTblItem(nodeName, index) {
    this.$mdDialog.show(this.buildModal(nodeName, index))
    .then(item => {
      this.selected[nodeName][index] = item;
      this.selected[nodeName] = this.selected[nodeName].slice();
      this.showMessage('Updated');
    }, item => {
      this.showMessage('Cancelled');
    });
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

  // updates which sidenav item is being modified
  updateSelected(data) {
    this.selected = this.records.filter(record => {
      return record.id === data.id;
    })[0];
  }

  // used to compare current node to a valid or old node (for validation and/or updating metadata status)
  equals(node1, node2) {}

  // used as a generic function to build our modals
  buildModal(nodeName, index) {
    console.log(nodeName, index);
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

// in the future, use templateURL instead to cut down on imports
import ContactPersonCtrl from '../legal-entities/contact-person/contact-person.controller';
import contactPersonTemplate from '../legal-entities/contact-person/contact-person.template';
import LegalEntityIdentifierCtrl from '../legal-entities/identifier/identifier.controller';
import legalEntityIdentifierTemplate from '../legal-entities/identifier/identifier.template';
import SubstanceIdentifierCtrl from '../substances/identifier/identifier.controller';
import substanceIdentifierTemplate from '../substances/identifier/identifier.template';

function getModalValues(nodeName) {
  switch(nodeName) {
    case 'contactperson':
      return {
        template: contactPersonTemplate,
        controller: ContactPersonCtrl
      };

    case 'legalentityidentifier':
      return {
        template: legalEntityIdentifierTemplate,
        controller: LegalEntityIdentifierCtrl
      };

    case 'substanceidentifier':
      return {
        template: substanceIdentifierTemplate,
        controller: SubstanceIdentifierCtrl
      };

    default:
      return null;
  }
}