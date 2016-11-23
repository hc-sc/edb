
import BaseCtrl from '../common/base.controller';
import IdentiferCtrl from './identifier.controller';
import identifierTemplate from './identifier.Template';



export class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'substance');
    this.metadataStatusOptions = JSON.parse(this.metadataStatusOptions.data);
    this.identifierTypeOptions = JSON.parse(this.identifierTypeOptions.data);
    this.identifierProjection = [
      'identifier',
      'substanceidentifiertype'
    ];
    console.log(super.selected);
  }

  add(item) {
    this.showMessage('hi there');
  }

  save() {
    console.log(this.selected);
    this.appDataService.edb_put(this.selected).then(result=>console.log(result+" save successfully"),error=>console.log(error));
  }

  toggleList() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  createPicklistItem(prop, arr, value) {
    console.log(prop, value);
    return this.picklistService.edb_put(value)
      .then(result => {
        let item = JSON.parse(result.data);
        console.log(item._id, this.selected[prop]);
        this[arr].slice().concat(item);
        this.selected[prop] = item._id;
        console.log(this.selected[prop]);

        this.showMessage(value.valuedecode, 'added successfully!');
      })
      .catch(err => {
        this.showMessage('Error creating new picklist item');
      });
  }

  update(prop, value) {
    this.selected[prop] = value;
  }
  select(name,index) {
    this.$mdDialog.show({
      template: identifierTemplate,
      controllerAs: '$ctrl',
      controller: IdentiferCtrl,
      locals: {
        index,
        identifer: this.selected.substanceidentifier[index],
        identifierTypeOptions:this.identifierTypeOptions
      }
    })
      .then(item => {
        console.log(item);
        this.selected.substanceidentifier[index] = item;
        // angular doesn't trigger update if just one element is updated, need to change the object itself
        this.selected.substanceidentifier = this.selected.substanceidentifier.slice();
      }, item => {
        console.log('cancelled ', item);
      });
  }
  delete(name,index){
    console.log(index);
  }
} 
