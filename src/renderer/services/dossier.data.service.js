import angular from 'angular';

import { DOSSIER_DATA_MSG_CHANNEL, DOSSIER_DATA_NG_MODULE_NAME, DOSSIER_DATA_NG_SERVICE_ID, DOSSIER_DATA_SERVICE_URL} from '../../constants/shared';

import BaseService from './base.service';

export class DossierDataService extends BaseService {
  constructor($q) {
    super($q, DOSSIER_DATA_MSG_CHANNEL, DOSSIER_DATA_SERVICE_URL);
  }

  static dossierDataFactory(q) {
    return new DossierDataService(q);
  }  
}

angular.module(DOSSIER_DATA_NG_MODULE_NAME, [])
  .factory(DOSSIER_DATA_NG_SERVICE_ID, ['$q', function ($q) {
    let q = $q;
    this.getService = function () {
      return DossierDataService.dossierDataFactory(q);
    };

    return {
      getService: this.getService
    };
  }]);

export default DOSSIER_DATA_NG_MODULE_NAME;