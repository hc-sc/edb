import angular from 'angular';
import { Submission } from './submissionModel';

class SubmissionController {
    constructor($mdDialog, submissionService) {
        this.$mdDialog = $mdDialog;
        this.submissionService = submissionService;
        this.submission = {};
        
        this.initFromDB();
    }
    
    initFromDB() {
        this.submissionService.getAllSubmissions()
        .then(submissions => {
            if (submissions.length > 0) {
                this.submission = new Submission(submissions[0]);
            }
        })
        .catch(err => console.log(err));
    }
    
    createSubmission() {
        // DON'T delete the submission number, this should not be able to be set
        // DON'T get rid of the _id, we need this for matching
        // the rest of the fields we can just pass in blank strings
        this.SUBMISSION_VERSION_DATE = '';
        this.SUBMISSION_TITLE = '';
        this.INCREMENTAL = '';
    }
    
    saveSubmission($event) {
        if (this.submission._id) {
            this.submissionService.updateSubmission(this.submission).then(() => {
                this.$mdDialog.show(
                    this.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Submission saved successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
        }
    }
    
    viewSubmissionJson($event) {
        if (this.submission) {
            let sJson = JSON.stringify(this.submission);
            this.$mdDialog.show(
                this.$mdDialog
                    .alert()
                    .clickOutsideToClose(true)
                    .title('Submission JSON')
                    .content(sJson)
                    .ok('Ok')
                    .targetEvent($event)
            );
        }
    }
    
    viewSubmissionGHSTS($event) {
        if (this.submission) {
            this.submissionService.getSubmissionGHSTSById(this.submission._id)
                .then(xml => {
                    this.$mdDialog.show(
                        this.$mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Submission GHSTS')
                            .content(xml)
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
        }
    }
    
    initializeSubmissionsFromXml() {
        this.submissionService.initializeSubmissions()
        .then(() => {
            this.initFromDB();
        })
        .catch(err => console.log(err));
    }
}

export { SubmissionController };