export default class DropdownsCtrl {
  constructor() {
    this.back = { link: 'app.home', label: 'Back' };
    this.links = [
      { title: 'Picklist Extensions', onClick: this.managePicklists.bind(this), icon: 'template'},
      { title: 'Legal Entities', onClick: this.manageLegalEntities.bind(this), icon: 'legalEntity' },
      { title: 'Receivers', onClick: this.manageReceivers.bind(this), icon: 'receiver' },
      { title: 'Substances', onClick: this.manageSubstances.bind(this), icon: 'substance' },
    ];
  }

  managePicklists() {}

  manageLegalEntities() {}

  manageReceivers() {}

  manageSubstances() {}
}