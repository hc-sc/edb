import Nedb from 'nedb';
import xml2js from 'xml2js';
import { GHSTS } from '../common/ghsts';
import { Dossier, ReferencedDossier, DossierRA } from './dossierModel';
import { ValueStruct } from '../common/sharedModel';

class DossierService {
    constructor($q) {
        this.$q = $q;
        this.dossiers = new Nedb({
            filename: `${__dirname}/db/dossiers`,
            autoload: true
        });
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
        console.log('creating dossier');
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
    
    initializeDossiersFromXml() {
        let ghsts = new GHSTS('./app/renderer/data/ghsts.xml');
        return ghsts.readObjects()
            .then(() => {
                const rawDossier = ghsts.dossier[0];
                console.log(rawDossier);
                
                let dossier = new Dossier();
                
                dossier.DOSSIER_PID = rawDossier.DOSSIER_PID[0];
                dossier.DOSSIER_DESCRIPTION_TITLE = rawDossier.DOSSIER_DESCRIPTION_TITLE[0];
                dossier.DOSSIER_COMP_ID = rawDossier.DOSSIER_COMP_ID[0];
                
                for (const refDos of rawDossier.REFERENCED_DOSSIER) {
                    let rd = new ReferencedDossier();
                    rd.REFERENCED_DOSSIER_NUMBER = refDos.REFERENCED_DOSSIER_NUMBER[0];
                    rd.REFERENCED_DOSSIER_REASON = refDos.REFERENCED_DOSSIER_REASON[0];
                    dossier.addReferencedDossier(rd);
                }
                
                for (const dossierRA of rawDossier.DOSSIER_RA) {
                    let dra = new DossierRA();
                    console.log(dossierRA);
                    dra.REGULATORY_TYPE = new ValueStruct(dossierRA.REGULATORY_TYPE[0].VALUE[0], dossierRA.REGULATORY_TYPE[0].VALUE_DECODE[0]);
                    
                    dra.APPLICATION_TYPE = new ValueStruct(dossierRA.APPLICATION_TYPE[0].VALUE[0], dossierRA.APPLICATION_TYPE[0].VALUE_DECODE[0]);
              
                    dra.PROJECT_ID_NUMBER = dossierRA.PROJECT_ID_NUMBER;
                          
                    dossier.addDossierRA(dra);
                }
                                
                this.createDossier(dossier);
            })
            .catch(err => console.log(err.stack));
    }
}

DossierService.$inject = ['$q'];

export { DossierService };