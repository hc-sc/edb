import {GHSTS} from '../common/ghsts.js';
import {ContactPerson, ContactAddress, LegalEntity} from '../legal_entity/legalEntityModel.js';
import {Receiver, Sender} from '../receiver/receiverModel.js';
import {ValueStruct} from '../common/sharedModel.js';
import {Product} from '../product/productModel.js';
import { Dossier } from '../dossier/dossierModel';
import { Substance, SubstanceIdentifierStruct } from '../substance/substanceModel';

const DATA_DIR = 'data'
const OUTPUT_FILE = './app/renderer/data/DemoGHSTS.xml';

class GhstsService {
    constructor(ReceiverService, LegalEntityService, ProductService, DossierService, SubstanceService, DocumentService) {
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService;
        this.productService = ProductService;
        this.dossierService = DossierService;
        this.substanceService = SubstanceService;
        this.documentService = DocumentService;
        this.submission = {};
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
                    this.documentService.initializeDOC(this.submission)
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
            this.substanceService.substances.remove({}, { multi: true }),
            this.documentService.documents.remove({}, { multi: true })
        ]);
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
            .then(substances => {
                for (const substance of substances) {
                    outputObj.addSubstance(new Substance(substance).toGHSTSJson());
                }

                outputObj.setSubstances();

                console.log(outputObj.ghsts);

                return outputObj.writeXML(OUTPUT_FILE);
            })
            .then(() => {
                console.log(`Successfully written to ${OUTPUT_FILE}`);
            });
    }
}

GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService', 'documentService'];

export { GhstsService };
