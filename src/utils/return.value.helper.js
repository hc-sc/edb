// EDB0 - Exit normal 
// EDB1 - Errors
//  EDB10000 - error from other libs
//  EDB10 - internal program level
//  EDB11 - internal service related
//  EDB12 - internal file, folder releted error, like product, dossier, submission
//  EDB13 - internal mongoose errors   
//   
// EDB2 - Messages
//
// EDB3 - XML related
//

const RETURN_VALUE_CONFIG = {
  EDB00000: { msg: 'OK' },
  EDB00001: { msg: 'User canceled opreation' },

  EDB10000: { msg: 'Other errors' },
  EDB10001: { msg: 'Please run application in electron' },
  EDB10002: { msg: 'not implement yet' },
  EDB10003: { msg: 'only getSync is implemented' },
  EDB10004: { msg: 'Existing record, new record save failure'},

  EDB11001: { msg: 'Calling service with empty url' },
  EDB11002: { msg: 'Service not found'},
  EDB11003: { msg: 'No synchronous call for this service'},
  EDB11004: { msg: 'tring to create non-object entity'},
  EDB11005: { msg: 'tring to delete non-string id entity'},
  EDB11006: { msg: 'tring to update non-object entity'}, 
  EDB11007: { msg: 'tring to initial non-object entity from normal JSON object'},
  
  EDB12001: { msg: 'Cannot create product with empty'},
  EDB12002: { msg: 'Cannot create product with empty short name' },
  EDB12003: { msg: 'Selected wrong submission folder' },
  EDB12004: { msg: 'Cannot select product with empty' },
  EDB12005: { msg: 'Create product from template failed, cannot find template' },
  EDB12006: { msg: 'Packaged submission, reload it?' },
  EDB12007: { msg: 'Cannot create submisson with empty submission number.' },
  EDB12008: { msg: 'Retriving GHSTS without GHSTS id' },
  EDB12009: { msg: 'Create submission without product id' },
  EDB12010: { msg: 'Create submission without dossier id' },
  EDB12011: { msg: 'Create submission without toc id' },
  EDB12012: { msg: 'Link sub element for one submission without sub url' },
  EDB12013: { msg: 'Update sub element for one submission without sub url' },
  EDB12014: { msg: 'Link sub element for one submission without sub id' },
  EDB12015: { msg: 'Update sub element for one submission without sub id' },

  EDB13001: { msg: 'Mongoose model cannot be found' },
  
  EDB20001: { msg: 'picklst database is initialed' },
  EDB20002: { msg: 'picklst database had been initialed' },

  EDB30000: { msg: 'Data is valid'},
  EDB30001: { msg: 'No GHTST tag'},
  EDB30002: { msg: 'Invalid XML with error message'}

};

class ReturnValueHelper {
  constructor(code, obj) {
    this.code = code;
    if (code[3] > 0) {
      let msg = RETURN_VALUE_CONFIG[code].msg;
      msg += obj ? ' -- for data: -- ' + JSON.stringify(obj) : '';
      let error = new Error(msg);
      error.code = code;
      return error;
    } else {
      this.data = obj;
    }
  }
}

(function (exports) {
  exports.ReturnValueHelper = ReturnValueHelper;
})(typeof exports === 'undefined' ? this['ReturnValueHelper'] = {} : exports);