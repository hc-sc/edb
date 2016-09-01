import angular from 'angular';
import { ValueStruct, ExtValueStruct } from '../shared/shared.model';
import { Substance, SubstanceIdentifierStruct } from './substance.model';
import _lodash from 'lodash';
import {name as pickListService} from '../shared/services/picklist.service';

export default class SubstanceCtrl {
  constructor($mdDialog, substanceService, picklistService) {
    this.$mdDialog = $mdDialog;
    this.substanceService = substanceService;
    this.pickListService = picklistService;
    this.selected = null;
    this.substances = [];
    this.selectedIndex = -1;
    this.filterText = null;

    // options for metadata status
    this.pickListService.getType('TYPE_METADATA_STATUS')
      .then(metadataStatusOptions => {
        console.log(metadataStatusOptions);
        this.metadataStatusOptions = metadataStatusOptions;
        return this.pickListService.getType('EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE');
      }).then(identifierTypeOptions => {
        // options for identifier types
        console.log(identifierTypeOptions);
        this.identifierTypeOptions = identifierTypeOptions;
      })

    this.getAllSubstances();
  }

  getOtherValue() {
    return this.pickListService.getOtherValue();
  }

  confirmLeavePage($event) {
    // confirm with user if the form has been modified before leaving the page   
    var scope = angular.element($event.target.ownerDocument.substanceForm).scope();
    let isFormPristine = scope.substanceForm.$pristine;
    if (!isFormPristine) {
      $event.preventDefault();
      // ask the user to confirm before leaving page
      let confirm = this.$mdDialog.confirm()
        .title('Form Modified')
        .content('Are you sure you want to leave this page?')
        .ok('Yes')
        .cancel('No')
        .targetEvent($event);

      this.$mdDialog.show(confirm).then(() => {
        console.log('taking the user to the page');
        this.$location.path('/manage');
      })
    }
  }

  toggleSidenav(componentId) {
    // toggle the side nave by component identifer 
    this.$mdSidenav(componentId).toggle();
  }

  updateSelectedStatusDecode() {
    // update metadata status value decode upon selection change
    let mDSValue = this.selected.METADATA_STATUS.VALUE;
    // find the value decode in themetadata status options
    let mDSValueDecode = _lodash(this.metadataStatusOptions)
      .filter(c => c.VALUE == mDSValue)
      .map(c => c.VALUE_DECODE)
      .value()[0];
    this.selected.METADATA_STATUS.VALUE_DECODE = mDSValueDecode;
  }

  updateIdTypeDecodeByIdentifierIndex(identiferIndex) {
    // update identifer type value decode by identifier index upon selection change
    let selectedIdentifier = this.selected.SUBSTANCE_IDENTIFIER[identiferIndex];
    let selectedTypeValue = selectedIdentifier.SUBSTANCE_IDENTIFIER_TYPE.VALUE;
    // find value decode from identifierTypeOptions
    if (selectedTypeValue === this.getOtherValue()) {
      selectedIdentifier.SUBSTANCE_IDENTIFIER_TYPE.ATTR_VALUE = '';
      selectedIdentifier.SUBSTANCE_IDENTIFIER_TYPE.VALUE_DECODE = '';
    } else {
      delete selectedIdentifier.SUBSTANCE_IDENTIFIER_TYPE.ATTR_VALUE;
      selectedIdentifier.SUBSTANCE_IDENTIFIER_TYPE.VALUE_DECODE = _lodash(this.identifierTypeOptions)
        .filter(c => c.VALUE == selectedTypeValue)
        .map(c => c.VALUE_DECODE)
        .value()[0];
    }
  }

  _setFormPrestine($event) {
    // private - set the to its prestine state after save or update
    var scope = angular.element($event.target.ownerDocument.substanceForm).scope();
    scope.substanceForm.$setPristine();
  }

