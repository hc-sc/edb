const BaseService = require('./base.service');
const Q = require('bluebird');
const ProductService = require('./product.service');
const _ = require('lodash');

module.exports = class DossierService extends BaseService {
  constructor(version) {
    super('DOSSIER', true, version);
    this.modelClassNamePre = 'GHSTS.PRODUCT';
    this.referencedBy = {refName: 'product', field: 'dossier'};
    this.pidField = 'dossierpid';
  }
  
  edb_delete(id) {
    return new Q((res, rej) => {
      let self = this;
      let dossierInDB = DossierService.edb_getSync({_id: id})[0];
      let curProd = _.merge({}, ProductService.edb_getSync({_id: dossierInDB.product[0]})[0]);
      let proSvr = new ProductService(self.version);
      curProd.dossier = undefined;

      super.edb_delete(id)
      .then(() => {
        return proSvr.edb_post(curProd)
      })
      .then(proRet => {
        res(proRet);
      })
      .catch(err =>{
        rej(err);
      });
    });
  }

  edb_put(obj) {
    let dossierInDB = DossierService.edb_getSync({_id: obj._id})[0];
    if (dossierInDB._state === obj._state)
      return super.edb_post(obj);
    else 
      return this._change_state(obj);
  }

  _change_state(obj) {
    return new Q((res, rej) => {
      let self = this;
      let curProd = _.merge({}, obj.product[0]);
      let proSvr = new ProductService(self.version);
      obj.product[0] = obj.product[0]._id;

      curProd.dossier = undefined;
      super.edb_post(obj)
      .then(() => {
        return proSvr.edb_post(curProd);
      })
      .then(proRet => {
        res(proRet);
      })
      .catch(err => {
        rej(err);
      });
    });
  }
};

/*
  getDossiers() {
    let deferred = this.$q.defer();
    this.dossiers.find({}, (err, rows) => {
      if (err) deferred.reject(err);
      deferred.resolve(rows);
    });
    return deferred.promise;
  }

  createDossier(dossier) {
    let deferred = this.$q.defer();
    this.dossiers.insert(dossier, (err, res) => {
      if (err) deferred.reject(err);
      deferred.resolve(res);
    });
    return deferred.promise;
  }

  updateDossier(dossier) {
    let deferred = this.$q.defer();
    this.dossiers.update({ _id: dossier._id }, dossier, {}, (err, numReplaced) => {
      if (err) deferred.reject(err);
      deferred.resolve(numReplaced);
    });
    return deferred.promise;
  }

  getDossierGHSTSById(id) {
    let deferred = this.$q.defer();
    this.dossiers.find({ '_id': id }, (err, rows) => {
      if (err) deferred.reject(err);
      const dossier = new Dossier(rows[0]);
      const builder = new xml2js.Builder({
        rootName: 'DOSSIER',
        attrkey: 'attr$'
      });
      const xml = builder.buildObject(dossier.toGhstsJson());
      deferred.resolve(xml);
    });
    return deferred.promise;
  }

  initializeDossiers(submission) {
    const rawDossier = submission.dossier;

    let dossier = new Dossier();

    dossier.DOSSIER_PID = rawDossier.DOSSIER_PID[0];
    dossier.DOSSIER_DESCRIPTION_TITLE = rawDossier.DOSSIER_DESCRIPTION_TITLE[0];
    dossier.DOSSIER_COMP_ID = rawDossier.DOSSIER_COMP_ID[0];

    // can be 0..*
    if (rawDossier.REFERENCED_DOSSIER) {
      for (const refDos of rawDossier.REFERENCED_DOSSIER) {
        let rd = new ReferencedDossier();
        rd.REFERENCED_DOSSIER_NUMBER = refDos.REFERENCED_DOSSIER_NUMBER[0];
        rd.REFERENCED_DOSSIER_REASON = refDos.REFERENCED_DOSSIER_REASON[0];
        dossier.addReferencedDossier(rd);
      }
    }
    else dossier.REFERENCED_DOSSIER = [];

    for (const dra of rawDossier.DOSSIER_RA) {
      let dossierRA = new DossierRA();

      dossierRA._toSpecificForRAId = dra.attr$.To_Specific_for_RA_Id;

      // can be 0..*
      dossierRA.PROJECT_ID_NUMBER = dra.PROJECT_ID_NUMBER ? dra.PROJECT_ID_NUMBER : [];

      if (typeof dra.REGULATORY_TYPE[0].VALUE[0] === 'object') {
        dossierRA.REGULATORY_TYPE = new ExtValueStruct(
          dra.REGULATORY_TYPE[0].VALUE[0]._,
          dra.REGULATORY_TYPE[0].VALUE_DECODE[0],
          dra.REGULATORY_TYPE[0].VALUE[0].attr$.Other_Value
        );
      }
      else {
        dossierRA.REGULATORY_TYPE = new ExtValueStruct(
          dra.REGULATORY_TYPE[0].VALUE[0],
          dra.REGULATORY_TYPE[0].VALUE_DECODE[0]
        );
      }

      if (typeof dra.APPLICATION_TYPE[0].VALUE[0] === 'object') {
        dossierRA.APPLICATION_TYPE = new ExtValueStruct(
          dra.APPLICATION_TYPE[0].VALUE[0]._,
          dra.APPLICATION_TYPE[0].VALUE_DECODE[0],
          dra.APPLICATION_TYPE[0].VALUE[0].attr$.Other_Value
        );
      }
      else {
        dossierRA.APPLICATION_TYPE = new ExtValueStruct(
          dra.APPLICATION_TYPE[0].VALUE[0],
          dra.APPLICATION_TYPE[0].VALUE_DECODE[0]
        );
      }

      dossier.addDossierRA(dossierRA);
    }

    for (const submission of rawDossier.SUBMISSION) {
      let sub = new Submission();

      sub.SUBMISSION_NUMBER = submission.SUBMISSION_NUMBER[0];
      sub.SUBMISSION_VERSION_DATE = submission.SUBMISSION_VERSION_DATE[0];
      sub.SUBMISSION_TITLE = submission.SUBMISSION_TITLE[0];
      sub.INCREMENTAL = submission.INCREMENTAL[0];

      dossier.addSubmission(sub);
    }

    this.createDossier(dossier);
  }
}

DossierService.$inject = ['$q'];

export { DossierService };
*/