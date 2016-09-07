
export default class ProjectCtrl {
  constructor($rootScope, $state, $mdDialog, ghstsService) {
    this.project = $rootScope.project;
    this.project.submission = 'no way';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.ghstsService = ghstsService;
    this.back = { link: 'app.home', label: 'Back' };
    this.dossiers = [
      {
        title: 'Dossier 1',
        submissions: [
          { title: 'Submission 1', isPackaged: true },
          { title: 'Submission 2', isPackaged: true },
          { title: 'Submission 3', isPackaged: true },
          { title: 'Submission 4', isPackaged: false }
        ]
      },
      // {
      //   title: 'Some other dossier',
      //   submissions: [
      //     { title: 'hello', isPackaged: false }
      //   ]
      // }
    ];

    this.lastIsPackaged = this.dossiers[0].submissions[this.dossiers[0].submissions.length - 1].isPackaged;
  }

  createNewSubmission() {
    // create new submission
    let prompt = this.$mdDialog.prompt()
    .title('New Submission')
    .textContent('Enter the name of the submission')
    .placeholder('Name')
    .ariaLabel('project name')
    .ok('Okay')
    .cancel('Cancel');

    this.$mdDialog.show(prompt)
    .then(() => {
      // initialize project and go to edit submission screen
      this.$state.go('app.edit.product');
    });
  }

  editSubmission() {
    //TODO: load in most recent un-packaged submission
var fs = require('fs');
var path = require('path');

var absInputPath = path.resolve(fs.realpathSync('./'), 'projects/Test/01/ghsts.xml');
    console.log(absInputPath);
    this.ghstsService.loadXml(absInputPath);
    this.$state.go('app.edit.substance');
  }

  viewSubmission() {
    // choose a submission to view in the OECD viewer, if configured
  }
}