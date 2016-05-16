import angular from 'angular';
import { Ingredient, Product } from './productModel';
import { ProductRAController } from '../product_ra/productRAController';
import { ProductRA } from '../product_ra/productRAModel';
import { ListDialogController } from '../common/listDialogController';
import { generatePid, validatePid } from '../common/pid';
import _ from 'lodash';


class ProductController {
    constructor($mdDialog, ReceiverService, ProductService) {
        this.productService = ProductService;
        this.receiverService = ReceiverService;
        this.products = [];
        this.selected = {};
        this.selectedIndex = null;
        this.selected_id = null;
        this.$mdDialog = $mdDialog;
        this.filterText = null;
                
        // Load initial data
        this.initFromDB();
        
    }
    
    initFromDB() {
        this.productService.getProducts().then(dbProducts => {
            this.products = [].concat(dbProducts);
            if (this.products.length > 0){
                this.selected = this.products[0];
                this.selectedIndex = 0;
                this.selected_id = this.selected._id;
            }
        });
    }
    
    selectProduct(product, index) {
        this.selected = angular.isNumber(product) 
                         ? this.products[product]  
                         : product;
        this.selectedIndex = angular.isNumber(product) 
                              ? product 
                              : index;
        this.selected_id = this.selected._id;
    }
    
    deleteProduct($event) {
        let confirm = this.$mdDialog.confirm()
                                .title('Are you sure?')
                                .content('Are you sure you want to delete' +
                                          ' this Product?')
                                .ok('Yes')
                                .cancel('No')
                                .targetEvent($event);
        
        this.$mdDialog.show(confirm).then(() => {
            
            this.productService.deleteProduct(this.selected._id)
                 .then(affectedRows => {
                     this.products.splice(this.selectedIndex, 1)
                 })
                 .catch(err => {
                     console.log(err);
                 });
            });
    }
    
    saveProduct($event) {
        if (Object.keys(this.selected).length > 0 && this.selected_id != null) {
            this.productService.updateProduct(this.selected).then(savedDoc => {
                this.$mdDialog.show(
                    this.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Product Updated Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
        }
          else { // new Product           
            this.productService.createProduct(this.selected).then(createdRow => {
                this.$mdDialog.show(
                    this.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Product Added Successfully!\r\n')
                        .ok('Ok')
                        .targetEvent($event)
                )
                this.products.push(createdRow);
                this.selectedIndex = this.products.length - 1;
                this.selected = this.products[selectedIndex];
                this.selected_id = this.selected._id;
            });
        }
    }
       
    newProduct() {
        this.selected = new Product();
        let valid = false
        let pid = '';
        while (!valid) {
            pid = generatePid();
            this.productService.checkDuplicatePid(pid)
                .then(rows => {
                    if (rows.length === 0) valid = true;
                })
                .catch(err => console.log(err));
        }
        this.selected.PRODUCT_PID = pid;
        this.selectedIndex = null;
        this.selected_id = null;
    }
   
    filterProduct() {
        if (this.filterText != null) {        
            this.productService.getProductByName(this.filterText)
                .then(products => {
                    this.products = [].concat(products);
                    this.selected = products[0];
                });
        }
    }
    
    checkDuplicatePid($event) {
        console.log('checking pid');
        this.productService.checkPid(this.selected.PRODUCT_PID)
            .then(products => {
                if (products.length > 1) {
                    this.showConflictDiag(products, $event);
                }
            })
            .catch(err => console.log(err));
    }
    
    addIngredient() {
        console.log('adding new ingredient');
        let ingredient = new Ingredient();
        this.selected.INGREDIENTS.push(ingredient);
    }
    
    deleteIngredient(ingredient, $event) {
        console.log('deleting ingredient');
        const confirm = this. $mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this ingredient?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);
            
        this.$mdDialog.show(confirm).then(() => {
           _.remove(this.selected.INGREDIENTS, (n) => {
               return n._toSubstanceID === ingredient;
           });
           this.productService.updateProduct(this.selected)
            .catch(err => {
                console.log(err);
            })
        });
    }
    
    addProductRA($event) {
        console.log('adding new product ra');
        let ra = new ProductRA();
        this.selected.PRODUCT_RA.push(ra);
        this.showProductRADiag(ra, $event);
        console.log(this.selected.PRODUCT_RA);
    }
    
    deleteProductRA(ra, $event) {
        console.log('deleting product ra');
        const confirm = this. $mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this RA?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);
            
        this.$mdDialog.show(confirm).then(() => {
           _.pull(this.selected.PRODUCT_RA, ra);
           this.productService.updateProduct(this.selected)
            .catch(err => {
                console.log(err);
            }); 
        });
    }
    
    saveProductRA() {
        console.log('saving product ra');
    }
    
    showProductRADiag(productRA, $event) {
        this.$mdDialog.show({
            controller: ProductRAController,
            controllerAs: '_ctrl',
            templateUrl: './scripts/product_ra/productRA-manager.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            locals: {
                productRA: productRA,
                productController: this
            }
        });
    }
    
    showConflictDiag(conflictingProducts, $event) {
        this.$mdDialog.show({
            controller: ListDialogController,
            controllerAs: '_ctrl',
            templateUrl: './scripts/common/list-dialog-manager.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            locals: {
                icon: 'warning',
                listItems: conflictingProducts,
                title: 'Conflicting PIDs',
                subject: 'The following products have the same PID values',
                onClick: null,
                onSubmit: null,
                isSelectable: false,
                parentController: this
            }
        });
    }

    viewProductJson($event) {
        if (this.selected != null && this.selected._id != null) {
            let productJson = JSON.stringify(this.selected);            
            this.$mdDialog.show(
                    this.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Product Database JSON')
                        .content(productJson)
                        .ok('Ok')
                        .targetEvent($event)
            );
        }
    }
    
    viewProductGHSTS($event) {
        if (this.selected != null && this.selected._id != null) {   
            this.productService.getProductGHSTSById(this.selected._id)
                .then(product_xml =>           
                    this.$mdDialog.show(
                            this.$mdDialog
                                .alert()
                                .clickOutsideToClose(true)
                                .title('Product GHSTS JSON')
                                .content(product_xml)
                                .ok('Ok')
                                .targetEvent($event)
                    )
            );
        };
    }
        
    initializeProductFromXml($event){
        // read from sample ghsts and populate the database with that Product.  
        this.productService.initializeProductFromXml()
            .then(() => {
                this.initFromDB();
            })
            .catch(err => console.log(err));
    }
}

ProductController.$inject = ['$mdDialog', 'receiverService', 'productService'];
export { ProductController }

