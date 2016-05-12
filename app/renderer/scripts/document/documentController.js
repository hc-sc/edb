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
