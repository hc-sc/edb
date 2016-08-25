export default class SubmissionCtrl {
  constructor() {
    this.links = [
      { title: 'Documents', onClick: this.goToDocuments.bind(this), icon: 'toc' },
      { title: 'Dossier', onClick: this.goToDossier.bind(this), icon: 'dossier' },
      { title: 'Files', onClick: this.goToFiles.bind(this), icon: 'file' },
      { title: 'Legal Entities', onClick: this.goToLegalEntities.bind(this), icon: 'legalEntity' },
      { title: 'Product', onClick: this.goToProduct.bind(this), icon: 'product' },
      { title: 'Receivers', onClick: this.goToReceivers.bind(this), icon: 'receiver' },
      { title: 'Substances', onClick: this.goToSubstances.bind(this), icon: 'substance' },
    ];
  }

  goToDocuments() {}
  goToDossier() {}
  goToFiles() {}
  goToLegalEntities() {}
  goToProduct() {}
  goToReceivers() {}
  goToSubstances() {}
}