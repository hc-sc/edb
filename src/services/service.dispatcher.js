const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;

module.exports = class ServiceDispatcher {
  constructor(level) {
    this.level = level;
  }

  getService(q, url, isActive) {
    if (url) {
      let serClassFileName = url, serClassName, serClass;
      if (serClassFileName[0] === '/') serClassFileName = serClassFileName.slice(1);
      serClassName = serClassFileName.split('/')[1]
      serClassFileName = './' + serClassFileName.split('/')[1] + '.service';
      serClassName = serClassName[0].toUpperCase() + serClassName.slice(1) + 'Service';
      serClass = require(serClassFileName)[serClassName];
      if (serClass) {
        return new serClass(q, this.level, isActive);
      } else {
        return new RVHelper('EDB11002');
      }
    } else {
      return new RVHelper('EDB11001');
    }
  }
};