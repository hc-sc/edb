import {_} from 'lodash';

export default class ContactPersonController {
  constructor(contactPerson, legalEntityController, $mdDialog) {
    this.legalEntityController = legalEntityController;
    this.$mdDialog = $mdDialog;
    this.contactPerson = contactPerson;
    this.isAddMode = false;
    if(_.isEmpty(contactPerson) === true){
      this.isAddMode = true;
    }
  }

  cancel($event) {
      // this.$mdDialog.();
  }

  saveContactPerson($event) {
    this.legalEntityController.saveContactPerson(this.contactPerson, this.isAddMode);
    this.$mdDialog.hide();
  }
}

// ContactPersonController.$inject = ['contactPerson', 'legalEntityController', '$mdDialog'];


