import Nedb from 'nedb';
import xml2js from 'xml2js';
import { GHSTS } from '../common/ghsts';
import { Ingredient, Product } from './productModel';
import { ProductRA, AdminNumber } from '../product_ra/productRAModel';
//import {Dossier} from '../dossier/dossierModel.js';
//import {Submission} from '../submission/submissionModel.js';
import { ValueStruct } from '../common/sharedModel';

class ProductService {
    constructor($q) {        
        this.$q = $q;
        this.productsDb = new Nedb({ filename: __dirname + '/db/products', autoload: true });
    }

    // return a list of all products from the database
    getProducts() {    
        let deferred = this.$q.defer();
        this.productsDb.find({}, (err, rows) => {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });      
        return deferred.promise;  
    }
  
    createProduct(product) {
        let deferred = this.$q.defer();
        this.productsDb.insert(product, (err, res) => {
            if (err) deferred.reject(err);
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    deleteProduct(id) {   
        let deferred = this.$q.defer();
        this.productsDb.remove({ _id: id }, (err, res) => {
            if (err) deferred.reject(err);
            deferred.resolve(res.affectedRows);
        });                
        return deferred.promise;
    }

    updateProduct(product) {
        let deferred = this.$q.defer();
        this.productsDb.update({ _id: product._id}, product, {}, 
            (err, numReplaced) => {
                if (err) deferred.reject(err);
                deferred.resolve(numReplaced);
            }
        );
        return deferred.promise;
    }
    
    getProductByName(name) {
        let deferred = this.$q.defer();
        const re = new RegExp(name, 'i');
        const condition = { $regex: re };
        this.productsDb.find({ 'GENERIC_PRODUCT_NAME': condition }, 
            (err, result) => {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            }
        );
        return deferred.promise;
    }
    
    getProductByPid(pid) {
        let deferred = this.$q.defer();
        this.productsDb.find({ 'PRODUCT_PID': pid }, (err, products) => {
            if (err) deferred.reject(err);
            deferred.resolve(products);
        });
        return deferred.promise;
    }
    
    // the following are demo related methods.  can be moved to a dedicated test class later    
    getProductGHSTSById(id) {
        // return GHSTS xml from json. 
        let deferred = this.$q.defer();
        this.productsDb.find({ '_id': id }, (err, results) => {
            if (err) deferred.reject(err);  
                    
            // create Product based on productJSON           
            const product = new Product(results[0]);
            
            // convert to XML
            const builder = new xml2js.Builder({
                rootName: 'PRODUCT', 
                attrkey: 'attr$'
            });
            
            const xml = builder.buildObject(product.toGhstsJson());
            deferred.resolve(xml);        
        });       
        return deferred.promise;
    }

//********************** Testing/Stub/Mock functions below ********************
    initializeProducts(){
        // read from sample ghsts and populate the database with product node.
        let obj_ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        return obj_ghsts.readObjects()
            .then(() => {
                console.log(obj_ghsts);

                const rawProduct = obj_ghsts.product[0];

                console.log(rawProduct);
                
                let product = new Product();
                
                product.METADATA_STATUS = new ValueStruct(rawProduct.METADATA_STATUS[0].VALUE[0], rawProduct.METADATA_STATUS[0].VALUE_DECODE[0]);
                product.PRODUCT_PID = rawProduct.PRODUCT_PID[0];
                product.GENERIC_PRODUCT_NAME = rawProduct.GENERIC_PRODUCT_NAME[0];
                product.FORMULATION_TYPE = new ValueStruct(rawProduct.FORMULATION_TYPE[0].VALUE[0], rawProduct.FORMULATION_TYPE[0].VALUE_DECODE[0]);
                
                console.log('passed init')
                
                for (const pRA of rawProduct.PRODUCT_RA) {
                    let productRA = new ProductRA();
                    productRA._toReceiverRaId = pRA.attr$.To_Specific_for_RA_Id;
                    productRA.PRODUCT_NAME = pRA.PRODUCT_NAME[0];
                    
                    for (const an of pRA.ADMIN_NUMBER) {
                        let adminNumber = new AdminNumber();
                        adminNumber.IDENTIFIER = an.IDENTIFIER[0];
                        adminNumber.ADMIN_NUMBER_TYPE = new ValueStruct(an.ADMIN_NUMBER_TYPE[0].VALUE[0], an.ADMIN_NUMBER_TYPE[0].VALUE_DECODE[0]);
                        
                        productRA.addAdminNum(adminNumber);
                    }
                    
                    product.addRA(productRA);
                }
                
                console.log('passed productRAs');
                
                for (const ing of rawProduct.INGREDIENTS[0].INGREDIENT) {
                    let ingredient = new Ingredient();
                    ingredient._toSubstanceID = ing.attr$.To_Substance_Id;
                    ingredient.QUANTITY = ing.QUANTITY[0];
                    ingredient.UNIT = new ValueStruct(ing.UNIT[0].VALUE[0], ing.UNIT[0].VALUE_DECODE[0]);
                    
                    product.addIngredient(ingredient);
                }
                
                product.DOSSIER = rawProduct.DOSSIER[0];
                
                this.createProduct(product);
            }).catch(e => {
                console.log(e);
            });
            
        //     let rawP = obj_ghsts.product[0];
            
        //     console.log(rawP);
            
        //     // convert GHSTS json to the product object
        //     // xml2js' use-and-abuse array setting is on to play safe for now, 
        //     // hence the default array references.   
        //     let mds = new ValueStruct(rawP.METADATA_STATUS[0].VALUE[0], rawP.METADATA_STATUS[0].VALUE_DECODE[0]);
        //     let ftype = null;
        //     if (rawP.FORMULATION_TYPE[0].VALUE[0].attr$){
        //         ftype = new ValueStruct(
        //                         rawP.FORMULATION_TYPE[0].VALUE[0].attr$.Other_Value,// until Extensible structs are done VALUE[0]
        //                         rawP.FORMULATION_TYPE[0].VALUE_DECODE[0] 
        //                      );
        //     }else {
        //         ftype = new ValueStruct(
        //                         rawP.FORMULATION_TYPE[0].VALUE[0],
        //                         rawP.FORMULATION_TYPE[0].VALUE_DECODE[0] 
        //                      );
        //      }
        //     //let obj_Doss = new Dossier(obj_ghsts.PRODUCT.DOSSIER);
        //     let product = new Product();
        //     product.METADATA_STATUS = mds;
        //     product.FORMULATION_TYPE = ftype === null ? 
        //                                    {'ERROR':'Formulation Type'} :
        //                                    ftype;
        //     let doss = {}; //empty dossier until Dossier is finised new Dossier();
            
        //     product.PRODUCT_PID = rawP.PRODUCT_PID[0];
        //     product.GENERIC_PRODUCT_NAME = rawP.GENERIC_PRODUCT_NAME[0];
        //     rawP.PRODUCT_RA.forEach(rawPRA =>{
        //         // create and populate an RA object using raw data
        //         let pra = new ProductRA();
        //         pra.toReceiverRaId = rawPRA.attr$.To_Specific_for_RA_Id;
        //         if (rawPRA.PRODUCT_NAME[0] === undefined){
        //             pra.PRODUCT_NAME = null;
        //         }
        //         else{
        //             pra.PRODUCT_NAME = rawPRA.PRODUCT_NAME[0];
        //         }

        //         // loop over the raw admin numbers and add to pra
        //         rawPRA.ADMIN_NUMBER.forEach(rawAN =>{
        //             // create and populate an Admin Number object using raw
        //             let an = new AdminNumber();
        //             an.IDENTIFIER = rawAN.IDENTIFIER[0];
        //             an.ADMIN_NUMBER_TYPE.VALUE = rawAN.ADMIN_NUMBER_TYPE[0]
        //                                                .VALUE[0];
        //             an.ADMIN_NUMBER_TYPE.VALUE_DECODE = rawAN
        //                                                  .ADMIN_NUMBER_TYPE[0]
        //                                                   .VALUE_DECODE[0];
        //             //Now stringify it to JSON and use the JSON constructor
        //             // to add it to the ProductRA object.
        //             pra.addAdminNum(new AdminNumber(an));
        //         }); //end foreach rawP AdminNumber
        //         product.addRA(pra);
        //     });// end foreach on rawP PRA
        //     rawP.INGREDIENTS[0].INGREDIENT.forEach(rawIng =>{
        //         console.log(rawIng);
        //         let ing = new Ingredient();
        //         ing._toSubstanceID = rawIng.attr$.To_Substance_Id;
        //         ing.QUANTITY = rawIng.QUANTITY[0];
        //         ing.UNIT = new ValueStruct(rawIng.UNIT[0].VALUE[0],
        //                                    rawIng.UNIT[0].VALUE_DECODE[0]);
        //         product.addIngredient(ing);
        //     });
        //     product.DOSSIER = doss;

        //     // insert the above into db.
        //     this.createProduct(product);
        // }).catch(e => {
        //     console.log(e);
        // });
    }
}

ProductService.$inject = ['$q'];

export { ProductService };


