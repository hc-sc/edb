import angular from 'angular';


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
                 .then(affectedRows => this.products.splice(this.selectedIndex
                                                           , 1));
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
        this.selected = {};
        this.selectedIndex = null;
        this.selected_id = null;
    }
   
    filterProduct() {
        if (this.filterText == null || this.filterText == "") {
            this.getProductsFromDb();
        }
        else {            
            
            let selection_id = selected != null ? selected._id : null;
            this.productService.filterProductsByName(this.filterText)
                                 .then(DbResults_products => {
                this.products = [].concat(DbResults_products);
                this.selected = products[0];
                this.selectedIndex = 0;
                //TODO: below is a long running loop for high db volume
                this.products.forEach(prod, index => {
                    if (selection_id == prod._id){
                        this.selected = products[index];
                        this.selectedIndex = index;
                    }
                });
            });
        }
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
        
    initializeProductFromXml(){
        // read from sample ghsts and populate the database with that Product.       
        this.productService.initializeProductFromXml();
    }
/*    
    addTestProduct(){
        // read from sample ghsts and populate the database with that Product.       
        this.productService.addSampleProductToDb();
    }
*/}

ProductController.$inject = ['$mdDialog', 'receiverService', 'productService'];
export { ProductController }

