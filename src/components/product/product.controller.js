export default class ProductCtrl {
  constructor($mdDialog, productService) {
    this.$mdDialog = $mdDialog;
    this.productService = productService;

    // this array is normally returned by querying the pickList.xsd
    this.metadataStatusOptions = [
      {
        VALUE: 'New',
        VALUE_DECODE: 'New'
      },
      { VALUE: 'Modified',
        VALUE_DECODE: 'Modified'
      }
    ];

    this.formulations = this.productService.getFormulations();
  }
}