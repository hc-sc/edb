//import Dossier from '../dossier/dossierModel.js'

class Ingredient {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{    
            this._toSubstanceID = null;
            this.QUANTITY = null;
            this.UNIT = {}; // of ValueStruct
        };
    }
    
    set toSubstanceID(_identifier){
        this._toSubstanceID = _identifier;
    }
    
    toGhstsJson() {
        return {
            attr$ : { To_Substance_Id : this._toSubstanceID },
            QUANTITY : this.QUANTITY,
            UNIT : this.UNIT            
        };
    }
}    

class AdminNumber{
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{
            this.ADMIN_NUMBER_TYPE = {}; // of ValueStruct
            this.IDENTIFIER = null;
        };
    }
    // not sure I need the following
    toGhstsJson() {
        return{ ADMIN_NUMBER_TYPE : this.ADMIN_NUMBER_TYPE,
                IDENTIFIER : this.IDENTIFIER
        };
    }
}

class ProductRA {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{
            this._toReceiverRaId = null;
            this.PRODUCT_NAME = null;
            this.ADMIN_NUMBER = [];
        };    
    }
    
    set toReceiverRaId(XSDid){
        this._toReceiverRaId = XSDid;
    }
    
    addAdminNum(adminNumber){
        this.ADMIN_NUMBER.push(adminNumber);
    }

    toGhstsJson() {
        let arr_an = [];
        this.ADMIN_NUMBER.forEach(an => arr_an.push(an));
        return {
            attr$ : { To_Specific_for_RA_Id : this._toReceiverRaId },
            PRODUCT_NAME : this.PRODUCT_NAME,
            ADMIN_NUMBER : arr_an
        };
    }
}    

class Product {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
            //this.DOSSIER = {};
        }else{            
            this.METADATA_STATUS = {};  // of type ValueStruct
            this.PRODUCT_PID = null;
            this.GENERIC_PRODUCT_NAME = null;
            this.FORMULATION_TYPE = {}; // of type ValueStruct
            this.PRODUCT_RA = [];       // list of ProductRA
            this.INGREDIENTS = [];      // list of Ingredient
            //since there is no GHSTS schema reference that relates PRODUCT and
            //DOSSIER, the PRODUCT Tree in the XSD will be constructed when
            //creating the XML (in ghsts.js).
            this.DOSSIER = {};
        }     
    }
    
    //set dossier(obj_dossier){
    //    this.DOSSIER = obj_dossier;
    //} 
    
    addRA(obj_productRA){
        this.PRODUCT_RA.push(obj_productRA);
    }
   
    addIngredient(obj_ingredient){
        this.INGREDIENTS.push(obj_ingredient);
    } 
    
    toGHSTSJson() {     
        let prodRAsJson = [];
        this.PRODUCT_RA.forEach(pra => {prodRAsJson.push(pra)});
        let ingsJson = [];
        this.INGREDIENTS.forEach(ing => {ingsJson.push(ing)});
        
        return {
            METADATA_STATUS     : this.METADATA_STATUS,            
            PRODUCT_PID         : this.PRODUCT_PID,
            GENERI_PRODUCT_NAME : this.GENERI_PRODUCT_NAME,
            FORMULATION_TYPE    : this.FORMULATION_TYPE,
            PRODUCT_RA          : prodRAsJson,
            INGREDIENTS         : ingsJson,
            DOSSIER             : this.DOSSIER
        };               
    }          
}    

export {Ingredient, AdminNumber, ProductRA, Product}