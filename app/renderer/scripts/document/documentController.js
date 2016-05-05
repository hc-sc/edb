import angular from 'angular';

class DocumentController {
    constructor($mdDialog, DocumentService) {
        this.documentService = DocumentService;
        this.$mdDialog = $mdDialog;        
        
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
