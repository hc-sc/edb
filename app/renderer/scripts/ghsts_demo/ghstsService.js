import {GHSTS} from '../common/ghsts.js';
import {ContactPerson, ContactAddress, LegalEntity} from '../legal_entity/legalEntityModel.js';
import {Receiver, Sender} from '../receiver/receiverModel.js';
import {ValueStruct} from '../common/sharedModel.js';
import { Product } from '../product/productModel.js';
import { Submission } from '../submission/submissionModel';

const outputFile = './app/renderer/data/DemoGHSTS.xml';

class GhstsService {
    constructor(ReceiverService, LegalEntityService, ProductService, SubmissionService) {
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService;
        this.productService = ProductService;
        this.submissionService = SubmissionService;
    }
            
    assembleDemoGHSTS(){          
        // this function reads from an existing ghsts.xml file and then
        // overwrites the various nodes in the xml with the collection it finds
        // in the database.  It does not care which one is "correct" from a
        // submission perspective.  For demo purposes only, don't try this
        // at home... I mean in prod.

        let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        let promise = ghsts.readObjects();
        let self = this;
        
        // listen for both fulfillment and rejection        
        promise.then(function(contents) {
            //The following code assumes that data from ghsts.xml was first
            //read into the database and changes to the data has been saved.
            console.log('have read from xml into obj.  now about to read from db to get those objects');            

            // replace Product with Product from the database
            let productPromise = self.productService.getProducts();
            productPromise.then(function(product) {
                console.log('product from db ::::' + JSON.stringify(product));
                product => new Product(product);
                ghsts.setProduct(product.toGhstsJson());
            });
            // add legal entities from database to GHSTS
            let leListPromise = self.legalEntityService.getLegalEntities(); 
            leListPromise.then(function(leList) {
                // console.log('get le lists', leList)                
                leList.forEach(le => { 
                    let leObj = new LegalEntity(le);
                    ghsts.addLegalEntity(leObj.toGHSTSJson());
                });

                // add receivers from database to GHSTS
                let rcvrListPromise = self.receiverService.getReceivers(); 
                rcvrListPromise.then(function(rcvrList) {
                    rcvrList.forEach(receiver => {
                        let rcvrObj = new Receiver(receiver);
                        // console.log('receiver json ', rcvrObj.toGHSTSJson())     
                        ghsts.addReceiver(rcvrObj.toGHSTSJson());
                    });
                    
                    //replace submission
                    //NOTE: at this point, there is no restrictions on how many times we've inserted a submission into the DB, so there may be several rows returned, just grab the first
                    let submissionPromise = self.submissionService.getAllSubmissions();
                    submissionPromise.then(submission => {
                        const sub = new Submission(submission[0]);
                        
                        //NOTE: this ghsts has an inner ghsts object that is used to actually write the xml. Default is to append new nodes, rather than replace, so we need to replace it by hand. See console output
                        // console.log(ghsts.ghsts.PRODUCT[0].DOSSIER[0].SUBMISSION);
                        ghsts.addSubmission(sub.toGhstsJson());
                        
                        // replace Product with Product from the database
                        let productPromise = self.productService.getProducts();
                        productPromise.then(product => {
                            let prodObj = new Product(product[0]);
                            
                            // TODO: since they are separate for now, this would overwrite setting submission above, so need to reassign
                            ghsts.setProduct(prodObj.toGhstsJson());

                            
                            //we have built the object, output to xml file
                            console.log(ghsts);
                            ghsts.writeXML(outputFile);
                            console.log(`Written to ${outputFile}`);
                        });
                    });
                });
            });
        }).catch(err => {
            console.log(err);
        });  
    }        
}

GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'productService', 'submissionService'];


export { GhstsService };


