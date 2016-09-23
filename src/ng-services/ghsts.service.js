import angular from 'angular';

import { GHSTS_MSG_CHANNEL, GHSTS_NG_MODULE_NAME, GHSTS_NG_SERVICE_ID, GHSTS_NG_SERVICE_URL} from '../constants/shared';

import BaseService from './base.service';

export class GhstsService extends BaseService {
  constructor($q) {
    super($q, GHSTS_MSG_CHANNEL, GHSTS_NG_SERVICE_URL);
  }

  static ghstsFactory(q) {
    return new GhstsService(q);
  }  
}

angular.module(GHSTS_NG_MODULE_NAME, [])
  .factory(GHSTS_NG_SERVICE_ID, ['$q', function ($q) {
    let q = $q;
    this.getService = function () {
      return GhstsService.ghstsFactory(q);
    };

    return {
      getService: this.getService
    };
  }]);

export default GHSTS_NG_MODULE_NAME;