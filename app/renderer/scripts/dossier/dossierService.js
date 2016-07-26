import Nedb from 'nedb';
import xml2js from 'xml2js';
import { GHSTS } from '../common/ghsts';
import { Dossier, ReferencedDossier, DossierRA } from './dossierModel';
import { Submission } from '../submission/submissionModel';
import { ExtValueStruct } from '../common/sharedModel';

const fs = require('fs');
const path = require('path');

class DossierService {
    constructor($q) {
        this.$q = $q;
        this.dossiers = new Nedb({
            filename: `${__dirname}/db/dossiers`,
            autoload: true
        });

        this.basePathName = null;
    }

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

    validBaseDossierPath(pathName) {
        return pathName;
    }

    setBaseDossierPath(basePathName) {
        this.basePathName = basePathName;
    }

    getBaseDossierPath() {
        return this.basePathName;
    }

    createDossierFolders(baseFolderName) {
        let deferred = this.$q.defer();
        let sep = path.sep;
        let self = this;

        if (baseFolderName) {
            self.setBaseDossierPath(baseFolderName);
        }

        self._createFolder(self.getBaseDossierPath() + sep + '01')
            .then((folder) => {
                self._createFolder(folder + sep + 'content');
                self._createFolder(folder + sep + 'confidential');
                self._createFolder(folder + sep + 'utils')
                    .then((folder) => {
                        self._createFolder(folder + sep + 'viewer');
                        self._createFolder(folder + sep + 'toc');
                        self._createFolder(folder + sep + 'resources')
                    });
            })
            .then(() => {
                fs.writeFile(
                    self.getBaseDossierPath() + sep + '01' + sep + '.incomplete',
                    'The submission is not complated.',
                    (err) => {
                        if (err) console.log(err);
                    }
                );
            })
            .catch(err => {
                console.log(err);
            });
            deferred.resolve('The new dossier folder created.');
            return deferred.promise;
    }

    _createFolder(folderName) {
        let deferred = this.$q.defer();
        fs.mkdir(folderName, (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    deferred.resolve(folderName);
                } else {
                    deferred.reject(err);
                } 
            } else {
                deferred.resolve(folderName);
            }
        });
        return deferred.promise;
    }

}

DossierService.$inject = ['$q'];

export { DossierService };

