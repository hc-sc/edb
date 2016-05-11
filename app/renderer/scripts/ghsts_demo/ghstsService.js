import {GHSTS} from '../common/ghsts.js'
import {ContactPerson, ContactAddress, LegalEntity} from '../legal_entity/legalEntityModel.js';
import {Receiver, Sender} from '../receiver/receiverModel.js'
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js'
import {Ingredient, AdminNumber, ProductRA, Product} from '../product/productModel.js'

class GhstsService {
    constructor(ReceiverService, 
                LegalEntityService,
                ProductService) {
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService;
        this.productService = ProductService;
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
        let ready = {products : false,
                     legalEntities : false,
                     receivers : false};
        // listen for both fulfillment and rejection        
        promise.then(function(contents) {
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
                ready.legalEntities = true;

                // add receivers from database to GHSTS
                let rcvrListPromise = self.receiverService.getReceivers(); 
                rcvrListPromise.then(function(rcvrList) {                    
                    rcvrList.forEach(receiver => {
                        let rcvrObj = new Receiver(receiver);
                        // console.log('receiver json ', rcvrObj.toGHSTSJson())     
                        ghsts.addReceiver(rcvrObj.toGHSTSJson());
                        //console.log('the le ghsts xml: ' + le.toGHSTSJson());
                    });
                    ready.receivers = true;
                })
            })
            if (ready.legalEntities === true &&
                ready.receivers === true &&
                ready.product === true) {
                    // now we got everything, produce the GHSTS file.
                    ghsts.writeXML("./app/renderer/data/DemoGHSTS.xml");
                    console.log('written to ./app/renderer/data/DemoGHSTS.xml'); 
                }
        }, function(err) {
            // rejection
            console.error(err.message);
        });    
    }        
}

GhstsService.$inject = [ 'receiverService', 
                         'legalEntityService', 
                         'productService'];

export { GhstsService }


