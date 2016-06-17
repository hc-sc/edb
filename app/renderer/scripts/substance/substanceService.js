import Nedb from 'nedb';
import xml2js from 'xml2js';
import { GHSTS } from '../common/ghsts';
import { ValueStruct, ExtValueStruct } from '../common/sharedModel';
import { Substance, SubstanceIdentifierStruct } from './substanceModel';
import { generatePid, validatePid } from '../common/pid';

class SubstanceService {
    constructor($q) {
        this.$q = $q;
        this.substancesDb = new Nedb({
            filename: `${__dirname}/db/substances`,
            autoload: true
        });
    }


    getSubstances() {
        let deferred = this.$q.defer();
        this.substancesDb.find({}, (err, rows) => {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });
        return deferred.promise;
    }

    createSubstance(sub) {
        let deferred = this.$q.defer();
        let status = new ValueStruct();
        let sub2DB = sub;
        let now = Date.now();

        sub2DB.METADATA_STATUS = sub2DB.METADATA_STATUS ? sub2DB.METADATA_STATUS : status;
        //TODO: temporary set value for new Id, needs to be defected to the new business role   
        sub2DB._identifier = sub2DB._identifier ? sub2DB._identifier : 'IDS' + now;
        sub2DB.SUBSTANCE_PID = sub2DB.SUBSTANCE_PID ? (validatePid(sub2DB.SUBSTANCE_PID) ? sub2DB.SUBSTANCE_PID : generatePid()) : generatePid();
        this.substancesDb.insert(sub2DB, (err, result) => {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    deleteSubstance(id) {
        let deferred = this.$q.defer();
        this.substancesDb.remove({ '_id': id }, function (err, res) {
            if (err) deferred.reject(err);
            console.log(res);
            deferred.resolve(res.affectedRows);
        });
        return deferred.promise;
    }

    updateSubstance(sub) {
        let deferred = this.$q.defer();
        this.substancesDb.update({ _id: sub._id }, sub, {}, (err, numReplaced) => {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }

    // inits the db, grabs info from a file and inserts it. NOTE that xml2js creates arrays
    initializeSubstances(submission) {
        let entities = submission.substances;

        entities.map(item => {
            let substance = new Substance();
            let status = new ValueStruct(item.METADATA_STATUS[0].VALUE[0], item.METADATA_STATUS[0].VALUE_DECODE[0]);
            substance.substanceId = item.attr$.Id;
            substance.METADATA_STATUS = status;
            substance.SUBSTANCE_NAME = item.SUBSTANCE_NAME[0];
            substance.SUBSTANCE_PID = item.SUBSTANCE_PID[0];
            item.SUBSTANCE_IDENTIFIER.forEach(it => {
                let idType = (typeof(it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]) === 'string') ?
                    new ExtValueStruct(
                        it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0], 
                        it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0]
                    ) :
                    new ExtValueStruct(
                        it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0]._, 
                        it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE_DECODE[0],
                        it.SUBSTANCE_IDENTIFIER_TYPE[0].VALUE[0].attr$.Other_Value
                    );
                let identifier = new SubstanceIdentifierStruct(idType, it.IDENTIFIER[0]);
                substance.addSubstanceIdentifier(identifier);
            })

            // insert into db
            this.createSubstance(substance);
        });
    }

    getSubstanceGHSTSById(id) {
        let deferred = this.$q.defer();
        this.substancesDb.find({ '_id': id }, (err, result) => {
            if (err) deferred.reject(err);
            let sJson = result[0];
            let substance = new Substance(sJson);

            let builder = new xml2js.Builder({
                rootName: 'SUBSTANCES',
                attrkey: 'attr$'
            });

            let xml = builder.buildObject(substance.toGhstsJson());
            deferred.resolve(xml);
        });
        return deferred.promise;
    }

    getSubstancesByName(name) {
        let deferred = this.$q.defer();
        let re = new RegExp(name, 'i');
        let condition = { $regex: re };

        this.substancesDb.find({ 'SUBSTANCE_NAME': condition }, (err, result) => {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
}

SubstanceService.$inject = ['$q'];

export { SubstanceService }