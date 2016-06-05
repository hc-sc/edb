import angular from 'angular';
import { Submission } from './submissionModel';

class SubmissionController {
    constructor(submission, dossierController, $mdDialog) {
        this.$mdDialog = $mdDialog;
        this.submission = submission;
        this.dossierController = dossierController;
    }
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    saveSubmission($event) {
        this.dossierController.saveSubmission(this.submission);
        this.$mdDialog.hide();
    }
}

export { SubmissionController };