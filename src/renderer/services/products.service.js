export default class ProductService {
  constructor($http) {
    this.$http = $http;
  }

  getProducts() {
    return this.$http.get('dummy-data/products.json')
    .then(obj => {
      return obj.data;
    });
  }

  getProduct(pid) {
    console.log('here');
    return this.getProducts().filter(product => {
      return product.pid === pid;
    });
  }
}