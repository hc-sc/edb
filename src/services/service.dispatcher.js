const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;

module.exports = class ServiceDispatcher {
  constructor() {
  }

  getService(url, version) {
    if (url) {
      let serClassFileName = url, serClass;
      if (serClassFileName[0] === '/') serClassFileName = serClassFileName.slice(1);
      serClassFileName = './' + serClassFileName.split('/')[0] + '.service';
      serClass = require(serClassFileName);
      if (serClass) {
        return new serClass(version);
      } else {
        return new RVHelper('EDB11002');
      }
    } else {
      return new RVHelper('EDB11001');
    }
  }
};