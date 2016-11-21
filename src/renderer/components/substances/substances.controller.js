
import BaseCtrl from '../common/base.controller';




export class SubstancesCtrlextends extends BaseCtrl {
    constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService) {
      super($mdDialog, $mdToast, $state, PicklistService, AppDataService, 'legalentity');
        this.metadataStatusOptions=JSON.parse(this.metadataStatusOptions.data);
        this.identifierTypeOptions=JSON.parse(this.identifierTypeOptions.data);

    }

    add(item) {
      this.showMessage('hi there');
    }

    save() {
      console.log(this.selected);
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
  } 
