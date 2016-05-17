import angular from 'angular';
import _ from 'lodash';

class ProductRAController {
    constructor(productRA, productController, $mdDialog) {
        this.productController = productController;
        this.$mdDialog = $mdDialog;
        this.productRA = productRA;
        this.isAddMode= false;
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
        this.productRA.ADMIN_NUMBER.push({});
    }
    
    deleteAdminNumber(adminNumber, $event) {
        _.pull(this.productRA.ADMIN_NUMBER, adminNumber);
    }
}

ProductRAController.$inject = ['productRA', 'productController', '$mdDialog'];

export { ProductRAController }