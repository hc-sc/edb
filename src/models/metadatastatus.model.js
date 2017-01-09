const PicklistService = require('../services/picklist.service');
const _ = require('lodash');

const metadataStatusdef = {
  '01.00.00': {
    fields: {
      receivers: [],
      product: {},
      documents: [],
      files: [],
      toc: {},
      legalentities: [],
      substances: []
    },
    path: {
      document: ['documentra', 'documentgeneric'],
      file: ['filera', 'filegeneric']
    }
  }
};

class MetaDataStatusNode {
  constructor(elementid, metadatastatusid, elementpath) {
    this.elementid = elementid ? elementid : '';
    this.elementpath = elementpath;
    this.metadatastatusid = metadatastatusid ? metadatastatusid : '';
  }
}

class MetaDataStatusNodeWithRA {
  constructor(elementid, metadatastatusid, elementpath, receiverids, version) {
    this.elementid = elementid;
    let ver = version ? version : '01.00.00';
    metadataStatusdef[ver].path[elementpath].map(item => {
      if (item.endsWith('ra')) {
        this[item] = [];
        receiverids.map(rec => {
          let mdRas = new MetaDataStatusNode(rec.receiver, metadatastatusid, elementpath + '.' + item);
          this[item].push(mdRas);
        });
      } else {
        this[item] = new MetaDataStatusNode(elementid, metadatastatusid, elementpath + '.' + item);
      }
    });
  }
}

module.exports.MetaDataStatusNode = MetaDataStatusNode;
module.exports.MetaDataStatusNodeWithRA = MetaDataStatusNodeWithRA;

module.exports.MetaDataStatus = class MetaDataStatus {
  constructor(version) {
    this.version = version;
    this.metadatastatusValues = MetaDataStatus.getMetadataStatusValues();
    Object.assign(this, metadataStatusdef[this.version].fields);
  }

  init(isNew, productid, tocid) {
    this.product = new MetaDataStatusNode(productid, isNew ? this.metadatastatusValues.new : this.metadatastatusValues.nochange);
    if (tocid)
      this.toc = new MetaDataStatusNode(tocid, isNew ? this.metadatastatusValues.new : this.metadatastatusValues.nochange);
  }

  static getMetadataStatusValues() {
    let mds = PicklistService.edb_getSync({TYPE_NAME: 'TYPE_METADATA_STATUS'});
    let retVal = {};
    mds.map(item => {
      retVal[item.value.toLowerCase().replace(' ', '')] = item._id;
    });
    return retVal;
  }

  static getMetadataStatusIdbyValue(value) {
    let mds = PicklistService.edb_getSync({TYPE_NAME: 'TYPE_METADATA_STATUS'});
    let retVal = _.filter(mds, item => {
      if (item.valuedecode.toLowerCase().replace(' ', '') === value.toLowerCase().replace(' ', ''))
        return item;
    });
    return retVal[0]._id.toString();
  }
};