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
    switch (code[3]) {
      case '1':
        if (code[7] === '0') {
          this.err = {
            code: obj.code,
            errorMsg: obj.errorMsg
          };
        } else {
          this.err = {
            code: code,
            errorMsg: RETURN_VALUE_CONFIG[code].msg
          };
        }
        break;
      case '2':
        this.message = RETURN_VALUE_CONFIG[code].msg;
        break;
      case '3':
        if (code[7] !== '0') {
          this.err = {
            code: code,
            errors: obj
          };
        }
        break;
      default:
        this.data = obj;
    }
  }
}

(function (exports) {
  exports.ReturnValueHelper = ReturnValueHelper;
})(typeof exports === 'undefined' ? this['ReturnValueHelper'] = {} : exports);