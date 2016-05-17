//import Dossier from '../dossier/dossierModel.js'
import { ProductRA } from '../product_ra/productRAModel';

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
        let productRAs = this.PRODUCT_RA.map(ra => {
            console.log(typeof ra);
            return ra.toGhstsJson();
        });
        
        let ingredients = this.INGREDIENTS.map(ing => {
            return ing.toGhstsJson();
        });
        
        return {
            METADATA_STATUS: this.METADATA_STATUS,
            PRODUCT_PID: this.PRODUCT_PID,
            GENERIC_PRODUCT_NAME: this.GENERIC_PRODUCT_NAME,
            FORMULATION_TYPE: this.FORMULATION_TYPE,
            PRODUCT_RA: productRAs,
            INGREDIENTS: ingredients,
            DOSSIER: this.DOSSIER
        };               
    }          
}    

export { Ingredient, Product }