import angular from 'angular';

class GhstsController {
    constructor($mdDialog, ghstsService) {
        this.ghstsService = ghstsService;
        this.$mdDialog = $mdDialog;
        this.fileName = null;

        // hack to allow the file picker to register that a file has been
        // selected. Angular does not yet support ng-change for input
        // type='file'. Because of this, we need to keep 'this' loose, because
        // we need to access the files value of the DOM element, so can't use
        // fat-arrow. However, because we're calling another service, and we're
        // using class based methods, we need to be able to reference
        // ghstsService that was passed in as a dependency.
        // YOU CANNOT MOVE THIS WITHOUT BREAKING IT
        this.fileInput = document.getElementById('submissionName');
        this.fileInput.addEventListener(
            'change',
            function() {
                if (this.files[0].name === 'ghsts.xml') {
                    ghstsService.loadXml(this.files[0].name);
                }
                else {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .content('Incorrect file name')
                            .ok('Ok')
                    );
                }
            },
            false
        );
    }

    editSubmission() {
        this.ghstsService.loadXml();
    }

    assembleGHSTS($event) {
        // call service to assemble Demo GHSTS and report result
        this.ghstsService.assembleDemoGHSTS()
            .then(() => {
                this.$mdDialog.show(
                    this.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('DemoGHSTS.xml Written Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            })
            .catch(err => console.log(err.stack));

    }
}

GhstsController.$inject = ['$mdDialog', 'ghstsService'];

export { GhstsController }
