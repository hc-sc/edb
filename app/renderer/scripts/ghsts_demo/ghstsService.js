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
    constructor(ReceiverService, LegalEntityService, ProductService, DossierService, SubstanceService) {
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService;
        this.productService = ProductService;
        this.dossierService = DossierService;
        this.substanceService = SubstanceService;
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
                    this.substanceService.initializeSubstances(this.submission)
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
            this.substanceService.substances.remove({}, { multi: true })
        ]);
    }

    assembleDemoGHSTS(){
        // this function reads from an existing ghsts.xml file and then
        // overwrites the various nodes in the xml with the collection it finds
        // in the database.  It does not care which one is "correct" from a
        // submission perspective.  For demo purposes only, don't try this
        // at home... I mean in prod.

        // let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");
        //
        // return ghsts.readObjects()
        //     .then(() => {
        //         console.log('XML read into GHSTS object. Read DB to update');
        //         return this.legalEntityService.getLegalEntities();
        //     })
        //     .then(leList => {
        //         for (const le of leList) {
        //             ghsts.addLegalEntity(new LegalEntity(le).toGHSTSJson());
        //         }
        //
        //         ghsts.setLegalEntities();
        //
        //         return this.receiverService.getReceivers();
        //     })
        //     .then(rcvrList => {
        //         for (const receiver of rcvrList) {
        //             ghsts.addReceiver(new Receiver(receiver).toGHSTSJson());
        //         }
        //
        //         ghsts.setReceivers();
        //
        //         return this.productService.getProducts();
        //     })
        //     .then(products => {
        //         ghsts.setProduct(new Product(products[0]).toGhstsJson());
        //
        //         return this.dossierService.getDossiers();
        //     })
        //     .then(dossiers => {
        //         ghsts.setDossier(new Dossier(dossiers[0]).toGhstsJson());
        //
        //         return this.substanceService.getSubstances();
        //     })
        //     .then(substances => {
        //         for (const substance of substances) {
        //             ghsts.addSubstance(new Substance(substance).toGHSTSJson());
        //         }
        //
        //         ghsts.setSubstances();
        //
        //         console.log(ghsts.ghsts);
        //
        //         return ghsts.writeXML(OUTPUT_FILE);
        //     })
        //     .then(() => {
        //         console.log(`Successfully written to ${OUTPUT_FILE}`);
        //     });

        let outputObj = new GHSTS();
        console.log(this.submission);

        // PATCH FOR RIGHT NOW, SINCE WE ARE MISSING FILES, DOCUMENTS, and TOC
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

GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService'];

export { GhstsService };
