import angular from 'angular';
import { AdminNumber } from './productRAModel';
import { ExtValueStruct } from '../common/sharedModel';
import _ from 'lodash';

class ProductRAController {
    constructor(productRA, productController, $mdDialog, pickListService, receiverService) {
        this.productController = productController;
        this.$mdDialog = $mdDialog;
        this.productRA = productRA;
        this.pickListService = pickListService;
        this.receiverService = receiverService;

        this.pickListService.getType('EXTENSION_TYPE_ADMIN_NUMBER_TYPE')
            .then(types => {
                this.adminNumberTypes = types.map(type => {
                    return new ExtValueStruct(
                        type.VALUE,
                        type.VALUE_DECODE
                    );
                });

                return this.receiverService.getRAsWithLegalEntityName()
            })
            .then(recs => {
                this.receiversWithNames = recs;
            })
            .catch(err => console.log(err.stack));
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

    updateAdminNumber(adminNumber) {
        if (adminNumber.ADMIN_NUMBER_TYPE.VALUE === this.pickListService.getOtherValue()) {
            adminNumber.ADMIN_NUMBER_TYPE.ATTR_VALUE = '';
            adminNumber.setAdminNumberValueDecode('');
        }
        else {
            delete adminNumber.ADMIN_NUMBER_TYPE.ATTR_VALUE;
            adminNumber.setAdminNumberValueDecode(adminNumber.ADMIN_NUMBER_TYPE.VALUE);
        }
    }

    getOtherValue() {
        return this.pickListService.getOtherValue();
    }
}

ProductRAController.$inject = ['productRA', 'productController', '$mdDialog', 'pickListService', 'receiverService'];

export { ProductRAController };
