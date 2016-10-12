import angular from 'angular';

import { APP_DATA_MSG_CHANNEL, APP_DATA_NG_MODULE_NAME, APP_DATA_NG_SERVICE_ID, APP_DATA_SERVICE_URL} from '../../constants/shared';

import BaseService from './base.service';

export class AppDataService extends BaseService {
  constructor($q) {
    super($q, APP_DATA_MSG_CHANNEL, APP_DATA_SERVICE_URL);
  }

  static appDataFactory(q) {
    return new AppDataService(q);
  }  
}

angular.module(APP_DATA_NG_MODULE_NAME, [])
  .factory(APP_DATA_NG_SERVICE_ID, ['$q', function ($q) {
    let q = $q;
    this.getService = function () {
      return AppDataService.appDataFactory(q);
    };

    return {
      getService: this.getService
    };
  }]);

export default APP_DATA_NG_MODULE_NAME;