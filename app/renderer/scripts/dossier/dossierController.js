import angular from 'angular';
import { Dossier, ReferencedDossier, DossierRA } from './dossierModel';
import _ from 'lodash';

export class DossierController {
    constructor($mdDialog, dossierService) {
        this.$mdDialog = $mdDialog;
        this.dossierService = dossierService;
        this.dossier = {};
        
        this.initFromDB();
    }
    
    initFromDB() {
        console.log('initializing from DB');
        this.dossierService.getDossiers()
            .then(dossiers => {
                if (dossiers.length > 0) {
                    this.dossier = new Dossier(dossiers[0]);
                }
            })
            .catch(err => console.log(err.stack));
    }
    
    saveDossier() {
        if (this.dossier._id) {
            console.log('updating the dossier');
            this.dossierService.updateDossier(this.dossier)
                .catch(err => console.log(err.stack));
        }
        else {
            console.log('creating a new dossier');
            this.dossierService.createDossier(this.dossier)
                .then(createdRow => {
                    this.dossier = new Dossier(createdRow);
                })
                .catch(err => console.log(err.stack));
        }
    }
    
    clearDossier() {
        this.dossier = new Dossier();
    }
    
    addReferencedDossier() {
        this.dossier.addReferencedDossier(new ReferencedDossier());
    }
    
    deleteReferencedDossier(rd, $event) {
        const confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this Referenced Dossier?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event)
            
        this.$mdDialog.show(confirm)
            .then(() => {
                _.pull(this.dossier.REFERENCED_DOSSIER, rd);
                this.dossierService.updateDossier(this.dossier);
            })
            .catch(err => console.log(err.stack));
    }
    
    addDossierRA() {
        this.dossier.addDossierRA(new DossierRA());
    }
    
    deleteDossierRA(dra, $event) {
        const confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this Dossier RA?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event)
            
        this.$mdDialog.show(confirm)
            .then(() => {
                _.pull(this.dossier.DOSSIER_RA, dra);
                this.dossierService.updateDossier(this.dossier);
            })
            .catch(err => console.log(err.stack));
    }
    
    viewDossierGHSTS($event) {
        if (this.dossier) {
            this.dossierService.getDossierGHSTSById(this.dossier._id)
                .then(dossier => {
                    this.$mdDialog.show(
                        this.$mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Dossier GHSTS')
                            .content(dossier)
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
        }
    }
    
    initializeDossierFromXml() {
        console.log('initializing from xml');
        this.dossierService.initializeDossiersFromXml()
            .then(() => {
                this.initFromDB();
            })
            .catch(err => console.log(err.stack));
    }
}