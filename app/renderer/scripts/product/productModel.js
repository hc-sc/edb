//import Dossier from '../dossier/dossierModel.js'
import { ProductRA } from '../product_ra/productRAModel';
import { ValueStruct } from '../common/sharedModel';

class Ingredient {
    constructor(ing){  
        if (arguments.length === 1){
            this._toSubstanceID = ing._toSubstanceID;
            this.QUANTITY = ing.QUANTITY;
            this.UNIT = new ValueStruct(ing.UNIT.VALUE, ing.UNIT.VALUE_DECODE);
        }
        else {    
            this._toSubstanceID = null;
            this.QUANTITY = null;
            this.UNIT = new ValueStruct('',''); // of ValueStruct
        }
    }
    
    set toSubstanceID(_identifier){
        this._toSubstanceID = _identifier;
    }
    
    setUnitValue(value) {
        this.UNIT.VALUE = value;
    }
    
    setUnitValueDecode(decode) {
        this.UNIT.VALUE_DECODE = decode;
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
    constructor(prod) {
        if (arguments.length === 1){
            this.METADATA_STATUS = new ValueStruct(prod.METADATA_STATUS.VALUE, prod.METADATA_STATUS.VALUE_DECODE);
            this.PRODUCT_PID = prod.PRODUCT_PID;
            this.GENERIC_PRODUCT_NAME = prod.GENERIC_PRODUCT_NAME;
            this.FORMULATION_TYPE = new ValueStruct(prod.FORMULATION_TYPE.VALUE, prod.FORMULATION_TYPE.VALUE_DECODE);
            this.PRODUCT_RA = prod.PRODUCT_RA.map(prodRA => {
                return new ProductRA(prodRA);
            })
            this.INGREDIENTS = prod.INGREDIENTS.map(ing => {
                return new Ingredient(ing);
            });
            this.DOSSIER = prod.DOSSIER;
            
            this._id = prod._id;
        }
        else {
            this.METADATA_STATUS = new ValueStruct();
            this.PRODUCT_PID = null;
            this.GENERIC_PRODUCT_NAME = null;
            this.FORMULATION_TYPE = new ValueStruct('', '');
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
    
    addRA(productRA){
        this.PRODUCT_RA.push(new ProductRA(productRA));
    }
   
    addIngredient(ingredient){
        this.INGREDIENTS.push(new Ingredient(ingredient));
    }
    
    setMetadataStatusValue(value) {
        this.METADATA_STATUS.VALUE = value;
    }
    
    setMetadataStatusValueDecode(decode) {
        this.METADATA_STATUS.VALUE_DECODE = decode;
    }
    
    toGhstsJson() {    
        let productRAs = this.PRODUCT_RA.map(ra => {
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