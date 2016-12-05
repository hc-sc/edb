import angular from 'angular';

export default class BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, url, $scope) {
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.url = url;
    this.picklistService = PicklistService.getService();
    this.appDataService = AppDataService.getService();
    this.modelService = ModelService;
    this.sidenavOpen = false;
    this.loading = true;

    this.$scope = $scope;
  }

  init() {
    return this.getAppData()
    .then(records => {
      this.records = JSON.parse(records.data);
      this.selected = this.records[0];
      console.log("View Data: " + JSON.stringify(this.selected));
    });
  }

  getAppData(data = {}, url = this.url) {
    return this.appDataService.edb_get({url, data});
  }

  createAppData(data = {}, url = this.url) {
    return this.appDataService.edb_put({url, data});
  }

  updateAppData(data = {}, url = this.url) {
    return this.appDataService.edb_post(data);
  }

  deleteAppData(id, url = this.url) {}

  getPicklist(typename) {
    return this.picklistService.edb_get({ 'TYPE_NAME': typename });
  }

  getModel(prop) {
    return this.modelService.getModel(prop);
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

  add(prop) {
    this.selected = angular.copy(this.getModel(prop));
  }

  // update an item in the database
  save() {
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

  addTblItem(nodeName) {
    this.$mdDialog.show(this.buildModal(nodeName, this.selected.length, true))
    .then(item => {
      let newArray = this.selected[nodeName].slice();
      newArray.splice(this.selected.length, 0, item);
      this.selected[nodeName] = newArray;
    });
  }

  // enables selection from tables
  selectTblItem(nodeName, index) {
    this.$mdDialog.show(this.buildModal(nodeName, index, false))
    .then(item => {
      this.getRef(nodeName)[index] = item;
      this.selected = angular.copy(this.selected);
      this.showMessage('Updated');
    });
  }

  // used to display notifications to the user
  showMessage(message) {
    this.$mdToast.show(
      this.$mdToast.simple()
      .textContent(message)
      .hideDelay(1200)
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
  buildModal(nodeName, index, isNew) {
    const {template, controller} = getModalValues(nodeName);
    return {
      template,
      controller,
      controllerAs: '$ctrl',
      locals: {
        index,
        node: isNew ? this.getModel(nodeName) : angular.copy(this.getRef(nodeName)[index]),
        picklists: this.picklists,
        picklistService: this.picklistService,
        $scope: this.$scope
      }
    };
  }

  getRef(path) {
    let ref = path.split('.');
    let end = this.selected;
    for (let item of ref) {
      end = end[item];
    }
    return end;
  }
}

// in the future, use templateURL instead to cut down on imports
// we can also use index.js single export method
import ContactPersonCtrl from '../legal-entities/contact-person/contact-person.controller';
import contactPersonTemplate from '../legal-entities/contact-person/contact-person.template';
import LegalEntityIdentifierCtrl from '../legal-entities/identifier/identifier.controller';
import legalEntityIdentifierTemplate from '../legal-entities/identifier/identifier.template';
import SubstanceIdentifierCtrl from '../substances/identifier/identifier.controller';
import substanceIdentifierTemplate from '../substances/identifier/identifier.template';
import DossierRACtrl from '../description/dossier-ra/dossier-ra.controller';
import dossierRATemplate from '../description/dossier-ra/dossier-ra.template';
import ReferencedDossierCtrl from '../description/referenced-dossier/referenced-dossier.controller';
import referencedDossierTemplate from '../description/referenced-dossier/referenced-dossier.template';
import FileRACtrl from '../files/file-ra/file-ra.controller';
import fileRATemplate from '../files/file-ra/file-ra.template';
import contentStatusHistoryTemplate from '../documents/content-status-history/content-status-history.template';
import contentStatusHistoryCtrl from '../documents/content-status-history/content-status-history.controller';

function getModalValues(nodeName ) {
  // let ref = nodeName.split('.');
  // nodeName = ref[ref.length-1];
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

    case 'dossierra':
      return {
        template: dossierRATemplate,
        controller: DossierRACtrl
      };

    case 'referenceddossier':
      return {
        template: referencedDossierTemplate,
        controller: ReferencedDossierCtrl
      };

    case 'filera':
      return {
        template: fileRATemplate,
        controller: FileRACtrl
      };

    case 'documentgeneric.contentstatushistory':

      return {
        template: contentStatusHistoryTemplate,
        controller: contentStatusHistoryCtrl
      };

    default:
      console.log("No matching node name");
      return null;
  }
}