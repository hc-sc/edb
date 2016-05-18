import { ValueStruct } from '../common/sharedModel';

export class ProductRA {
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
        let adminNumbers = this.ADMIN_NUMBER.map(an => {
            return new AdminNumber(an).toGhstsJson();
        });
        
        return {
            attr$: { To_Specific_for_RA_Id: this._toReceiverRaId },
            PRODUCT_NAME: this.PRODUCT_NAME,
            ADMIN_NUMBER: adminNumbers
        };
    }
}   

export class AdminNumber{
    constructor(json) {  
        if (arguments.length === 1) {
            // load from json
            Object.assign(this, json);
        }
        else {
            this.ADMIN_NUMBER_TYPE = new ValueStruct('', '');
            this.IDENTIFIER = null;
        }
    }
    
    setAdminNumberTypeValue(value) {
        this.ADMIN_NUMBER_TYPE.VALUE = value;
    }
    
    setAdminNumberTypeValueDecode(decode) {
        this.ADMIN_NUMBER_TYPE.VALUE_DECODE = decode;
    }
    
    // not sure I need the following
    toGhstsJson() {
        return{ 
            ADMIN_NUMBER_TYPE : this.ADMIN_NUMBER_TYPE,
            IDENTIFIER : this.IDENTIFIER
        };
    }
} 