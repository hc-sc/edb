import angular from 'angular';
import BaseCtrl from '../common/base.controller';

import modelSubstance from '../../view-models/gen/substance.json';
import modelSubstanceIdentifier from '../../view-models/gen/substanceidentifier.json';


export class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, $scope) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'substance', $scope);
    this.metadataStatusOptions = JSON.parse(this.metadataStatusOptions.data);
    this.identifierTypeOptions = JSON.parse(this.identifierTypeOptions.data);
    this.identifierProjection = [
      'identifier',
      'substanceidentifiertype'
    ];
    this.init().then(() => {this.loading = false;});
    this.getModels();
  }

  getModels() {
    this.modelSubstance = Object.assign(modelSubstance.fields);
    this.modelSubstanceIdentifier = Object.assign(modelSubstanceIdentifier.fields);
    this.modelSubstance._url = this.url;
  }

  add() {
    this.selected = angular.copy(this.modelSubstance);
  }

  // save() {
  //   this.updateAppData(angular.copy(this.selected))
  //     .then(result => {
  //       this.showMessage('Saved successfully');
  //     })
  //     .catch(err => {
  //       this.showMessage(err);
  //     });
  // }

  // createPicklistItem(prop, arr, value) {
  //   console.log(prop, value);
  //   return this.picklistService.edb_put(value)
  //     .then(result => {
  //       let item = JSON.parse(result.data);
  //       console.log(item._id, this.selected[prop]);
  //       this[arr].slice().concat(item);
  //       this.selected[prop] = item._id;
  //       console.log(this.selected[prop]);

  //       this.showMessage(value.valuedecode, 'added successfully!');
  //     })
  //     .catch(err => {
  //       this.showMessage('Error creating new picklist item');
  //     });
  // }

  // update(prop, value) {
  //   this.selected[prop] = value;
  // }
  // select(name, index) {
  //   this.$mdDialog.show({
  //     template: identifierTemplate,
  //     controllerAs: '$ctrl',
  //     controller: IdentiferCtrl,
  //     locals: {
  //       index,
  //       identifer: this.selected.substanceidentifier[index],
  //       identifierTypeOptions: this.identifierTypeOptions
  //     }
  //   })
  //     .then(item => {
  //       console.log(item);
  //       this.selected.substanceidentifier[index] = item;
  //       // angular doesn't trigger update if just one element is updated, need to change the object itself
  //       this.selected.substanceidentifier = this.selected.substanceidentifier.slice();
  //     }, item => {
  //       console.log('cancelled ', item);
  //     });
  // }
  // delete(name, index) {
  //   console.log(index);
  // }
}