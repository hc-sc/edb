const UUID = require('node-uuid');

/* @alexgagnon
This module is responsible for generating and validating PID's. Use it to generate a new PID with the proper ghsts prefix, to add a prefix to an otherwise valid PID, or to return a new valid PID if the PID passed in as an argument was invalid */

// The user should be able to create any number of nill pids
const regex = new RegExp(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-5][0-9a-f]{3}-?[089ab][0-9a-f]{3}-?[0-9a-f]{12}$/i);

class GhstsPid {
  // Generates pid with custom prefix.
  static generatePid(prefix) {
    return 'urn:' +  (prefix ? prefix : 'ghsts') + ':' + UUID.v4();
  }

  // Formats and validates pid. If it fails validation, it will generate a new one
  static validatePid(pid, prefix) {
    pid.replace(/ /g, '');
    if (pid.indexOf(':') === -1) {
      if (pid.match(regex)) {
        return 'urn:' + (prefix ? prefix : 'ghsts') + ':'  + pid;
      }
      else {
        return GhstsPid.generatePid(prefix);
      }
    }
    else {
      const strs = pid.split(':');
      if (strs.length === 3 &&
        strs[strs.length - 1].match(regex) &&
        strs[0] === 'urn' && 
        strs[1] === (prefix ? prefix : 'ghsts')) {
        return pid;
      }
      else {
        return GhstsPid.generatePid(prefix);
      }
    }
  }
}

(function (exports) {
  exports.GhstsPid = GhstsPid;
})(typeof exports === 'undefined' ? this['GhstsPid'] = {} : exports);