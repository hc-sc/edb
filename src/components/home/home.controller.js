import config from '../app/app.constants';

export default class HomeCtrl {
  constructor($mdDialog, $state, GhstsService, DossierDataService) {
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.appTitle = config.appTitle;
    this.GhstsService = GhstsService.getService();
    this.DossierDataService = DossierDataService.getService();

    this.links = [
      { title: 'New Project', onClick: this.createNewProject.bind(this), icon: 'project' },
      { title: 'Load Project', onClick: this.loadProject.bind(this), icon: 'load' },
      // { title: 'Manage Dropdowns', onClick: this.manageGlobals.bind(this), icon: 'global' },
      // { title: 'Manage Templates', onClick: this.manageTemplates.bind(this), icon: 'template' },
      { title: 'Package', onClick: this.settings.bind(this), icon: 'settings' }
    ];
  }

  createNewProject() {

    let prompt = this.$mdDialog.prompt()
      .title('New Product')
      .textContent('Enter the short name of the product, typically the name of the product. This cannot be changed after creation')
      .placeholder('Name')
      .ariaLabel('New Project Dialog')
      .ok('Okay')
      .cancel('Cancel');

    this.$mdDialog.show(prompt)
      .then(name => {
        let nameAry = name.split('/');
        this.GhstsService.edb_put({ productShortName: nameAry[0], dossierShortName: nameAry[1] }).then(result => {
          console.log(result);
        });
      });
  }

  loadProject() {
    this.GhstsService.edb_get().then(result => {
      if (result.err) {
        console.log(result.err);
      } else {
        console.log(result);
        //      this.$state.go('app.project');
      }
    });
  }

  // TODO
  manageGlobals() {
    this.$state.go('app.dropdowns');
  }

  // TODO
  manageTemplates() {
    console.log('manage templates');
  }

  settings() {
/*    this.DossierDataService.edb_get({url: 'substance', data: {}}).then(result => {
      if (result.err) {
        console.log(result.err);
      } else {
        console.log(result);
        //      this.$state.go('app.project');
      }
    });
    
    this.DossierDataService.edb_get({url: 'substance', data: {_id: 'ZB7AZbeNKaVR8y0G'}}).then(result => {
      if (result.err) {
        console.log(result.err);
      } else {
        console.log(result);
        //      this.$state.go('app.project');
      }
    });
*/
/*    this.GhstsService.edb_validation().then(result => {
      if (result.err) {
        console.log(result.err);
      } else {
        console.log(result);
      }
    });
//    this.$state.go('app.settings');
*/  
    this.GhstsService.edb_package().then(result => {
      if (result.err) {
        console.log(result.err);
      } else {
        console.log(result);
      }
    });
  }
}