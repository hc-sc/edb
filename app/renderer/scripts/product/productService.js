import Nedb from 'nedb';
import xml2js from 'xml2js';
import uuid from 'node-uuid';
import {GHSTS} from '../common/ghsts.js';
import {Ingredient, AdminNumber, ProductRA, Product} from './productModel.js';
import {Dossier} from '../dossier/dossierModel.js';
import {Submission} from '../submission/Submission';
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js';

class ProductService {
    constructor($q) {        
        this.$q = $q;
        this.productsDb = new Nedb({ filename: __dirname + '/db/products', autoload: true });
    }

    // return a list of all products from the database
    getProducts() {        
        let deferred = this.$q.defer();
        this.productsDb.find({}, function (err, rows) {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });      
        return deferred.promise;  
    }
    
    getProductById(id) {
        let deferred = this.$q.defer();
        this.legalEntities.find({'_id': id }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });       
        return deferred.promise;
    }
    
    getProductByGenericProductName(name) {
        let deferred = this.$q.defer();
        this.productsDb.find({'GENERIC_PRODUCT_NAME': name }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });  
        return deferred.promise;        
    }
    
    createProduct(product) { 
        let deferred = this.$q.defer();
        this.productsDb.insert(product, function (err, result) {
            console.log(err)
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    deleteProduct(id) {            
        let deferred = this.$q.defer();
        this.productsDb.remove({'_id': id}, function (err, res) {
            if (err) deferred.reject(err);
            console.log(res);
            deferred.resolve(res.affectedRows);
        });                
        return deferred.promise;
    }
    
    updateProduct(product) {
        let deferred = this.$q.defer();
        this.productsDb.update({pid: product.pid}, product, {}, function (err, numReplaced) {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }
    
    // the following are demo related methods.  can be moved to a dedicated test class later    
    getProductGHSTSById(id) {
        // return GHSTS xml from json. 
        let deferred = this.$q.defer();
        this.productsDb.find({'_id': id }, function (err, results) {
            if (err) deferred.reject(err);           
            
            // retrieved Json from database
            let productDbJson = results[0];
            // create Product based on productJSON           
            let obj_product = new Product(productDbJson);
            
            // convert to XML
            let builder = new xml2js.Builder({rootName: 'PRODUCT', attrkey: 'attr$'});            
            let xml = builder.buildObject(obj_product.toGHSTSJson());    
            deferred.resolve(xml);        
        });       
        return deferred.promise;
    }
    
    initializeProductFromXml(){
        // read from sample ghsts and populate the database with the product node.
        let obj_ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        let promise = obj_ghsts.readObjects();
        let self = this;
        promise.then(function(contents) {
            let rawP = obj_ghsts.PRODUCT;
            // convert GHSTS json to the product object
            // xml2js' use-and-abuse array setting is on to play safe for now, 
            // hence the default array references.   
            let mds = new ValueStruct(rawP.METADATA_STATUS[0]
                                                 .VALUE[0],
                                         rawP.METADATA_STATUS[0]
                                                 .VALUE_DECODE[0]);
            let ftype = new ValueStruct(
                                rawP.FORMULATION_TYPE[0].VALUE[0],
                                rawP.FORMULATION_TYPE[0].VALUE_DECODE[0]
                             );
            //let obj_Doss = new Dossier(obj_ghsts.PRODUCT.DOSSIER);
            let product = new Product();
            product.METADATA_STATUS = mds;
            product.FORMULATION_TYPE = ftype;
            doss = new Dossier();
            
            product.PRODUCT_PID = rawP.PRODUCT_PID[0];
            product.GENERIC_PRODUCT_NAME = rawP.GENERIC_PRODUCT_NAME[0];
            rawP.PRODUCT_RA.forEach(rawPRA, i1 =>{
                // create and populate an RA object using raw data
                let pra = new ProductRA();
                pra.toReceiverRaIdentifier(rawPRA.attr$.To_Specific_for_RA_Id);
                if (rawPRA.PRODUCT_NAME[0] === undefined){
                    pra.PRODUCT_NAME = null;
                }else{
                    pra.PRODUCT_NAME = rawPRA.PRODUCT_NAME[0];
                };
                // loop over the raw admin numbers and add to pra
                rawPRA.ADMIN_NUMBER.forEach(rawAN =>{
                    // create and populate an Admin Number object using raw
                    let an = new AdminNumber();
                    an.IDENTIFIER = rawAN.IDENTIFIER[0];
                    an.ADMIN_NUMBER_TYPE.VALUE = rawAN.ADMIN_NUMBER_TYPE[0]
                                                       .VALUE[0];
                    an.ADMIN_NUMBER_TYPE.VALUE_DECODE = rawAN
                                                         .ADMIN_NUMBER_TYPE[0]
                                                          .VALUE_DECODE[0];
                    //Now stringify it to JSON and use the JSON constructor
                    // to add it to the ProductRA object.
                    pra.addAdminNum(new AdminNumber(JSON.stringify(an)));
                });
                product.addRA(pra);
            });// end foreach on rawP PRA
            rawP.INGREDIENTS[0].INGREDIENT.forEach(rawIng =>{
                ing = new Ingredient();
                ing.toSubstanceID(rawIng.attr$.To_Substance_Id);
                ing.INGREDIENT.QUANTITY = rawIng.QUANTITY[0];
                ing.INGREDIENT.UNIT = new ValueStruct(rawIng.UNIT[0].VALUE[0],
                                                      rawIng.UNIT[0].VALUE_DECODE[0]);
                product.addIngredient(ing);
            });
                 console.log('---------------------JSON Product Model----------------\n' + JSON.stringify(product));
                 console.log('-----------------Product GHSTS JSON Format-------------\n' + JSON.stringify(product.toGHSTSJson()));
                 // insert the above to into db.
                 self.createProduct(product);
        }).catch(function(e) {
                console.log(e); 
            });
    }    
    
    /*_createSampleLegalEntity(){
        // private method: create a sample legal entity as a sender
        let Canada = new ValueStruct('CA', 'Canada');
        let IdType = new ValueStruct("DUNS-number", "DUNS-number"); 
        let identifier = new IdentifierStruct('LEGALENTITY_IDENTIFIER_TYPE', IdType, "DUNS00001")
        let contactAddr = new ContactAddress('100 Heavenly Ave,', null, '12345', 'Ottawa', 'Ontario', Canada, '613-234-3444', '613-1233-2333', 'goodman@live.com', 'http://drugsys.com');
        let contactPerson = new ContactPerson('Ottawa Drug System', 'Drug Dept.', 'QPIC', 'James', 'Wong', '613-234-3444', '613-234-3444', '613-266-3444', 'jwong@live.com');
        let contactPerson1 = new ContactPerson('Ottawa Drug System', 'Drug Dept.', 'QPIC', 'Mary', 'Smith', '613-234-3445', '613-234-3445', '613-266-3445', 'msmith@live.com');  
                    
        let le = new LegalEntity();
        le.METADATA_STATUS =  new ValueStruct('New', 'New');               
        le.LEGALENTITY_PID = 'urn:' + uuid.v4();       
        le.LEGALENTITY_NAME = 'Ottawa Drug System';    
        le.LEGALENTITY_TYPE = new ValueStruct('Company', 'Company');    
        le.CONTACT_ADDRESS = contactAddr;               
        
        le.legalEntityId = 'LE_CA_DRUGSYS';
        le.addOtherName('The Local Drug Gang');
        le.addOtherName('Gangsters');
        le.addIdentifier(identifier);
        le.addContact(contactPerson);
        le.addContact(contactPerson1);
        
        console.log(JSON.stringify(le));
        return le;
    }
    
    _createSampleRALegalEntity(){
        // create a sample legal entity as a regulatory authority
        let Canada = new ValueStruct('CA', 'Canada');
        let IdType = new ValueStruct("DUNS-number", "DUNS-number"); 
        let identifierRA = new IdentifierStruct('LEGALENTITY_IDENTIFIER_TYPE', IdType, "DUNS50000")
        let contactAddrRA = new ContactAddress('340 Legget Drive,', null, 'K3J 6Y3', 'Kanata', 'Ontario', Canada, '613-344-9000', '613-233-9800', 'hcguy@live.com', 'http://hc.gc.ca');
        let contactPersonRA = new ContactPerson('Health Canada', 'PMRA', 'Officer', 'Don', 'Welder', '613-344-2314', '613-344-5664', '613-344-9884', 'don.welder@gc.ca');
                     
        let leRA = new LegalEntity();
        leRA.METADATA_STATUS =  new ValueStruct('New', 'New');               
        leRA.LEGALENTITY_PID = 'urn:' + uuid.v4();    
        leRA.LEGALENTITY_NAME = 'Health Canada';    
        leRA.LEGALENTITY_TYPE = new ValueStruct('Regulatory Authority', 'Regulatory Authority');    
        leRA.CONTACT_ADDRESS = contactAddrRA;               
        
        leRA.legalEntityId = 'LE_CA_AUTHORITY';
        leRA.addOtherName('The Regulatory Authority in Canada');
        leRA.addIdentifier(identifierRA);
        leRA.addContact(contactPersonRA);
        
        console.log(JSON.stringify(leRA));
        
        return leRA; 
    }
    
    addLegalEntityToDB(){  
        // add a new legal entity to database
        let le = this._createSampleLegalEntity();        
        this.createLegalEntity(le);        
        let leRA = this._createSampleRALegalEntity();        
        this.createLegalEntity(leRA);      
    } */    
}

ProductService.$inject = ['$q'];

export { ProductService }


