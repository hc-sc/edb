import angular from 'angular';

const {dialog} = require('electron').remote;

export class HomeController {
    constructor($rootScope, $location, ghstsService) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.ghstsService = ghstsService;
    }

    showFilePicker() {
        const FILE_PATH = dialog.showOpenDialog({
            title: 'Choose a Submission',
            properties: ['openFile'],
            filters: [
                { name: 'XML', extensions: ['xml'] }
            ]
        });

        if (FILE_PATH) {
            this.ghstsService.clearSubmission()
                .then(() => {
                    this.$location.path('/manage');
                    this.$rootScope.$apply();
                    this.ghstsService.loadXml(FILE_PATH[0]);
                })
                .catch(err => console.log(err.stack));
        }
    }
}
