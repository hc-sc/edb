import angular from 'angular';

class DocumentController {
    constructor($mdDialog, DocumentService) {
        this.documentService = DocumentService;
        this.$mdDialog = $mdDialog; 
        this.selected = null;
        this.documents = [];
        this.selectedIndex = 0;
        this.filterText = null;
                
        // Load initial data
        this.getAlldocuments();       
        
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
        // this.$mdDialog.show( {
        //     controller: ContactPersonController,
        //     controllerAs: '_ctrl',
        //     templateUrl: './scripts/legal_entity/contactPerson.html',
        //     parent: angular.element(document.body),
        //     targetEvent: $event,
        //     clickOutsideToClose: false,
        //     locals: {
        //         contactPerson: person,
        //         legalEntityController: this
        //     }
        // })
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

DocumentController.$inject = ['$mdDialog', 'documentService'];

export { DocumentController }
