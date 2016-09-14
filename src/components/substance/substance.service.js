import BaseService from '../shared/base.service';

export default class SubstanceService extends BaseService {
  constructor($q) {
    super($q, 'substances', 'Substance', 'SUBSTANCE', 'substance');
  }
}

SubstanceService.$inject = ['$q'];