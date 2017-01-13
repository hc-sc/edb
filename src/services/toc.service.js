const BaseService = require('./base.service');

module.exports = class TocService extends BaseService {
  constructor(version) {
    super('TOC', true, version);
    this.modelClassNamePre = 'GHSTS';
  }
};
