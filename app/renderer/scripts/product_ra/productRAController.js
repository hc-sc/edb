import angular from 'angular';
import { AdminNumber } from './productRAModel';
import { ValueStruct } from '../common/sharedModel';
import _ from 'lodash';

class ProductRAController {
    constructor(productRA, productController, $mdDialog, pickListService, receiverService) {
        this.productController = productController;
        this.$mdDialog = $mdDialog;
        this.productRA = productRA;
        this.isAddMode= false;
        this.adminNumberTypes = pickListService.getAdminNumberTypeOptions().map(ant => {
            return new ValueStruct(ant.VALUE, ant.VALUE_DECODE);
        });
        
        receiverService.getRAsWithLegalEntityName()
            .then(recs => {
                this.receiversWithNames = recs;
            })
            .catch(err => console.log(err.stack));
        
        if (_.isEmpty(productRA) === true) {
            this.isAddMode = true;
        }        
    }
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    saveProductRA() {
        this.productController.saveProductRA(this.productRA);
        this.$mdDialog.hide();
    }
    
    addAdminNumber() {
        this.productRA.ADMIN_NUMBER.push(new AdminNumber());
    }
    
    deleteAdminNumber(adminNumber) {
        _.pull(this.productRA.ADMIN_NUMBER, adminNumber);
    }
    
    updateAdminNumberFields(adminNumber) {
        adminNumber.setAdminNumberTypeValue(adminNumber.ADMIN_NUMBER_TYPE.VALUE_DECODE);
    }
}

ProductRAController.$inject = ['productRA', 'productController', '$mdDialog', 'pickListService', 'receiverService'];

export { ProductRAController };