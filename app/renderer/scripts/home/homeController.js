import angular from 'angular';

const {dialog} = require('electron').remote;

export class HomeController {
    constructor($rootScope, $location, $mdDialog, ghstsService) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.ghstsService = ghstsService;

        //DEMO
        this.recents = [
            {
                title: 'Submission (01) [invalid, not packaged, edit]: Product = Beetlegeuse, Dossier Title = "The quick brown fox jumps over the moon"'
            },
            {
                title: 'Submission (03) [valid, packaged, view only]: Product = PPPWW CR251 D, Dossier Title = "Application for license to sell"'
            },
            {
                title: 'Submission (02) [valid, not packaged, edit]: Product = PPPWW CR250 W, Dossier Title = "Sales reporting for CA, BR, DE"'
            },
            {
                title: 'Submission (01) [invalid, not packaged, new dossier]: Product = Scabbard DR 11, Dossier Title = "Request for Scientific Inquiry"'
            }
        ];
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

    showConfig() {

    }

    showHelp() {
        window.open('../help/help.html');
    }

    showAbout() {
        const alert = this.$mdDialog.alert({
            title: 'About',
            textContent: 'Globally Harmonized Submission Transport Standard (GHSTS) Reference Implementation of the "Builder" portion identified in the specification.\nRelease Date: incomplete - TBD.\nVersion: 01.00.00.\nBuild: 7',
            ok: 'Ok',
            clickOutsideToClose: true
        });
        this.$mdDialog.show(alert);
    }
}
