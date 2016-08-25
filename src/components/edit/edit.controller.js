export default class EditCtrl {
  constructor($state) {
    this.$state = $state;
    this.activeIndex = null;
    this.back = { link: 'app.project', label: 'Back' };
    this.icons = [
      { icon: 'template', label: 'Manage Extensions', onClick: this.goToLocals.bind(this) },
      { icon: 'save', label: 'Save', onClick: this.save.bind(this) },
      { icon: 'validate', label: 'Validate', onClick: this.validate.bind(this) },
      { icon: 'diff', label: 'Track Changes', onClick: this.trackChanges.bind(this) },
      { icon: 'package', label: 'Package', onClick: this.package.bind(this) },
      { icon: 'help', label: 'Help' }
    ];

    this.navs = [
      { title: 'Product', onClick: this.goToProduct.bind(this), icon: 'product', isActive: true },
      { title: 'Dossier', onClick: this.goToDossier.bind(this), icon: 'dossier', isActive: false },
      { title: 'Files', onClick: this.goToFiles.bind(this), icon: 'file', isActive: false  },
      { title: 'Documents', onClick: this.goToDocuments.bind(this), icon: 'toc', isActive: false  },
      { title: 'Legal Entities', onClick: this.goToLegalEntities.bind(this), icon: 'legalEntity', isActive: false },
      { title: 'Senders/Receivers', onClick: this.goToReceivers.bind(this), icon: 'receiver', isActive: false },
      { title: 'Substances', onClick: this.goToSubstances.bind(this), icon: 'substance', isActive: false }
    ];
  }

  // Icons
  goToLocals() {}

  save() {}

  validate() {}

  trackChanges() {}

  package() {}

  // Cards

  goToProduct() {
    this.updateActivePage(0);
    this.$state.go('app.edit.product');
  }

  goToDossier() {
    this.updateActivePage(1);
    this.$state.go('app.edit.dossier');
  }

  goToFiles() {
    this.updateActivePage(2);
    this.$state.go('app.edit.files');
  }

  goToDocuments() {
    this.updateActivePage(3);
    this.$state.go('app.edit.documents');
  }

  goToLegalEntities() {
    this.updateActivePage(4);
    this.$state.go('app.edit.legal-entities');
  }

  goToReceivers() {
    this.updateActivePage(5);
    this.$state.go('app.edit.receivers');
  }

  goToSubstances() {
    this.updateActivePage(6);
    this.$state.go('app.edit.substance');
  }

  updateActivePage(index) {
    for (let i = 0; i < this.navs.length; ++i) {
      this.navs[i].isActive = (i === index) ? true : false;
    }
  }
}