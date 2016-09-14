export default class EditCtrl {
  constructor($state, ghstsService) {
    this.$state = $state;
    this.activeIndex = null;
    this.back = { link: 'app.project', label: 'Back' };
    this.ghstsService = ghstsService;
    this.icons = [
      { icon: 'template', label: 'Manage Extensions', onClick: this.goToLocals.bind(this) },
      { icon: 'save', label: 'Save', onClick: this.save.bind(this) },
      { icon: 'validate', label: 'Validate', onClick: this.validate.bind(this) },
      { icon: 'diff', label: 'Track Changes', onClick: this.trackChanges.bind(this) },
      { icon: 'package', label: 'Package', onClick: this.package.bind(this) },
      { icon: 'help', label: 'Help' }
    ];

    this.navs = [
      { title: 'Legal Entities', onClick: this.goToLegalEntities.bind(this), icon: 'legalEntity', isActive: true },
      { title: 'Receivers', onClick: this.goToReceivers.bind(this), icon: 'receiver', isActive: false },
      { title: 'Substances', onClick: this.goToSubstances.bind(this), icon: 'substance', isActive: false },
      { title: 'Product', onClick: this.goToProduct.bind(this), icon: 'product', isActive: false },
      { title: 'Dossier', onClick: this.goToDossier.bind(this), icon: 'dossier', isActive: false },
      { title: 'Files', onClick: this.goToFiles.bind(this), icon: 'file', isActive: false },
      { title: 'Documents', onClick: this.goToDocuments.bind(this), icon: 'toc', isActive: false }
    ];
  }

  // Icons
  goToLocals() {}

  save() {}

  validate() {}

  trackChanges() {}

  package() {
    console.log('package');
    this.ghstsService.assembleDemoGHSTS();
  }

  goToLegalEntities() {
    this.updateActivePage(0);
    this.$state.go('app.edit.legal-entities');
  }

  goToReceivers() {
    this.updateActivePage(1);
    this.$state.go('app.edit.receivers');
  }

  goToSubstances() {
    this.updateActivePage(2);
    this.$state.go('app.edit.substance');
  }

  goToProduct() {
    this.updateActivePage(3);
    this.$state.go('app.edit.product');
  }

  goToDossier() {
    this.updateActivePage(4);
    this.$state.go('app.edit.dossier');
  }

  goToFiles() {
    this.updateActivePage(5);
    this.$state.go('app.edit.files');
  }

  goToDocuments() {
    this.updateActivePage(6);
    this.$state.go('app.edit.documents');
  }

  updateActivePage(index) {
    for (let i = 0; i < this.navs.length; ++i) {
      this.navs[i].isActive = (i === index) ? true : false;
    }
  }
}