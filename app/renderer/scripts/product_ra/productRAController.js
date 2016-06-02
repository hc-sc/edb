import angular from 'angular';
import { AdminNumber } from './productRAModel';
import { ValueStruct } from '../common/sharedModel';
import _ from 'lodash';

class ProductRAController {
    constructor(productRA, productController, $mdDialog, pickListService) {
        this.productController = productController;
        this.$mdDialog = $mdDialog;
        this.productRA = productRA;
        this.pickListService = pickListService;
        this.isAddMode= false;
        this.adminNumberTypes = pickListService.getAdminNumberTypeOptions().map(ant => {
            return new ValueStruct(ant.VALUE, ant.VALUE_DECODE);
        });
        
        if (_.isEmpty(productRA) === true) {
            this.isAddMode = true;
        }
    }
    
    cancel($event) {
        this.$mdDialog.cancel();
    }
    
    saveProductRA($event) {
        this.productController.saveProductRA(this.productRA);
        this.$mdDialog.hide();
    }
    
    addAdminNumber($event) {
        this.productRA.ADMIN_NUMBER.push(new AdminNumber());
    }
    
    deleteAdminNumber(adminNumber, $event) {
        _.pull(this.productRA.ADMIN_NUMBER, adminNumber);
    }
    
    updateAdminNumberFields(adminNumber, $event) {
        adminNumber.setAdminNumberTypeValue(adminNumber.ADMIN_NUMBER_TYPE.VALUE_DECODE);
    }
}

ProductRAController.$inject = ['productRA', 'productController', '$mdDialog', 'pickListService'];

export { ProductRAController };