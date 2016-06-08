import { ExtValueStruct } from '../common/sharedModel';

export class ProductRA {
    constructor(json) {  
        if(arguments.length === 1){
            this._toReceiverRaId = json._toReceiverRaId;
            this.PRODUCT_NAME = json.PRODUCT_NAME;
            this.ADMIN_NUMBER = json.ADMIN_NUMBER.map(an => {
                return new AdminNumber(an);
            });
        }
        else {
            this._toReceiverRaId = null;
            this.PRODUCT_NAME = null;
            this.ADMIN_NUMBER = [];
        }  
    }
    
    setReceiverRaId(XSDid) {
        this._toReceiverRaId = XSDid;
    }
    
    addAdminNum(adminNumber) {
        this.ADMIN_NUMBER.push(adminNumber);
    }
    
    updateAdminNumberTypeValue(an) {
        an.setAdminNumberTypeValue(an.VALUE_DECODE);
    }

    toGhstsJson() {
        const adminNumbers = this.ADMIN_NUMBER.map(an => {
            return an.toGhstsJson();
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
            if (json.ADMIN_NUMBER_TYPE.ATTR_VALUE !== 'undefined') {
                this.ADMIN_NUMBER_TYPE = new ExtValueStruct(
                    json.ADMIN_NUMBER_TYPE.VALUE,
                    json.ADMIN_NUMBER_TYPE.VALUE_DECODE,
                    json.ADMIN_NUMBER_TYPE.ATTR_VALUE
                );
            }
            else {
                this.ADMIN_NUMBER_TYPE = new ExtValueStruct(
                    json.ADMIN_NUMBER_TYPE.VALUE,
                    json.ADMIN_NUMBER_TYPE.VALUE_DECODE
                );
            }
            this.IDENTIFIER = json.IDENTIFIER;
        }
        else {
            this.ADMIN_NUMBER_TYPE = new ExtValueStruct();
            this.IDENTIFIER = null;
        }
    }
    
    setAdminNumberValue(value) {
        this.ADMIN_NUMBER_TYPE.VALUE = value;
    }
    
    setAdminNumberValueDecode(decode) {
        this.ADMIN_NUMBER_TYPE.VALUE_DECODE = decode;
    }
    
    toGhstsJson() {
        return { 
            ADMIN_NUMBER_TYPE : this.ADMIN_NUMBER_TYPE.toGhstsJson(),
            IDENTIFIER : this.IDENTIFIER
        };
    }
} 