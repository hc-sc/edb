const BaseService = require('./base.service');
const path = require('path');
const Q = require('bluebird');
const BACKEND_CONST = require('../constants/backend');
const RVHelper = require('../utils/return.value.helper').ReturnValueHelper;

module.exports = class ProductService extends BaseService {
  constructor(version) {
    super('PRODUCT', true, version);
    this.modelClassNamePre = 'GHSTS';
    this.referencedBy = {refName: 'ghsts', field: '_product'};
    this.pidField = 'productpid';
  }

  initDbfromTestData() {
    return new Q((res, rej) => {
      let self = this;
      let tdPath = path.resolve('./', BACKEND_CONST.BASE_DIR1, BACKEND_CONST.BASE_DIR2, 'test', 'product.json');
      let td = require(tdPath)['product'];
      let submissions = [], dossiers = [], products = [], qAry = [];

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
            return self._testDataPlkDecode(item);
          });
          return ret;
        } else
          return self._testDataPlkDecode(items);
      });

      dossiers = dossiers.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkDecode(item);
          });
          return ret;
        } else
          return self._testDataPlkDecode(items);
      });

      products = products.map(items => {
        if (items.constructor === Array) {
          let ret = items.map(item => {
            return self._testDataPlkDecode(item);
          });
          return ret;
        } else
          return self._testDataPlkDecode(items);
      });

      let subSvrClass = require('./submission.service');
      let dosSvrClass = require('./dossier.service');
      let ghstsSvrClass = require('./ghsts.service');
      let subSvr = new subSvrClass();
      let dosSvr = new dosSvrClass();
      let ghstsSvr = new ghstsSvrClass();

      submissions.map((items, index) => {
        qAry = [];        
        if (items.constructor === Array) {
          items.map(submission => {
            qAry.push(subSvr._create(submission));
          });
        } else 
          qAry.push(subSvr._create(items));
        
        Q.all(qAry)
        .bind(index)
        .then(rets => {
          dossiers[index].submission = [];
          rets.map(items => {
            dossiers[index].submission.push(JSON.parse(items.data)._id.toString());
          });
          return self._create(products[index]);
        })
        .bind(index)
        .then(rets => {
          products[index] = JSON.parse(rets.data);
          dossiers[index].product = [products[index]._id.toString()];
          // console.log(dossiers[index].product);
          return dosSvr._create(dossiers[index]);
        })
        .bind(index)
        .then(rets => {
          products[index].dossier = [JSON.parse(rets.data)._id.toString()];
          // console.log(products[index].dossier);
          return self.edb_post(products[index]);
        })
        .bind(index)
        .then(rets => {
          if (submissions[index].length === 1) {
            ghstsSvr._create({
              _submissionid: dossiers[index].submission[0],
              _submissionnumber: submissions[index][0].submissionnumber,
              _product: products[index]._id,
              _foldername: products[index].genericproductname + BACKEND_CONST.PRODUCT_DOSSIER_FOLDER_CONTACT_SYMBOL + dossiers[index].dossierdescriptiontitle
            })
            .then(ret => {
              res(ret);
            })
            .catch(err => {
              rej(err);
            });
          } else {
            res(new RVHelper('EDB00000'));
          }
        })
        .catch(err => {
          rej(err);
        });
      });
    });
  }
};