  addSubstance() {
    let substance = new Substance();
    substance.SUBSTANCE_NAME = 'New';
    this.substances.push(substance);
    this.selected = substance;
    this.selectedIndex = this.substances.length - 1;
  }

  saveSubstance($event) {
    let self = this;
    var scope = angular.element($event.target.ownerDocument.substanceForm).scope()['substanceForm'];
    var isValid = scope.$valid;
    var err = scope.$error;

    if(!isValid) {
        var errMsg = {};
        Object.keys(err).map(item => {
          errMsg[err[item][0].$name] = err[item][0].$name + ' is required.';
        });
        self.$mdDialog.show(
          self.$mdDialog
            .alert()
            .clickOutsideToClose(true)
            .title('Validate fail')
            .content(errMsg)
            .ok('Ok')
            .targetEvent($event)
        );
    } else {
    // reset form state
    this._setFormPrestine($event);

    if (this.selected && this.selected._id) {
      this.substanceService.edb_post(this.selected).then(affectedRows =>
        self.$mdDialog.show(
          self.$mdDialog
            .alert()
            .clickOutsideToClose(true)
            .title('Success')
            .content('Data Updated Successfully!')
            .ok('Ok')
            .targetEvent($event)
        )
      );
    }
    else {
      this.substanceService.edb_put(this.selected).then(affectedRows =>
        self.$mdDialog.show(
          self.$mdDialog
            .alert()
            .clickOutsideToClose(true)
            .title('Success')
            .content('Data Added Successfully!')
            .ok('Ok')
            .targetEvent($event)
        )
      );

      // refresh the substance list
      self.getAllSubstances();
    }
    }
  }

  addSubstanceIdentfier() {
    let idType = new ExtValueStruct('', '');
    let identifier = new SubstanceIdentifierStruct(idType, '');
    this.selected.SUBSTANCE_IDENTIFIER.push(identifier);
  }

  deleteSubstanceIdentfier(identifier, event) {
    let confirm = this.$mdDialog.confirm()
      .title('Are you sure?')
      .content('Are you sure you want to delete this substance identifier?')
      .ok('Yes')
      .cancel('No')
      .targetEvent(event);

    this.$mdDialog.show(confirm).then(() => {
      _lodash.remove(this.selected.SUBSTANCE_IDENTIFIER, { IDENTIFIER: identifier });
      this.substanceService.update(this.selected);
    });
  }

  resetSubstance() {
    this.selected = null;
    this.selectedIndex = -1;
  }

  deleteSubstance($event) {
    let confirm = this.$mdDialog.confirm()
      .title('Are you sure?')
      .content('Are you sure you want to delete this substance?')
      .ok('Yes')
      .cancel('No')
      .targetEvent($event);

    this.$mdDialog.show(confirm).then(() => {
      let self = this;
      self.substanceService.edb_delete(self.selected._id)
        .then(affectedRows => {
          self.substances.splice(self.selectedIndex, 1);
          self.selectSubstance(0, 0);
        });
    });
  }

  selectSubstance(substance, index) {
    this.selected = angular.isNumber(substance) ? this.substances[substance] : substance;
    this.selectedIndex = angular.isNumber(substance) ? substance : index;
  }

  filterSubstance() {
    if (this.filterText) {
      this.substanceService.listByName(this.filterText).then(substances => {
        this.substances = [].concat(substances);
        this.selected = substances[0];
        this.selectedIndex = 0;
      });
    } else {
      this.filterText = null;
      this.getAllSubstances();
    }
  }

  getAllSubstances() {
    let self = this;
    this.substanceService.edb_get().then(substances => {
      self.substances = [].concat(substances);
      self.selectedIndex = 0;
      self.selected = substances[0];
    });
  }

  cancelEdit() {
    console.log('cancelEdit called');
    this.substanceService.jsonToXml(this.selected)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

    this.substanceService.edb_get()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

    this.substanceService.edb_get({SUBSTANCE_NAME:'New'})
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

  }
}
