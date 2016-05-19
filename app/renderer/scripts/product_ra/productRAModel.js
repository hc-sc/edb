import { ValueStruct } from '../common/sharedModel';

export class ProductRA {
    constructor(ra) {  
        if(arguments.length === 1){
            this._toReceiverRaId = ra._toReceiverRaId;
            this.PRODUCT_NAME = ra.PRODUCT_NAME;
            this.ADMIN_NUMBER = ra.ADMIN_NUMBER.map(an => {
                return new AdminNumber(an);
            });
        }
        else {
            this._toReceiverRaId = null;
            this.PRODUCT_NAME = null;
            this.ADMIN_NUMBER = [];
        };    
    }
    
    set toReceiverRaId(XSDid) {
        this._toReceiverRaId = XSDid;
    }
    
    addAdminNum(adminNumber) {
        this.ADMIN_NUMBER.push(adminNumber);
    }

    toGhstsJson() {
        let adminNumbers = this.ADMIN_NUMBER.map(an => {
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
    constructor(an) {  
        if (arguments.length === 1) {
            this.ADMIN_NUMBER_TYPE = new ValueStruct(an.ADMIN_NUMBER_TYPE.VALUE, an.ADMIN_NUMBER_TYPE.VALUE_DECODE);
            this.IDENTIFIER = an.IDENTIFIER;
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
    
    toGhstsJson() {
        return { 
            ADMIN_NUMBER_TYPE : this.ADMIN_NUMBER_TYPE,
            IDENTIFIER : this.IDENTIFIER
        };
    }
} 