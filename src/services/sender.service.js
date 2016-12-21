const BaseService = require('./base.service');

module.exports = class SenderService extends BaseService {
  constructor(version) {
    super('SENDER', true, version);
    this.modelClassNamePre = 'GHSTS.RECEIVERS.RECEIVER';
  }
};
