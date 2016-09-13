import { PicklistModel } from '../shared/shared.model';
import { generatePid, validatePid } from '../shared/pid';
//import Nedb from 'nedb';
import BaseService from '../shared/base.service';

export default class SubstanceService extends BaseService {
  constructor($q) {
    super($q, 'substances', 'Substance', 'SUBSTANCE', 'substance');
  }

  jsonToDB(json) {
    let status = new PicklistModel('METADATA_STATUS');
    let sub2DB = json;
    let now = Date.now();

    sub2DB.METADATA_STATUS = sub2DB.METADATA_STATUS ? sub2DB.METADATA_STATUS : status;
    //TODO: temporary set value for new Id, needs to be defected to the new business role   
    sub2DB._identifier = sub2DB._identifier ? sub2DB._identifier : 'IDS' + now;
    sub2DB.SUBSTANCE_PID = sub2DB.SUBSTANCE_PID ? (validatePid(sub2DB.SUBSTANCE_PID) ? sub2DB.SUBSTANCE_PID : generatePid()) : generatePid();
    return sub2DB;
  }
}

SubstanceService.$inject = ['$q'];