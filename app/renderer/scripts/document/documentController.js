import angular from 'angular';
import {DocumentRAController} from './documentRAController';
import {ValueStruct} from '../common/sharedModel';

import uuid from 'node-uuid';
import {_} from 'lodash';


class DocumentController {
    constructor($mdDialog,$mdSidenav, $location, DocumentService, PickListService) {
        this.documentService = DocumentService;
        this.$mdDialog = $mdDialog; 
        this.pickListService = PickListService;
        this.$mdSidenav = $mdSidenav;
        this.$location = $location;
        this.selected = null;
        this.documents = [];
        this.selectedIndex = 0;
        this.filterText = null;
        
        this.geDocNumTypeOptions = this.pickListService.getGEDocNumberTypeOptions();
        // Load initial data
        this.getAlldocuments();       
        
    }   
    
     confirmLeavePage($event){
        // confirm with user if the form has been modified before leaving the page   
        var scope = angular.element($event.target.ownerDocument.docform).scope();    
        let isFormPristine = scope.docform.$pristine;   
        if(! isFormPristine){
            $event.preventDefault();   
            // ask the user to confirm before leaving page
            let confirm = this.$mdDialog.confirm()
                                .title('Form Modified')
                                .content('Are you sure you want to leave this page?')
                                .ok('Yes')
                                .cancel('No')
                                .targetEvent($event);
        
            this.$mdDialog.show(confirm).then(() => {                
                console.log('taking the user to the page');
                this.$location.path('/home');
            })
        }
    }
    
    _setFormPrestine($event){
        // private - set the to its prestine state after save or update
        var scope = angular.element($event.target.ownerDocument.docform).scope();    
        scope.docform.$setPristine();   
    }
    
    toggleSidenav(componentId){
        // toggle the side nave by component identifer 
        this.$mdSidenav(componentId).toggle();
    }
    
    selectDocument(document, index) {
        this.selected = angular.isNumber(document) ? this.documents[document] : document;
        this.selectedIndex = angular.isNumber(document) ? document: index;
    } 
  
    getAlldocuments() {
        let self = this;
        this.documentService.getDocuments().then(documents => {
            self.documents = [].concat(documents);
            self.selected = documents[0];
        });
    }
    
     filterDocument() {
        if (this.filterText == null || this.filterText == "") {
            this.getAlldocuments();
        }
        else {            
            this.documentService.getDocumentByDOCId(this.filterText).then(documents => {
                this.documents = [].concat(documents);
                this.selected = documents[0];
            });
        }
    }
    
     deleteDocumentRA(docRA, $event){
        // let confirm = this.$mdDialog.confirm()
        //                         .title('Are you sure?')
        //                         .content('Are you sure you want to delete this Contact Person?')
        //                         .ok('Yes')
        //                         .cancel('No')
        //                         .targetEvent($event);
        
        // this.$mdDialog.show(confirm).then(() => {
        //     // delete the contact person by matching first and last names
        //     _.remove(this.selected.CONTACT_PERSON, { FIRSTNAME: person.FIRSTNAME, LASTNAME:  person.LASTNAME });
        //     // update the legal entity            
        //     this.legalEntityService.updateLegalEntity(this.selected);
        // });        
    }   
    
    showDocumentRA_Diag(docRA, $event) {
         this.$mdDialog.show( {
            controller: DocumentRAController,
            controllerAs: '_ctrl',
            templateUrl: './scripts/document/documentRA.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            locals: {
                documentRA: docRA,
                documentController: this
            }
        })
    }
    
     // test/debug functions
    viewDocumentJson($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            let docJson = JSON.stringify(this.selected);            
            self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Document JSON')
                        .content(docJson)
                        .ok('Ok')
                        .targetEvent($event)
            );
        }
    }
    
    viewDocumentGHSTS($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {   
            this.documentService.getDocumentGHSTSById(this.selected._id).then(xml =>              
                self.$mdDialog.show(
                        self.$mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Document GHSTS')
                            .content(xml)
                            .ok('Ok')
                            .targetEvent($event)
                    )
            );
        };
    }
    
    initializeDOC(){
        // read from sample ghsts and populate the database with document data.      
        this.documentService.initializeDOC();
    }
    
    addTestDOC(){
        // read from sample ghsts and populate the database with document data.
        //console.debug("Hello Document");       
        this.documentService.addDocumentToDB();
    }
}

DocumentController.$inject = ['$mdDialog','$mdSidenav', '$location', 'documentService', 'pickListService'];

export { DocumentController }
