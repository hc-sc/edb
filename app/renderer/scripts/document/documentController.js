import angular from 'angular';
import {DocumentRAController} from './documentRAController';
import {ValueStruct} from '../common/sharedModel';
import {ReferencedDocument, ReferenceToFile, Document, DocumentRA}  from './documentModel';
import uuid from 'node-uuid';
import {_} from 'lodash';


class DocumentController {
    constructor($mdDialog,$mdSidenav, $location, DocumentService, PickListService, FileService) {
        this.documentService = DocumentService;
        this.$mdDialog = $mdDialog; 
        this.pickListService = PickListService;
        this.fileService = FileService;
        this.$mdSidenav = $mdSidenav;
        this.$location = $location;
        this.selected = null;
        this.documents = [];
        this.selectedIndex = 0;
        this.filterText = null;
        this.fileReferencedOptions = [];
        
        // Load options for File selects 
        this.getFileReferencedOptions();
        // options for metadata status
        this.metadataStatusOptions = this.pickListService.getMetadataStatusOptions();
        
        this.geDocNumTypeOptions = this.pickListService.getGEDocNumberTypeOptions();
        
        this.geDocReferenceTypeOptions = this.pickListService.getGEDocReferenceTypeOptions();
        
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
    
    updateSelectedStatusDecode(){
        // update metadata status value decode upon selection change
        let selectedStatusValue = this.selected.DOCUMENT_GENERIC.METADATA_STATUS.VALUE;
        // find the value decode in themetadata status options
        let docStatusValueDecode = _(this.metadataStatusOptions)
                                        .filter(c => c.VALUE == selectedStatusValue)
                                        .map(c => c.VALUE_DECODE)
                                        .value()[0];
        this.selected.DOCUMENT_GENERIC.METADATA_STATUS.VALUE_DECODE = docStatusValueDecode;
    }
    
    updateSelectedDocNumTypeDecode(){
        let selectedDocNumTypeValue = this.selected.DOCUMENT_GENERIC.DOCUMENT_NUMBER[0].DOCUMENT_NUMBER_TYPE.VALUE;
        
        let docNumTypeValueDecode = _(this.geDocNumTypeOptions)
                                        .filter(c => c.VALUE == selectedDocNumTypeValue)
                                        .map(c => c.VALUE_DECODE)
                                        .value()[0];
        this.selected.DOCUMENT_GENERIC.DOCUMENT_NUMBER[0].DOCUMENT_NUMBER_TYPE.VALUE_DECODE = docNumTypeValueDecode;
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
    // REFERENCED_DOCUMENT
    addReferencedDocument($event){
         this.selected.DOCUMENT_GENERIC.REFERENCED_DOCUMENT.push(new ReferencedDocument());  
    }
    
    deleteReferencedDocument(refDoc, $event){        
          _.pull(this.selected.DOCUMENT_GENERIC.REFERENCED_DOCUMENT, refDoc);           
    }
    
    updateSelectedRefTypeDecode(){
        
    }
    
    updateSelectedDocTypeDecode(){
        
    }
    
    // REFERENCED_TO_FILE
    // get a list of file to be referenced in Document Generic
    getFileReferencedOptions(){
        let self = this;
        this.fileService.getFiles().then(list => {            
            list.forEach(fi => {               
                let option = {id: fi._identifier, name: fi.FILE_GENERIC.FILE_COMPANY_ID}; 
                //console.log(JSON.stringify(option));
                self.fileReferencedOptions.push(option);
            })
         })
    }
    
    addReferencedFile($event){
       // make sure it is valid to add an new ref File by counting the files in option list.
        if( this.fileReferencedOptions.length > this.selected.DOCUMENT_GENERIC.REFERENCED_TO_FILE.length){
            this.selected.DOCUMENT_GENERIC.REFERENCED_TO_FILE.push(new ReferenceToFile());                
        } else {
            this.$mdDialog.show(
                this.$mdDialog
                    .alert()
                    .clickOutsideToClose(true)
                    .title('Invalid Operation')
                    .content('There are no more potential files to add.')
                    .ok('Ok')
            );
        }
    }
    
    deleteReferencedFile(toFileId, $event){        
          _.remove(this.selected.DOCUMENT_GENERIC.REFERENCED_TO_FILE, { _toFileId: toFileId } );           
    }
    // For Document Generic
    
    saveDocument($event) {   
        // reset form state
        this._setFormPrestine($event);
                     
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            this.documentService.updateDocument(this.selected).then(function (affectedRows) {
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
            this.documentService.createDocument(this.selected).then(affectedRows => {
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
                
                // refresh the le list
                self.getAlldocuments();
            });
        }
    }
    
     deleteDocument($event) {
        let confirm = this.$mdDialog.confirm()
                                .title('Are you sure?')
                                .content('Are you sure you want to delete this Document?')
                                .ok('Yes')
                                .cancel('No')
                                .targetEvent($event);
        
        this.$mdDialog.show(confirm).then(() => {
            let self = this;
            self.documentService.deleteDocument(self.selected._id)
                .then(affectedRows => {self.documents.splice(self.selectedIndex, 1); self.clearSelectedDocument()});
            });
    }
    
    clearSelectedDocument() {
        this.selected = {};
        this.selectedIndex = null;
    }
    
    createDocument(){
        this.selected = new Document();
        this.selected.DOCUMENT_GENERIC.DOCUMENT_PID = 'urn:' + uuid.v4(); 
        this.selectedIndex = null;
    }
    
    // For Document RA
     addDocumentRA($event){
         let docRa = new DocumentRA();
         this.showDocumentRA_Diag(docRa, $event);
     }
     
     deleteDocumentRA(docra, $event) {
        const confirm = this. $mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this document RA?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);
            
        this.$mdDialog.show(confirm).then(() => {
            _.pull(this.selected.DOCUMENT_RA, docra);
            this.documentService.updateDocument(this.selected)
            .catch(err => {
                console.log(err);
            }); 
        });
    }
    
    showDocumentRA_Diag(docRA, $event) {
        if(_.isEmpty(docRA) === true){
            console.log("Ra empty");
            docRA.toSpecificForRAId = 'ID_RECEIVER_BVL';  // hard code for new document RA for now
        }
        
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
    
//    saveDocumentRA(docRA, isAddMode){
//         // save the document RA to the selected document.
//         console.log("View updated docRA: " + JSON.stringify(docRA));
//         if(isAddMode === true){
//             // this is a new document RA
//             this.selected.DOCUMENT_RA.push(docRA);
//         } 
//         // save the new or modified document RA by updating the document            
//         this.documentService.updateDocument(this.selected);
//     }
    
     saveDocumentRA(docRA){
       if (!_.includes(this.selected.DOCUMENT_RA, docRA)) {
            this.selected.DOCUMENT_RA.push(docRA);
        }
        // save the new or modified document RA by updating the document            
        this.documentService.updateDocument(this.selected);
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

DocumentController.$inject = ['$mdDialog','$mdSidenav', '$location', 'documentService', 'pickListService', 'fileService'];

export { DocumentController }
