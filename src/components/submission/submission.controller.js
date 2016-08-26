export default class SubmissionController {
  constructor(submission, dossierController, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.submission = submission;
    this.dossierController = dossierController;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  saveSubmission() {
    this.dossierController.saveSubmission(this.submission);
    this.$mdDialog.hide();
  }
}