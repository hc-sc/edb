const BaseService = require('./base.service');
const path = require('path');
const Q = require('bluebird');
const BACKEND_CONST = require('../constants/backend');

module.exports = class ProductService extends BaseService {
  constructor(version) {
    super('PRODUCT', true, version);
    this.modelClassNamePre = 'GHSTS';
  }

  initDbfromTestData() {
    return new Q((res, rej) => {
      let self = this;
      let tdPath = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, 'test', 'products.json');
      let td = require(tdPath)['products'];
      let submissions = [], dossiers = [], products = [], qAry = [];
      // let plkInst = new PicklistService();

      td.map(item => {
        submissions.push(item.product.dossier.submission);
        delete item.product.dossier.submission;
        dossiers.push(item.product.dossier);
        delete item.product.dossier;
        products.push(item.product);
      });

      submissions = submissions.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkdecode(item);
          });
          return ret;
        } else
          return self._testDataPlkdecode(items);
      });

      dossiers = dossiers.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkdecode(item);
          });
          return ret;
        } else
          return self._testDataPlkdecode(items);
      });

      products = products.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkdecode(item);
          });
          return ret;
        } else
          return self._testDataPlkdecode(items);
      });

      let svrClass = require('./submission.service');
      let svr = new svrClass();

      submissions.map((items, index) => {
        qAry = [];        
        if (items.constructor === Array) {
          items.map(submission => {
            qAry.push(svr.edb_put(submission));
          });
        } else
          qAry.push(svr.edb_put(items));
        
        Q.all(qAry).bind(index)
        .then(rets => {
          let dQAry = [];
          let curIndex = index;
          let svrClass = require('./dossier.service');
          let svr = new svrClass();
          rets.map(items => {
            dossiers[curIndex].submission = [];
            if (items.constructor === Array) {
              items.map((submission) => {
                dossiers[curIndex].submission.push(JSON.parse(submission.data)._id.toString());
                dQAry.push(svr.edb_put(dossiers[curIndex]));
              });
            } else {
              dossiers[curIndex].submission.push(JSON.parse(items.data)._id.toString());
              dQAry.push(svr.edb_put(dossiers[curIndex]));
            }
            return Q.all(dQAry);
          });
        })
        .then(rets => {
          console.log(rets);
        })
        .catch(err => {
          console.log(err);
        });

      });
    });
  }
};
