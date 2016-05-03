import angular from 'angular';

class ProductController {
    constructor($mdDialog, ProductService) {
        this.productService = ProductService;
        this.$mdDialog = $mdDialog;        
        this.selected = null;
        this.Products = [];
        this.selectedIndex = 0;
        this.filterText = null;
                
        // Load initial data
        this.getProductsFromDB();
    }      
  
    selectProduct(product, index) {
        this.selected = angular.isNumber(product) 
                         ? this.products[product]  
                         : product;
        this.selectedIndex = angular.isNumber(product) 
                              ? product 
                              : this.selectedIndex;
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
            let self = this;
            self.productService.deleteProduct(self.selected._id)
                 .then(affectedRows => self.products.splice(self.selectedIndex
                                                           , 1));
            });
    }
    
    saveProduct($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            this.poductService.updateProduct(this.selected).then(function (affectedRows) {
                self.$mdDialog.show(
                    self.$mdDialog
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
            this.productService.createProduct(this.selected).then(affectedRows => 
                self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Product Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                )
            );
        }
    }
    
    newProduct() {
        this.selected = {};
        this.selectedIndex = null;
    }
    
    getProductsFromDb() {
        let self = this;
        let selection_id = selected != null ? selected._id : null;
        this.productService.getProducts().then(DbResult_products => {
            this.products = [].concat(DbResult_products);
            this.selected = products[0];
            this.selectedIndex = 0;
            //TODO: below is a long running loop for high db volume
            self.products.forEach(prod, index => {
                if (selection_id === prod._id){
                    this.selected = products[index];
                    this.selectedIndex = index;
                }
            });
        });
    }
    
    filterProduct() {
        if (this.filterText == null || this.filterText == "") {
            this.getProductsFromDb();
        }
        else {            
            let self = this;
            let selection_id = selected != null ? selected._id : null;
            this.productService.filterProductsByName(this.filterText)
                                 .then(DbResults_products => {
                this.products = [].concat(DbResults_products);
                this.selected = products[0];
                this.selectedIndex = 0;
                //TODO: below is a long running loop for high db volume
                self.products.forEach(prod, index => {
                    if (selection_id == prod._id){
                        this.selected = products[index];
                        this.selectedIndex = index;
                    }
                });
            });
        }
    }
    
    viewProductJson($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {
            let productJson = JSON.stringify(this.selected);            
            self.$mdDialog.show(
                    self.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Product JSON')
                        .content(productJson)
                        .ok('Ok')
                        .targetEvent($event)
            );
        }
    }
    
    viewProductGHSTS($event) {
        let self = this;
        if (this.selected != null && this.selected._id != null) {   
            this.productService.getProductGHSTSById(this.selected._id)
                                .then(product_xml =>              
                self.$mdDialog.show(
                        self.$mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Product GHSTS')
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
    
    addTestProduct(){
        // read from sample ghsts and populate the database with that Product.       
        this.productService.addSampleProductToDb();
    }
}

ProductController.$inject = ['$mdDialog', 'productService'];

export { ProductController }

