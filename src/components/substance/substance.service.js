//import Nedb from 'nedb';
import xml2js from 'xml2js';
//import { GHSTS } from '../shared/ghsts';
import { ValueStruct, ExtValueStruct } from '../shared/shared.model';
import { Substance, SubstanceIdentifierStruct } from './substance.model';
import { generatePid, validatePid } from '../shared/pid';
//import Nedb from 'nedb';
import BaseService from '../shared/base.service';

export default class SubstanceService extends BaseService {
  constructor($q) {
    super($q, 'substances', 'Substance', 'SUBSTANCES', 'substance');
  }

  jsonToDB(json) {
    let status = new ValueStruct();
    let sub2DB = json;
    let now = Date.now();

    sub2DB.METADATA_STATUS = sub2DB.METADATA_STATUS ? sub2DB.METADATA_STATUS : status;
    //TODO: temporary set value for new Id, needs to be defected to the new business role   
    sub2DB._identifier = sub2DB._identifier ? sub2DB._identifier : 'IDS' + now;
    sub2DB.SUBSTANCE_PID = sub2DB.SUBSTANCE_PID ? (validatePid(sub2DB.SUBSTANCE_PID) ? sub2DB.SUBSTANCE_PID : generatePid()) : generatePid();
    return sub2DB;
  }

  // inits the db, grabs info from a file and inserts it. NOTE that xml2js creates arrays
  initializeSubstances(submission) {
    let entities = submission.substances;

    entities.map(item => {
      let substance = new Substance();
      let status = new ValueStruct(item.METADATA_STATUS[0].VALUE[0], item.METADATA_STATUS[0].VALUE_DECODE[0]);
      substance.substanceId = item.attr$.Id;
      substance.METADATA_STATUS = status;
      substance.SUBSTANCE_NAME = item.SUBSTANCE_NAME[0];
      substance.SUBSTANCE_PID = item.SUBSTANCE_PID[0];
      item.SUBSTANCE_IDENTIFIER.forEach(it => {
        let idType = (typeof (it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]) === 'string') ?
          new ExtValueStruct(
            it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0],
            it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0]
          ) :
          new ExtValueStruct(
            it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]._,
            it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0],
            it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0].attr$.Other_Value
          );
        let identifier = new SubstanceIdentifierStruct(idType, it.IDENTIFIER[0]);
        substance.addSubstanceIdentifier(identifier);
      })

      // insert into db
      this.edb_put(substance);
    });
  }
}

SubstanceService.$inject = ['$q'];