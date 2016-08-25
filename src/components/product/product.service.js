export default class ProductService {
  constructor() {
    console.log('service');

    this.formulations = [
      { VALUE: 'g', VALUE_DECODE: 'grams' },
      { VALUE: 'cm', VALUE_DECODE: 'centimeters' }
    ];
  }

  getFormulations() {
    return this.formulations;
  }
}