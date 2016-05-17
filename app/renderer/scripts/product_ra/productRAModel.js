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
        let arr_an = [];
        this.ADMIN_NUMBER.forEach(an => arr_an.push(an));
        return {
            attr$ : { To_Specific_for_RA_Id : this._toReceiverRaId },
            PRODUCT_NAME : this.PRODUCT_NAME,
            ADMIN_NUMBER : arr_an
        };
    }
}   

export class AdminNumber{
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