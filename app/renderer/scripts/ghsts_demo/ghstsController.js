import angular from 'angular';

class GhstsController {
    constructor($mdDialog, ghstsService) {
        this.ghstsService = ghstsService;
        this.$mdDialog = $mdDialog;
        this.fileName = null;
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
