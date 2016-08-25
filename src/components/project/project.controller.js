export default class ProjectCtrl {
  constructor($rootScope, $state, $mdDialog) {
    this.project = $rootScope.project;
    this.project.submission = 'no way';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.back = { link: 'app.home', label: 'Back' };
    this.dossiers = [
      {
        title: 'Dossier 1',
        submissions: [
          { title: 'Submission 1', isPackaged: true },
          { title: 'Submission 2', isPackaged: true },
          { title: 'Submission 3', isPackaged: true },
          { title: 'Submission 4', isPackaged: true }
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
    .then(result => {
      // initialize project and go to edit submission screen
      this.$state.go('app.edit.product');
    });
  }

  editSubmission() {
    // load in most recent un-packaged submission
    this.$state.go('app.edit.product');
  }

  viewSubmission() {
    // choose a submission to view in the OECD viewer, if configured
  }
}