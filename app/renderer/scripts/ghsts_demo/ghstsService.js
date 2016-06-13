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

    loadXml(fileName) {
        const FILE_PATH = `${__dirname}/${DATA_DIR}/${fileName}`
        new GHSTS(FILE_PATH).readObjects()
            .then(result => {
                this.submission = result;

                console.log('result', this.submission);

                return Promise.all([
                    this.receiverService.initializeReceivers(),
                    this.legalEntityService.initializeLE(),
                    this.productService.initializeProducts(),
                    this.dossierService.initializeDossiers(this.submission),
                    this.substanceService.initializeSubstances()
                ])
                .catch(err => console.log(err.stack));
            })
            .then(() => console.log(`Successfully loaded ${fileName}`))
            .catch(err => console.log(err.stack));
    }

    assembleDemoGHSTS(){
        // this function reads from an existing ghsts.xml file and then
        // overwrites the various nodes in the xml with the collection it finds
        // in the database.  It does not care which one is "correct" from a
        // submission perspective.  For demo purposes only, don't try this
        // at home... I mean in prod.
        let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");

        return ghsts.readObjects()
            .then(() => {
                console.log('XML read into GHSTS object. Read DB to update');
                return this.legalEntityService.getLegalEntities();
            })
            .then(leList => {
                for (const le of leList) {
                    ghsts.addLegalEntity(new LegalEntity(le).toGHSTSJson());
                }

                return this.receiverService.getReceivers();
            })
            .then(rcvrList => {
                for (const receiver of rcvrList) {
                    ghsts.addReceiver(new Receiver(receiver).toGHSTSJson());
                }

                return this.productService.getProducts();
            })
            .then(products => {
                ghsts.setProduct(new Product(products[0]).toGhstsJson());

                return this.dossierService.getDossiers();
            })
            .then(dossiers => {
                ghsts.setDossier(new Dossier(dossiers[0]).toGhstsJson());

                return this.substanceService.getSubstances();
            })
            .then(substances => {
                for (const substance of substances) {
                    ghsts.addSubstance(new Substance(substance).toGHSTSJson());
                }

                return ghsts.writeXML(OUTPUT_FILE);
            })
            .then(() => {
                console.log(`Successfully written to ${OUTPUT_FILE}`);
            });
    }
}

GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'dossierService', 'substanceService'];

export { GhstsService };
