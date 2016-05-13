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
        console.log('cancelled');
        this.$mdDialog.cancel();
    }
    
    saveProductRA($event) {
        console.log('saving product ra');
        this.productController.saveProductRA(this.productRA, this.isAddMode);
        this.$mdDialog.hide();
    }
    
    addAdminNumber($event) {
        console.log('add admin number');
        this.productRA.ADMIN_NUMBER.push({});
    }
    
    deleteAdminNumber(adminNumber, $event) {
        console.log('deleting admin number');
        console.log(this.productRA);
        _.pull(this.productRA.ADMIN_NUMBER, adminNumber);
        console.log(this.productRA);
    }
}

ProductRAController.$inject = ['productRA', 'productController', '$mdDialog'];

export default ProductRAController