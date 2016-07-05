import angular from 'angular';
var fs = require('fs');
var path = require('path');

const { dialog, BrowserWindow, ipcRenderer } = require('electron').remote;


export class HomeController {
    constructor($rootScope, $location, $mdDialog, ghstsService, dossierService) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.ghstsService = ghstsService;
        this.dossierService = dossierService;

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

    showNewDossierPathPicker() {
        const DOSSIER_PATH = dialog.showOpenDialog({
            title: 'Choose or new a Dossier folder',
            properties: ['openDirectory'],
            defaultPath: `${__dirname}/data/`
        });

        if (DOSSIER_PATH) {
            if (this.dossierService.validBaseDossierPath(DOSSIER_PATH)) {
                let self = this;
                self.ghstsService.clearSubmission()
                    .then(() => {
                        self.dossierService.createDossierFolders(DOSSIER_PATH)
                            .then(()=>{
                                self.$location.path('/dossier');
                            }); 
                    })
                    .catch(err => console.log(err.stack));
            }
        }
    }

    showFilePicker() {
        const FILE_PATH = dialog.showOpenDialog({
            title: 'Choose a Submission',
            properties: ['openFile'],
            filters: [
                { name: 'XML', extensions: ['xml'] }
            ],
            defaultPath: `${__dirname}/data/`
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
        let win = new BrowserWindow({
            useContentSize: true,
            title: 'Help Pages',
            nodeIntegration: false,
            show: false
        });

        win.on('closed', () => {

            win = null;
        });

        win.loadURL(`${__dirname}/scripts/help/help.html`);

        win.once('ready-to-show', () => {
            win.show();
        });
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

    // DEMO
    goToManageScreen() {
        console.log('Skipping to manage screen');
        this.ghstsService.clearSubmission()
            .then(() => {
                this.$location.path('/manage');
                this.$rootScope.$apply();
            });
    }
}

