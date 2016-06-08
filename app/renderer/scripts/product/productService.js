import Nedb from 'nedb';
import xml2js from 'xml2js';
import { GHSTS } from '../common/ghsts';
import { Ingredient, Product } from './productModel';
import { ProductRA, AdminNumber } from '../product_ra/productRAModel';
import { ValueStruct, ExtValueStruct } from '../common/sharedModel';

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

    initializeProducts(){
        // read from sample ghsts and populate the database with product node.
        let obj_ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        return obj_ghsts.readObjects()
            .then(() => {
                const rawProduct = obj_ghsts.product[0];
                
                let product = new Product();
                
                product.METADATA_STATUS = new ValueStruct(rawProduct.METADATA_STATUS[0].VALUE[0], rawProduct.METADATA_STATUS[0].VALUE_DECODE[0]);
                product.PRODUCT_PID = rawProduct.PRODUCT_PID[0];
                product.GENERIC_PRODUCT_NAME = rawProduct.GENERIC_PRODUCT_NAME[0];
                
                // non-mandatory field
                if (rawProduct.FORMULATION_TYPE) {
                    if (typeof rawProduct.FORMULATION_TYPE[0].VALUE[0] === 'object') {
                        product.FORMULATION_TYPE = new ExtValueStruct(
                            rawProduct.FORMULATION_TYPE[0].VALUE[0]._,
                            rawProduct.FORMULATION_TYPE[0].VALUE_DECODE[0],
                            rawProduct.FORMULATION_TYPE[0].VALUE[0].attr$.Other_Value
                        );
                    }
                    else {
                        product.FORMULATION_TYPE = new ExtValueStruct(
                            rawProduct.FORMULATION_TYPE[0].VALUE[0],
                            rawProduct.FORMULATION_TYPE[0].VALUE_DECODE[0]
                        );
                    }
                }
                else {
                    product.FORMULATION_TYPE = new ExtValueStruct();
                }

                // can be 0..*
                if (rawProduct.PRODUCT_RA) {
                    for (const pRA of rawProduct.PRODUCT_RA) {
                        let productRA = new ProductRA();
                        productRA._toReceiverRaId = pRA.attr$.To_Specific_for_RA_Id;

                        // non-mandatory field
                        productRA.PRODUCT_NAME = pRA.PRODUCT_NAME[0] ? pRA.PRODUCT_NAME[0] : '';
                        
                        // can be 0..*
                        if (pRA.ADMIN_NUMBER) {
                            for (const an of pRA.ADMIN_NUMBER) {
                                let adminNumber = new AdminNumber();
                                adminNumber.IDENTIFIER = an.IDENTIFIER[0];
                                
                                if (typeof an.ADMIN_NUMBER_TYPE[0].VALUE[0] === 'object') {
                                    adminNumber.ADMIN_NUMBER_TYPE = new ExtValueStruct(
                                        an.ADMIN_NUMBER_TYPE[0].VALUE[0]._,
                                        an.ADMIN_NUMBER_TYPE[0].VALUE_DECODE[0],
                                        an.ADMIN_NUMBER_TYPE[0].VALUE[0].attr$.Other_Value
                                    );
                                }
                                else {
                                    adminNumber.ADMIN_NUMBER_TYPE = new ExtValueStruct(
                                        an.ADMIN_NUMBER_TYPE[0].VALUE[0],
                                        an.ADMIN_NUMBER_TYPE[0].VALUE_DECODE[0]
                                    );
                                }
                                
                                productRA.addAdminNum(adminNumber);
                            }
                        }
                        else {
                            productRA.ADMIN_NUMBER = [];
                        }
                        
                        product.addRA(productRA);
                    }
                }
                else {
                    product.PRODUCT_RA = [];
                }
                    
                                
                for (const ing of rawProduct.INGREDIENTS[0].INGREDIENT) {
                    let ingredient = new Ingredient();
                    ingredient._toSubstanceID = ing.attr$.To_Substance_Id;

                    // non-mandatory field
                    ingredient.QUANTITY = ing.QUANTITY[0] ? ing.QUANTITY : '';
                    
                    // non-mandatory field
                    if (ing.UNIT) {
                        if (typeof ing.UNIT[0].VALUE[0] === 'object') {
                            ingredient.UNIT = new ExtValueStruct(
                                ing.UNIT[0].VALUE[0]._,
                                ing.UNIT[0].VALUE_DECODE[0],
                                ing.UNIT[0].VALUE[0].attr$.Other_Value
                            );
                        }
                        else {
                            ingredient.UNIT = new ExtValueStruct(
                                ing.UNIT[0].VALUE[0],
                                ing.UNIT[0].VALUE_DECODE[0]
                            );
                        }
                    }
                    else {
                        ingredient.UNIT = new ExtValueStruct();
                    }
                    
                    product.addIngredient(ingredient);
                }
                                
                this.createProduct(product);
            }).catch(err => console.log(err.stack));
    }
}

ProductService.$inject = ['$q'];

export { ProductService };


