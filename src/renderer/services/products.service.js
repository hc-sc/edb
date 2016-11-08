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
    return this.getProducts()
    .then(obj => {
      return obj.products.filter(product => {
        return product.pid == pid;
      })[0];
    });
  }
}