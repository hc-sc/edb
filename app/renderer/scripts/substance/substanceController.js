import angular from 'angular';
import { ValueStruct } from '../common/sharedModel';
import { Substance, SubstanceIdentifierStruct } from './substanceModel';

class SubstanceController {
    constructor($mdSidenav, $mdDialog, $location, substanceService, pickListService) {
        this.substanceService = substanceService;
        this.pickListService = pickListService;
        this.$mdDialog = $mdDialog;
        this.$mdSidenav = $mdSidenav;
        this.$location = $location;
        this.selected = null;
        this.substances = [];
        this.selectedIndex = -1;
        this.filterText = null;

        // options for metadata status
        this.metadataStatusOptions = this.pickListService.getMetadataStatusOptions();
        // options for identifier types
        this.identifierTypeOptions = this.pickListService.getSubstanceIdentifierTypeOptions(); 

        this.getAllSubstances();
    }

    addSubstance() {
        let self = this;
        let substance = new Substance();
        substance.SUBSTANCE_NAME = 'New';
        self.substances.push(substance);
        self.selected = substance;
        self.selectedIndex = self.substances.length - 1;
    }
    
    saveSubstance($event) {
        let self = this;
        if (self.selected && self.selected._id) {
            self.substanceService.updateSubstance(self.selected).then(function (affectedRows) {
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Updated Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
        }
        else {            
            self.substanceService.createSubstance(self.selected).then(affectedRows => 
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                )
            );
        }
    }
    
    addSubstanceIdentfier() {
        let self = this;
        let idType = new ValueStruct('CASNO', 'Chemical Abstracts Number');
        let identifier = new SubstanceIdentifierStruct(idType, 'New');
        self.selected.SUBSTANCE_IDENTIFIER.push(identifier);
    }
    
    deleteSubstanceIdentfier(index, event) {
        let self = this;
        let confirm = self.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this substance identifier?')
            .ok('Yes')
            .cancel('No')
            .targetEvent(event);

        self.$mdDialog.show(confirm).then(() => {
            let self = this;
            self.selected.SUBSTANCE_IDENTIFIER.splice(index, 1);
            self.substanceService.updateSubstance(self.selected);
        });
    }

    resetSubstance() {
        let self = this;
        self.selected = null;
        self.selectedIndex = -1;
    }

    deleteSubstance($event) {
        let self = this;
        let confirm = self.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this substance?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);

        self.$mdDialog.show(confirm).then(() => {
            let self = this;
            self.substanceService.deleteSubstance(self.selected._id)
                .then(affectedRows => {
                    self.substances.splice(self.selectedIndex, 1);
                    self.resetSubstance();
                });
        });
    }

    selectSubstance(substance, index) {
        let self = this;
        self.selected = angular.isNumber(substance) ? self.substances[substance] : substance;
        self.selectedIndex = angular.isNumber(substance) ? substance : index;
    }

    filterSubstance() {
        let self = this;
        if (self.filterText) {
            self.substanceService.getSubstancesByName(self.filterText).then(substances => {
                self.substances = [].concat(substances);
                self.selected = substances[0];
                self.selectedIndex = 0;
            });
        } else {
            self.filterText = null;
            self.getAllSubstances();
        }
        //TODO: comment out in production
        console.log(self.substances);
    }

    getAllSubstances() {
        let self = this;
        self.substanceService.getSubstances().then(substances => {
            self.substances = [].concat(substances);
            self.selectedIndex = 0;
            self.selected = substances[0];
        });
    }

    initializeSubstances() {
        // read from sample ghsts and populate the database with legal entities.       
        this.substanceService.initializeSubstances();
    }
}

SubstanceController.$inject = ['$mdDialog', '$mdSidenav', '$location', 'substanceService', 'pickListService'];

export { SubstanceController }
