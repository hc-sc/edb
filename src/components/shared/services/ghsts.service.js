import {GHSTS} from '../ghsts.js';
import {ContactPerson, ContactAddress, LegalEntity} from '../../legal-entity/legal-entity.model.js';
//import {Receiver, Sender} from '../../receivers/receiverModel.js';
import {ValueStruct} from '../shared.model';
import {Product} from '../../product/product.model';
import { Dossier } from '../../dossier/dossier.model';
//import { Document } from '../document/documentModel';
import { Substance, SubstanceIdentifierStruct } from '../../substance/substance.model';
import {FileRA, FileGeneric, File} from '../../files/file.model';
const DATA_DIR = 'data';
//const OUTPUT_FILE = `${__dirname}/${DATA_DIR}/output.xml`;

var fs = require('fs');
var path = require('path');
var absOutputPath = path.resolve(fs.realpathSync('./'), 'projects/Test/01/ghstsDemo.xml');

export default class GhstsService {
  constructor(
    //        ReceiverService, 
    LegalEntityService,
    ProductService,
    //        DossierService,
    SubstanceService,
    //        DocumentService,
    FileService,
    TocService
  ) {

    //        this.receiverService = ReceiverService;
    this.legalEntityService = LegalEntityService;
    this.productService = ProductService;
    //        this.dossierService = DossierService;
    this.substanceService = SubstanceService;
    //        this.documentService = DocumentService;
    this.fileService = FileService;
    this.tocService = TocService;
    this.submission = {};
  }

  loadXml(filePath) {
    new GHSTS(filePath).readObjects()
      .then(result => {
        this.submission = result;

        return Promise.all([
          //                    this.receiverService.initializeReceivers(this.submission),
          //                    this.legalEntityService.initializeLE(this.submission),
          //                    this.productService.initializeProducts(this.submission),
          //                    this.dossierService.initializeDossiers(this.submission),
          this.substanceService.jsonObjClassifierFromXml(this.submission.substances),
          //                    this.documentService.initializeDOC(this.submission),
          //                    this.fileService.initializeFile(this.submission)
        ])
          .catch(err => console.log(err.stack));
      })
      .then(() => console.log(`Successfully loaded file`))
      .catch(err => console.log(err.stack));
  }

  clearSubmission() {
    return Promise.all([
      //            this.receiverService.receivers.remove({}, { multi: true }),
      this.legalEntityService.legalEntities.remove({}, { multi: true }),
      //            this.productService.productsDb.remove({}, { multi: true }),
      //            this.dossierService.dossiers.remove({}, { multi: true }),
      this.substanceService.substancesDb.remove({}, { multi: true }),
      //            this.documentService.documents.remove({}, { multi: true }),
      this.fileService.files.remove({}, { multi: true })
    ]);
  }

  getGhstsObject() {
    return this.submission;
  }

  assembleDemoGHSTS() {
    let outputObj = new GHSTS();

    // PATCH FOR RIGHT NOW, SINCE WE ARE MISSING FILES and TOC
    outputObj.ghsts = this.submission.ghsts;

/*    return this.legalEntityService.getLegalEntities()
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
          outputObj.addSubstance(new Substance(substance).toGhstsJson());
        }

        outputObj.setSubstances();

        return this.fileService.getFiles();
      })
      .then(files => {
        for (const file of files) {
          outputObj.addFile(new File(file).toGHSTSJson())
        }
*/
    return this.substanceService.edb_get()
      .then(substances => {
        console.log('Loaded ' + substances.length);
        for (const substance of substances) {
          outputObj.addSubstance(new Substance(substance).toGhstsJson());
        }

        outputObj.setSubstances();

        return outputObj.writeXML(absOutputPath);
      })
      .then(() => {
        console.log(`Successfully written to ${absOutputPath}`);
      });
  }
}

GhstsService.$inject = [
  //'receiverService', 
  'legalEntityService',
  'productService',
  //    'dossierService', 
  'substanceService',
  //    'documentService', 
  'fileService'
];

export { GhstsService };
