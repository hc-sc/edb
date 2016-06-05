import angular from 'angular';
import { Dossier, ReferencedDossier, DossierRA } from './dossierModel';
import { Submission } from '../submission/submissionModel';
import { SubmissionController } from '../submission/submissionController';
import { ValueStruct } from '../common/sharedModel';
import _ from 'lodash';

export class DossierController {
    constructor($mdDialog, dossierService, pickListService) {
        this.$mdDialog = $mdDialog;
        this.dossierService = dossierService;
        this.pickListService = pickListService;
        this.dossier = {};
        
        this.initFromDB();
        
        this.applicationTypes = pickListService.getApplicationTypeOptions().map(appType => {
           return new ValueStruct(appType.VALUE, appType.VALUE_DECODE); 
        });
        
        this.regulatoryTypes = pickListService.getRegulatoryTypeOptions().map(regType => {
            return new ValueStruct(regType.VALUE, regType.VALUE_DECODE);
        });
    }
    
    initFromDB() {
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
            this.dossierService.updateDossier(this.dossier)
                .catch(err => console.log(err.stack));
        }
        else {
            this.dossierService.createDossier(this.dossier)
                .then(createdRow => {
                    this.dossier = new Dossier(createdRow);
                })
                .catch(err => console.log(err.stack));
        }
    }
    
    addSubmission() {
        this.showSubmissionDiag(new Submission());
    }
    
    saveSubmission(sub) {
        if (!_.includes(this.dossier.SUBMISSION, sub)) {
            this.dossier.addSubmission(sub);
        }
        this.dossierService.updateDossier(this.dossier);
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
    
    showSubmissionDiag(sub, $event) {
        this.$mdDialog.show({
            controller: SubmissionController,
            controllerAs: '_ctrl',
            templateUrl: './scripts/submission/submission-manage.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            locals: {
                submission: sub,
                dossierController: this
            }
        });
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
        this.dossierService.initializeDossiers()
            .then(() => {
                this.initFromDB();
            })
            .catch(err => console.log(err.stack));
    }
}

DossierController.$inject = ['$mdDialog', 'dossierService', 'pickListService'];

export { DossierController }
