const { dialog } = require('electron').remote;
const fs = require('fs');

import config from '../app/app.constants';

export default class HomeCtrl {
  constructor($mdDialog, $state, fsService) {
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.appTitle = config.appTitle;
    this.fsService = fsService;
    this.links = [
      { title: 'New Project', onClick: this.createNewProject.bind(this), icon: 'project' },
      { title: 'Load Project', onClick: this.loadProject.bind(this), icon: 'load' },
      // { title: 'Manage Dropdowns', onClick: this.manageGlobals.bind(this), icon: 'global' },
      // { title: 'Manage Templates', onClick: this.manageTemplates.bind(this), icon: 'template' },
      { title: 'Settings', onClick: this.settings.bind(this), icon: 'settings' }
    ];
  }

  createNewProject() {
    let prompt = this.$mdDialog.prompt()
    .title('New Product')
    .textContent('Enter the name of the project, typically the name of the product. This cannot be changed after creation')
    .placeholder('Name')
    .ariaLabel('New Project Dialog')
    .ok('Okay')
    .cancel('Cancel');

    this.$mdDialog.show(prompt)
    .then(projectName => {
      // initialize project and go to edit submission screen

      // check if there is already a project by that name
      // fs.statSync returns a Stats object, which we can examine
      try {
        if (fs.statSync(`${this.fsService.getPath()}/${projectName}`).isDirectory()) {
          this.$mdDialog.cancel();
          this.$mdDialog.show(
            this.$mdDialog.alert()
            .title('There is already a project by that name, please select another')
            .clickOutsideToClose(true)
            .ariaLabel('Invalid Project Name Dialog')
            .ok('Okay')
          );
        }
      }
      catch (e) {
        this.fsService.createProject(projectName)
        .then(() => {
          this.$state.go('app.edit.product');
        })
        .catch(err => {
          console.error(err);
        });
      }
    });
  }

  loadProject() {
    // load project and go to project screen
    const FILE_PATH = dialog.showOpenDialog({
      title: 'Choose a Project',
      properties: ['openDirectory'],
      defaultPath: this.fsService.getPath()
    });

    if (FILE_PATH) {
      // check to make sure it's a real project'
      this.$state.go('app.project');
    }
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
    this.$state.go('app.settings');
  }
}