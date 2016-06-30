import {GHSTS} from '../common/ghsts.js';
import {ContactPerson, ContactAddress, LegalEntity} from '../legal_entity/legalEntityModel.js';
import {Receiver, Sender} from '../receiver/receiverModel.js';
import {ValueStruct} from '../common/sharedModel.js';
import {Product} from '../product/productModel.js';
import { Dossier } from '../dossier/dossierModel';
<<<<<<< HEAD
import { Substance, SubstanceIdentifierStruct } from '../substance/substanceModel';


const outputFile = './app/renderer/data/DemoGHSTS.xml';

class GhstsService {
    constructor(ReceiverService, LegalEntityService, ProductService, SubmissionService, DossierService, SubstanceService) {
=======
import { Document } from '../document/documentModel';
import { Substance, SubstanceIdentifierStruct } from '../substance/substanceModel';
import {FileRA, FileGeneric, File} from '../file/fileModel.js';
const DATA_DIR = 'data'
const OUTPUT_FILE = `${__dirname}/${DATA_DIR}/output.xml`;

class GhstsService {
    constructor(ReceiverService, LegalEntityService, ProductService, DossierService, SubstanceService, DocumentService, FileService) {
>>>>>>> cd630f60ae327cfdb91a79bb5199b9a7cd0c1bba
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService;
        this.productService = ProductService;
        this.dossierService = DossierService;
<<<<<<< HEAD
        this.substanceService = SubstanceService; 
=======
        this.substanceService = SubstanceService;
        this.documentService = DocumentService;
        this.fileService = FileService;
        this.submission = {};
>>>>>>> cd630f60ae327cfdb91a79bb5199b9a7cd0c1bba
    }

    loadXml(filePath) {
        new GHSTS(filePath).readObjects()
            .then(result => {
                this.submission = result;

                return Promise.all([
                    this.receiverService.initializeReceivers(this.submission),
                    this.legalEntityService.initializeLE(this.submission),
                    this.productService.initializeProducts(this.submission),
                    this.dossierService.initializeDossiers(this.submission),
                    this.substanceService.initializeSubstances(this.submission),
                    this.documentService.initializeDOC(this.submission),
                    this.fileService.initializeFile(this.submission)
                ])
                .catch(err => console.log(err.stack));
            })
            .then(() => console.log(`Successfully loaded file`))
            .catch(err => console.log(err.stack));
    }

    clearSubmission() {
        return Promise.all([
            this.receiverService.receivers.remove({}, { multi: true }),
            this.legalEntityService.legalEntities.remove({}, { multi: true }),
            this.productService.productsDb.remove({}, { multi: true }),
            this.dossierService.dossiers.remove({}, { multi: true }),
            this.substanceService.substancesDb.remove({}, { multi: true }),
            this.documentService.documents.remove({}, { multi: true }),
            this.fileService.files.remove({}, { multi: true })
        ]);
    }

    getGhstsJson(){
        return this.submission;
    }

    assembleDemoGHSTS(){
        let outputObj = new GHSTS();

        // PATCH FOR RIGHT NOW, SINCE WE ARE MISSING FILES and TOC
        outputObj.ghsts = this.submission.ghsts;

        return this.legalEntityService.getLegalEntities()
            .then(les => {
                for (const le of les) {
                    outputObj.addLegalEntity(new LegalEntity(le).toGHSTSJson());
                }

                outputObj.setLegalEntities();

                return this.receiverService.getReceivers();
            })
            .then(res => {
                for (const re of res) {
                    outputObj.addReceiver(new Receiver(re).toGHSTSJson());
                }

                outputObj.setReceivers();

                return this.documentService.getDocuments();
            })
            .then(docList => {
                for (const document of docList) {
                    outputObj.addDocument(new Document(document).toGHSTSJson());
                }

                outputObj.setDocuments();

                return this.productService.getProducts();
            })
            .then(products => {
                outputObj.setProduct(new Product(products[0]).toGhstsJson());

                return this.dossierService.getDossiers();
            })
            .then(dossiers => {
                outputObj.setDossier(new Dossier(dossiers[0]).toGhstsJson());

                return this.substanceService.getSubstances();
            })
<<<<<<< HEAD
            .then(submissions => {
                ghsts.addSubmission(new Submission(submissions[0]).toGhstsJson());
                
                return this.substanceService.getSubstances();
            })
            .then(substances => {
                for (const substance of substances) {
                    ghsts.addSubstance(new Substance(substance).toGHSTSJson());    
                }
                                
                return ghsts.writeXML(outputFile);
=======
            .then(substances => {
                for (const substance of substances) {
                    outputObj.addSubstance(new Substance(substance).toGhstsJson());
                }

                outputObj.setSubstances();

               return this.fileService.getFiles();
            })
            .then(files => {
                for(const file of files){
                    outputObj.addFile(new File(file).toGHSTSJson())
                }
				
				outputObj.setFiles();
				
                return outputObj.writeXML(OUTPUT_FILE);
>>>>>>> cd630f60ae327cfdb91a79bb5199b9a7cd0c1bba
            })
            .then(() => {
                console.log(`Successfully written to ${OUTPUT_FILE}`);
            });
    }
}

<<<<<<< HEAD
GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'submissionService', 'dossierService', 'substanceService'];
=======
GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService', 'documentService', 'fileService'];
>>>>>>> cd630f60ae327cfdb91a79bb5199b9a7cd0c1bba

export { GhstsService };
