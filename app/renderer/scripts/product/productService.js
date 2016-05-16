import Nedb from 'nedb';
import xml2js from 'xml2js';
import uuid from 'node-uuid';
import {GHSTS} from '../common/ghsts.js';
import {Ingredient, AdminNumber, Product} from './productModel.js';
import ProductRA from '../product_ra/productRAModel';
//import {Dossier} from '../dossier/dossierModel.js';
//import {Submission} from '../submission/submissionModel.js';
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

/*    
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
*/    
    createProduct(product) {
        let self = this;
        console.log('inside createProduct \r\n');
        product.PRODUCT_PID = product.PRODUCT_PID == null ? 
                              self.validPid() : 
                              self.validPid(product.PRODUCT_PID);
        let deferred = this.$q.defer();
        //check for existing  -- not working, committed in 
        //b13f964e55db592c3f9add6313efe38a3835aa3b
        /*
        self.productsDb.find({'PRODUCT_PID': product.PRODUCT_PID}, 
                             function (err, result){
                                 window.alert(result);
            if (err){
                console.log(err);
                deferred.reject(err);
                return deferred.promise;
            }else if (result.length === 1){//found one existing, update instead
                console.log('ProductService:createProduct found existing '+
                            'product with PID ' + product.PRODUCT_PID +
                            '.  Updating instead of creating new.');
                return updateProduct(product);
            }else if (result.length > 1){ // error, more than one exists
                console.log('ProductService:createProduct found more than '+
                            'one product with PID ' + product.PRODUCT_PID +
                            '.  Rejecting create.');
                deferred.reject('Multiple Products with PID = ' + product.PRODUCT_PID + 
                                'found in the db. Creation Failed.');
                return deferred.promise;
            };
         });
         // if we are still here then this is a legit create
         */
        self.productsDb.insert(product, (err, result) => {
            console.log(err);
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    deleteProduct(id) {            
        let deferred = this.$q.defer();
        this.productsDb.remove({'_id': id}, (err, res) => {
            if (err) deferred.reject(err);
            console.log(res);
            deferred.resolve(res.affectedRows);
        });                
        return deferred.promise;
    }

    updateProduct(product) {
        console.log('in updateProduct');
        let deferred = this.$q.defer();
        this.productsDb.update({pid: product.PRODUCT_PID}, product, {}, (err, numReplaced) => {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }
    
    getProductByName(name) {
        let deferred = this.$q.defer();
        const re = new RegExp(name, 'i');
        const condition = { $regex: re };
        this.productsDb.find({ 
                'GENERIC_PRODUCT_NAME': condition
            }, 
            (err, result) => {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            }
        );
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

//********************** Testing/Stub/Mock functions below ********************
    initializeProductFromXml(){
        // read from sample ghsts and populate the database with product node.
        let obj_ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        let promise = obj_ghsts.readObjects();
        let self=this;
        promise.then(contents => {
            let rawP = obj_ghsts.product[0];
            // convert GHSTS json to the product object
            // xml2js' use-and-abuse array setting is on to play safe for now, 
            // hence the default array references.   
            let mds = new ValueStruct(rawP.METADATA_STATUS[0].VALUE[0], rawP.METADATA_STATUS[0].VALUE_DECODE[0]);
            let ftype = null;
            if (rawP.FORMULATION_TYPE[0].VALUE[0].attr$){
                ftype = new ValueStruct(
                                rawP.FORMULATION_TYPE[0].VALUE[0].attr$.Other_Value,// until Extensible structs are done VALUE[0]
                                rawP.FORMULATION_TYPE[0].VALUE_DECODE[0] 
                             );
            }else {
                ftype = new ValueStruct(
                                rawP.FORMULATION_TYPE[0].VALUE[0],
                                rawP.FORMULATION_TYPE[0].VALUE_DECODE[0] 
                             );
             }
            //let obj_Doss = new Dossier(obj_ghsts.PRODUCT.DOSSIER);
            let product = new Product();
            product.METADATA_STATUS = mds;
            product.FORMULATION_TYPE = ftype === null ? 
                                           {'ERROR':'Formulation Type'} :
                                           ftype;
            let doss = {}; //empty dossier until Dossier is finised new Dossier();
            
            product.PRODUCT_PID = rawP.PRODUCT_PID[0];
            product.GENERIC_PRODUCT_NAME = rawP.GENERIC_PRODUCT_NAME[0];
            rawP.PRODUCT_RA.forEach(rawPRA =>{
                // create and populate an RA object using raw data
                let pra = new ProductRA();
                pra.toReceiverRaId = rawPRA.attr$.To_Specific_for_RA_Id;
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
                    pra.addAdminNum(new AdminNumber(an));
                }); //end foreach rawP AdminNumber
                product.addRA(pra);
            });// end foreach on rawP PRA
            rawP.INGREDIENTS[0].INGREDIENT.forEach(rawIng =>{
                let ing = new Ingredient();
                ing.toSubstanceID = rawIng.attr$.To_Substance_Id;
                ing.QUANTITY = rawIng.QUANTITY[0];
                ing.UNIT = new ValueStruct(rawIng.UNIT[0].VALUE[0],
                                           rawIng.UNIT[0].VALUE_DECODE[0]);
                product.addIngredient(ing);
            });
            product.DOSSIER = doss;
            console.log('---------------------JSON Product Model----------------\n' + JSON.stringify(product));
            console.log('-----------------Product GHSTS JSON Format-------------\n' + JSON.stringify(product.toGHSTSJson()));
            // insert the above into db.
            self.createProduct(product);
        }).catch(e => {
                console.log(e); 
            });
    }
    
/*    _createSampleLegalEntity(){
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
    } 
*/  
//******************************** utility methods ****************************

    // validPid(id) takes an argument or defaults it to uuid. Checks if 
    // argument is a PID and also checks if it is a valid PID (3 strings 
    // separated by colon with a UUID in the last position).  It always returns
    // a valid and unique PID assuming Builder namespace is always "ghsts" (as
    // from the Specification: 'urn:ghsts:<valid uuid - we are using ver. 4>')
    // TODO: externalize default pid prefix 'urn:ghsts'
    validPid(id = uuid.v4()){
        let regex = new RegExp(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-5][0-9a-f]{3}-?[089ab][0-9a-f]{3}-?[0-9a-f]{12}$/i);
        // strip any spaces        
        id = id.replace(/ /g, '');
        // check incoming for no colons
        if (id.indexOf(":") === -1){
            // no colons, check if valid uuid
            if (id.match(regex)){
                // is a valid uuid, add rest of PID and return
                return "urn:ghsts:" + id;
            }else{
                // neither a valid PID nor uuid, return back valid PID
                return "urn:ghsts:" + uuid.v4();
            }
        }else{ // contains a colon, check for valid format
            let strs = id.split(":");
            //TODO: externalize the PID split on : array size = 3
            if (strs.length === 3){
                // valid number of strings so check valid uuid in last position
                if(strs[strs.length - 1].match(regex)){
                    // and finally check for valid "urn:"
                    if (strs[0] == 'urn'){
                        // valid PID, return it w/ spaces stripped
                        return id;
                    }
                }
            }else{
                // failed validity tests, return back valid PID
                let newPid = "urn:ghsts:" + uuid.v4();
                console.log('invalid Product PID ' + idin + 
                            '\nReplacing with valid PID ' + newPid.toString());
                return newPid.toString();
            }
        }
    }// end function validPid(id)
}

ProductService.$inject = ['$q'];

export { ProductService }


