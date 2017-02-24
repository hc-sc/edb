import angular from 'angular';
import {equals} from 'easy-equals';
import GhstsPid from '../../../utils/pid';
import NestedPropertyProc from '../../../utils/nested-property.process';
import _ from 'lodash';

export default class BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, url, $scope, GhstsService, $transitions) {
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.url = url;
    this.modelService = ModelService;
    this.sidenavOpen = false;
    this.loading = true;

    this.picklistService = PicklistService.getService();
    this.appDataService = AppDataService.getService();
    this.ghstsService = GhstsService.getService();
    this.receivers;
    this.ghsts;
    this.$scope = $scope;
    this.$scope.$root.loading = true;
    this.oriSelected = {};
    this.selectedIndex = -1;
    this.isDirt = false;
    this.dereg = $transitions.onBefore({}, (trans) => {
      return this.dirtCheck();
    });
  }

  init(id) {
    return this.getAppData()
      .then(records => {
        console.log('records: ', records);
        this.records = [].concat(JSON.parse(records.data));
        if (this.records && this.records.length > 0) {
          // there is some data in the db
          this.sortData();
          if (id) 
            this.resetSelected(id);
          else {
            this.selectedIndex = 0;
            this.selected = this.records[this.selectedIndex];
            this.oriSelected = _.merge({}, this.selected);
          }
        }
        else {
          // empty table, need to prompt to create first
          console.log('EMPTY ON INIT');
        }
        // console.log("View Data: " + JSON.stringify(this.selected));
      });
  }

  // return some global item(s)
  getAppData(data = {}, url = this.url) {
    if (this.isSubmission && url === this.url) {
      this.ghsts = this.ghstsService.edb_getSync({_submissionid: this.dossierData.submissionid})[0];
      let ids = this.ghsts._receiver.map(item => {
        return item.receiver;
      });
      if (ids.length > 0) {
        this.receivers = this.appDataService.edb_getSync({_url: '/receiver', data: ids });
      }
      if (this.url === 'product') 
        return this.appDataService.edb_get({ url, data: {_id: this.ghsts._product}});
      else if (this.url === 'dossier')
        return this.appDataService.edb_get({ url, data });
      else if (this.url === 'document' || this.url === 'file' || this.url === 'toc') 
        return this.ghstsService.edb_get({url: this.url});
    } else
      return this.appDataService.edb_get({ url, data });
  }

  // create a new item
  createAppData(data = {}, url = this.url) {
    if (this.isSubmission && url === this.url) {
      if (url === 'document' || url === 'file') {
        data._dossier = this.dossierData.dossierid;
        data._ghsts = this.ghsts._id;
        return this.ghstsService.edb_put({url, data});
      } else
        return this.appDataService.edb_put({ url, data });
    } else
      return this.appDataService.edb_put({ url, data });
  }

  // update a item
  updateAppData(data = {}, url = this.url) {
    if (this.isSubmission && url === this.url) {
      if (url === 'document' || url === 'file') {
        data._dossier = this.dossierData.dossierid;  //Do not set _ghsts to allow back-end create new item, if it is required.
        return this.ghstsService.edb_post({url, data});
      } else 
        return this.appDataService.edb_post(data);
    } else
      return this.appDataService.edb_post(data);
  }

  // delete a item
  deleteAppData(id, url = this.url) { }

  // gets the specified list of picklist
  getPicklist(typename) {
    return this.picklistService.edb_get({ 'TYPE_NAME': typename });
  }

  // returns the ghsts item with the given id
  getGHSTS(id, nodeName) {
    return this.ghstsService.edb_get(id, nodeName)
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
        // this solution is not good
        // in the future, have the select component use lifecycle methods to return when it is finished
        setTimeout(() => {
          NestedPropertyProc.setValue(this.selected, prop, item._id);
          // this.selected[prop] = item._id;
        }, 200);

        this.showMessage(value.valuedecode + ' added successfully!');
      })
      .catch(err => {
        this.showMessage('Error creating new picklist item');
      });
  }

  // build a blank object as defined in the xsd
  getModel(prop) {
    return this.modelService.getModel(prop);
  }

  // creates a new blank object to create a new item
  add(prop) {
    this.dirtCheck()
      .then(() => {
        if (this.isDirt) {
          if (this.selectedIndex > -1) 
            this.records[this.selectedIndex] = _.merge({}, this.oriSelected);
          this.isDirt = false;
        }
        this.selectedIndex = -1;
        this.selected = angular.copy(this.getModel(prop));
        this.oriSelected = _.merge({}, this.selected);
        this.showMessage('Adding an new record.');
      });
  }

  // update an item in the database
  save() {
    // if it doesn't have an id, it's a new item that has been in the database yet
    if (!this.selected.hasOwnProperty('_id')) {
      this.createAppData(angular.copy(this.selected))
        .then(result => {
          console.log(result);
          let data = JSON.parse(result.data);
          if (Array.isArray(data))
            data = data[0];
          this.records.push(data);
          this.sortData();
          this.resetSelected(data._id);
          this.showMessage('Saved successfully');
        })
        .catch(err => {
          this.showMessage(err);
        });
    }
    else {
      this.updateAppData(angular.copy(this.selected))
        .then(result => {
          console.log(result);
          let data = JSON.parse(result.data);
          if (Array.isArray(data)) 
            data = data[0];
          this.records[this.selectedIndex] = _.merge({}, data);
          this.sortData();
          this.resetSelected(data._id);
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
    NestedPropertyProc.setValue(this.selected, prop, value);
  }

  // toggles whether the sidenav component is open or not for listable components
  toggleList() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  deleteTblItem(nodeName, index) {
    // need to change the reference so the lists know to update
    let newArray = [];
    if (nodeName.indexOf('.') > 0) {
      let pathAry = nodeName.split('.');
      let topEntity = this.selected[pathAry[0]];
      newArray = this.getRef(nodeName).slice();
      newArray = newArray.slice(0, index).concat(newArray.slice(index + 1));
      topEntity[pathAry[1]] = newArray;
      this.selected[pathAry[0]] = topEntity;
    }
    else {
      this.selected[nodeName] =
        this.selected[nodeName].slice(0, index).concat(this.selected[nodeName].slice(index + 1));
    }
  }

  addTblItem(nodeName) {
    this.$mdDialog.show(this.buildModal(nodeName, this.selected.length, true))
      .then(item => {
        if (this.getRef(nodeName).filter(record => {
          if (nodeName.toLowerCase().endsWith('ra'))
            return record.toSpecificForRAId === item.toSpecificForRAId;
          else
            return equals(record, item);
        }).length !== 0) {
          this.showMessage('Duplicate item');
        }
        else {
          let newArray = [];
          if (nodeName.indexOf('.') > 0) {
            newArray = this.getRef(nodeName).slice();
            newArray.push(item);
            let end = this.selected;
            let path = nodeName.split('.');
            for (let i = 0; i < path.length - 1; ++i) {
              end = end[path[i]];
            }
            end[path[path.length - 1]] = newArray;

          } else {
            newArray = this.selected[nodeName].slice();
            newArray.splice(this.selected.length, 0, item);
            this.selected[nodeName] = newArray;
          }
          // this.showMessage('Saved');
        }
      });
  }

  // enables selection from tables
  selectTblItem(nodeName, index) {
    this.$mdDialog.show(this.buildModal(nodeName, index, false))
      .then(item => {
        console.log(item);
        if (!nodeName.toLowerCase().endsWith('ra') && (this.getRef(nodeName).filter(record => {
          return equals(record, item);
        }).length !== 0)) {
          this.showMessage('Duplicate item');
        }
        else {
          this.getRef(nodeName)[index] = item;
          this.selected = angular.copy(this.selected);
          this.showMessage('Updated');
        }
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
    this.dirtCheck()
      .then(() => {
        if (this.isDirt && this.selectedIndex > -1)
          this.records[this.selectedIndex] = _.merge({}, this.oriSelected);
        this.sortData();
        this.resetSelected(data._id);
        if (!this.isDirt)
          this.$scope.$apply();
        this.isDirt = false;
      });
  }

  // used to compare current node to a valid or old node (for validation and/or updating metadata status)
  equals(node1, node2) { }

  // used as a generic function to build our modals
  buildModal(nodeName, index, isNew) {
    console.log(this.selected);
    const {template, controller} = getModalValues(nodeName);
    return {
      template,
      controller,
      controllerAs: '$ctrl',
      locals: {
        index,
        node: isNew ? angular.copy(this.getModel(nodeName)) : angular.copy(this.getRef(nodeName)[index]),
        picklists: this.picklists,
        picklistService: this.picklistService,
        $scope: this.$scope,
        isSubmission: this.isSubmission,
        curGhsts: this.ghsts
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
    getPid(prefix){
    console.log("generate pid");
   return GhstsPid.generatePid(prefix);
  }

  $onDestroy() {
    // need to deregister the listener or else we end up with multiple calls
    this.dereg();
  }

  dirtCheck(oriString, curString) {
    let oriStr = oriString ? oriString : JSON.stringify(angular.copy(this.oriSelected));
    let curStr = curString ? curString : JSON.stringify(angular.copy(this.selected));
    if (curStr && (oriStr !== curStr)) {
      this.isDirt = true;
      return this.$mdDialog.show(
        this.$mdDialog.confirm()
          .title('Warning, unsaved changes!')
          .content('Leaving this screen will discard all changes!')
          .ok('DISCARD CHANGES')
          .cancel('RETURN')
      );
    } else {
      this.isDirt = false;
      return Promise.resolve(true);
    }
  }

  sortData() {
    this.records.sort((a, b) => {
      let avd = a.valuedecode ? a.valuedecode.toLowerCase() : '', 
        bvd = b.valuedecode ? b.valuedecode.toLowerCase() : '', 
        aid = a._id ? a._id.toLowerCase() : '', bid = b._id ? b._id.toLowerCase() : '';
      return avd < bvd ? -1 : avd > bvd ? 1 : aid > bid ? -1 : aid < bid ? 1 : 0;
    });
  }

  resetSelected(id) {
    for (var i = 0; i < this.records.length; i++) {
      if (this.records[i]._id === id) {
        this.selected = this.records[i];
        this.selectedIndex = i;
        this.oriSelected = _.merge({}, this.selected);
        break;
      }
    }
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

// for document Generic
import contentStatusHistoryTemplate from '../documents/content-status-history/content-status-history.template';
import contentStatusHistoryCtrl from '../documents/content-status-history/content-status-history.controller';
import referenceDocumentTemplate from '../documents/reference-document/reference-document.template';
import referenceDocumentCtrl from '../documents/reference-document/reference-document.controller';
import relatedtosubstanceTemplate from '../documents/related-tosubstance/related-tosubstance.template';
import relatedtosubstanceCtrl from '../documents/related-tosubstance/related-tosubstance.controller';
import referencedtofileTemplate from '../documents/referenced-tofile/referenced-tofile.template';
import referencedtofileCtrl from '../documents/referenced-tofile/referenced-tofile.controller';
import documentNumberTemplate from '../documents/document-number/document-number.template';
import documentNumberCtrl from '../documents/document-number/document-number.controller';

// for document RA
import documentRATemplate from '../documents/document-ra/document-ra.template';
import documentRACtrl from '../documents/document-ra/document-ra.controller';

import senderTemplate from '../receivers/senders/senders.template';
import SenderCtrl from '../receivers/senders/senders.controller';
import ingredientTemplate from '../products/ingredient/ingredient.template';
import IngredientCtrl from '../products/ingredient/ingredient.controller';
import productraTemplate from '../products/product-ra/product-ra.template';
import ProductRACtrl from '../products/product-ra/product-ra.controller';
import receiverSelect from '../receivers/receiver-select/receiver-select.template';
import ReceiverSelectCtrl from '../receivers/receiver-select/receiver-select.controller';


function getModalValues(nodeName) {
  // let ref = nodeName.split('.');
  // nodeName = ref[ref.length-1];
  switch (nodeName) {
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

    case 'documentgeneric.referenceddocument':

      return {
        template: referenceDocumentTemplate,
        controller: referenceDocumentCtrl
      };

    case 'documentgeneric.relatedtosubstance':

      return {
        template: relatedtosubstanceTemplate,
        controller: relatedtosubstanceCtrl
    };

    case 'documentgeneric.documentnumber':

      return {
        template: documentNumberTemplate,
        controller: documentNumberCtrl
      };

    case 'documentgeneric.referencedtofile':

      return {
        template: referencedtofileTemplate,
        controller: referencedtofileCtrl
      };
    
    case 'documentra':

      return {
        template: documentRATemplate,
        controller: documentRACtrl
      };

    case 'ingredients.ingredient':
      return {
        template: ingredientTemplate,
        controller: IngredientCtrl
      };

    case 'productra':
      return {
        template: productraTemplate,
        controller: ProductRACtrl
      };

    case 'sender':
      return {
        template: senderTemplate,
        controller: SenderCtrl
      };

    case 'receiverSelect':
      return {
        template: receiverSelect,
        controller: ReceiverSelectCtrl
      };

    default:
      console.log("No matching node name");
      return null;
  }
}