import angular from 'angular';

import Picklist from '../view-models/picklist.model';

import BaseService from './base.service';

import { PICKLIST_OTHER_VALUE, PICKLIST_MSG_CHANNEL, PICKLIST_NG_MODULE_NAME, PICKLIST_NG_SERVICE_ID } from '../../constants/shared'; 

export class PicklistService extends BaseService {
  constructor($q) {
    super($q, PICKLIST_MSG_CHANNEL);
  }

  static picklistFactory(q) {
    return new PicklistService(q);
  }

  jsonClassfer(obj) {
    let retVal;
    if (obj.constructor === Array) {
      retVal = [];
      obj.map(item => {
        retVal.push(new Picklist(item));
      });
    } else {
      retVal = new Picklist(obj);
    }
    return retVal;
  }

  getOtherValue() {
    return PICKLIST_OTHER_VALUE;
  }
}

angular.module(PICKLIST_NG_MODULE_NAME, [])
  .factory(PICKLIST_NG_SERVICE_ID, ['$q', function ($q) {
    let q = $q;
    this.getService = function () {
      return PicklistService.picklistFactory(q);
    };

    return {
      getService: this.getService
    };
  }]);

export default PICKLIST_NG_MODULE_NAME;
