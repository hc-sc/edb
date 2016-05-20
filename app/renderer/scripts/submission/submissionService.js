import Nedb from 'nedb';
import xml2js from 'xml2js';
import uuid from 'node-uuid';
import { GHSTS } from '../common/ghsts';
import { ValueStruct } from '../common/sharedModel';
import Submission from './submissionModel';

class SubmissionService {
    constructor($q) {
        this.$q = $q;
        this.submissions = new Nedb({ 
            filename: `${__dirname}/db/submissions`,
            autoload: true 
        });
    }
    
    getSubmission() {
        let deferred = this.$q.defer();
        this.submissions.find({}, (err, rows) => {
           if (err) deferred.reject(err);
           deferred.resolve(rows);
        });
        return deferred.promise;
    }
    
    createSubmission(sub) {
        let deferred = this.$q.defer();
        this.submissions.insert(sub, (err, result) => {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    deleteSubmission(id) {
        ;
    }
    
    updateSubmission(sub) {
        let deferred = this.$q.defer();
        this.submissions.update({ _id: sub._id }, sub, {}, (err, numReplaced) => {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }
    
    // inits the db, grabs info from a file and inserts it. NOTE that xml2js creates arrays
    initializeSubmissions() {
        let ghsts = new GHSTS('./app/renderer/data/ghsts.xml');
        return  ghsts.readObjects().then(() => {
           let entities = ghsts.submission;

           entities.map(item => {
               let submission = new Submission();
               submission.SUBMISSION_NUMBER = item.SUBMISSION_NUMBER[0];
               submission.SUBMISSION_VERSION_DATE = item.SUBMISSION_VERSION_DATE[0];
               submission.SUBMISSION_TITLE = item.SUBMISSION_TITLE[0];
               submission.INCREMENTAL = item.INCREMENTAL[0];
               
               // insert into db
               this.createSubmission(submission);
            })
        });
    }
    
    getSubmissionGHSTSById(id) {
        let deferred = this.$q.defer();
        this.submissions.find({ '_id': id }, (err, result) => {
            if (err) deferred.reject(err);
            const sJson = result[0];
            const submission = new Submission(sJson);
            
            const builder = new xml2js.Builder({
                rootName: 'SUBMISSION', 
                attrkey: 'attr$'
            });
            
            const xml = builder.buildObject(submission.toGhstsJson());
            deferred.resolve(xml);
        });
        return deferred.promise;
    }
}

SubmissionService.$inject = ['$q'];

export { SubmissionService }