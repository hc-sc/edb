import angular from 'angular';

class SubmissionController {
    constructor($mdDialog, submissionService) {
        this.$mdDialog = $mdDialog;
        this.submissionService = submissionService;
        this.submission = {};
        
        this.getAllSubmissions();
    }
    
    getAllSubmissions() {
        // we only care about the first submission
        this.submissionService.getSubmission().then(rows => {
            this.submission = rows[0];
        });
    }
    
    createSubmission() {
        // DON'T delete the submission number, this should not be able to be set
        // DON'T get rid of the _id, we need this for matching
        // the rest of the fields we can just pass in blank strings
        this.submission = { 
            SUBMISSION_NUMBER: this.submission.SUBMISSION_NUMBER,
            SUBMISSION_VERSION_DATE: "",
            SUBMISSION_TITLE: "",
            INCREMENTAL: "",
            _id: this.submission._id
        };
    }
    
    saveSubmission($event) {
        if (this.submission._id) {
            this.submissionService.updateSubmission(this.submission).then(rows => {
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
    
    // should we be able to delete it?
    // deleteSubmission($event) {
    //     let confirm = this.$mdDialog.confirm()
    //         .title('Are you sure?')
    //         .content('You cannot retrieve this submission after deletion')
    //         .ok('Yes')
    //         .cancel('No')
    //         .targetEvent($event);
            
    //     this.$mdDialog.show(confirm).then(() => {
    //         this.submissionService.deleteSubmission(this.submission._id)
    //             .then(rows => this.submission = {};
    //     });
    // }
    
    initializeSubmission() {
        this.submissionService.initializeSubmissions().then(() => {
           this.getAllSubmissions();
        })
        .catch(err => console.log(err));
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
        };
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
}

export { SubmissionController }