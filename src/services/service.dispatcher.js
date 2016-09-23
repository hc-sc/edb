const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;

module.exports = class ServiceDispatcher {
  constructor(level) {
    this.level = level;
  }

  getService(q, url) {
    if (url) {
      let serClassName = url, serClass;
      if (serClassName[0] === '/') serClassName = serClassName.slice(1);
      serClassName = serClassName.split('/')[0];
      serClass = require('./' + serClassName + '.service');
      if (serClass) {
        return new serClass(q, this.level);
      } else {
        return new RVHelper('EDB11002');
      }
    } else {
      return new RVHelper('EDB11001');
    }
  }
};