const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.DossierService = class DossierService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'dossiers', undefined, 'DOSSIER', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
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