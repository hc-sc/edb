const BaseService = require('./base.service');

module.exports = class TocService extends BaseService {
  constructor(version) {
    super('TOC', true, version);
    this.modelClassNamePre = 'GHSTS';
  }
};

//import Nedb from 'nedb';
/*var Nedb = require('nedb');
import xml2js from 'xml2js';

// needs to get fixed up.
class TocService {
    constructor($q) {
        this.$q = $q;
        this.tocs = new Nedb({
            filename: __dirname + '/db/tocs',
            autoload: true
        });
    }

    getTocs() {
        let deferred = this.$q.defer();
        this.tocs.find({}, function (err, rows) {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });
        return deferred.promise;
    }

    getTocById(id) {
        let deferred = this.$q.defer();
        this.tocs.find({ '_id': id }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getTocByName(name) {
        let deferred = this.$q.defer();
        var re = new RegExp(name, 'i');
        let condition = { $regex: re };
        this.tocs.find({ 'SHORT_NAME': condition }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    createToc(Toc) {
        let deferred = this.$q.defer();
        this.tocs.insert(Toc, function (err, result) {
            console.log(err)
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    deleteToc(id) {
        let deferred = this.$q.defer();
        this.tocs.remove({ '_id': id }, function (err, res) {
            if (err) deferred.reject(err);
            console.log(res);
            deferred.resolve(res.affectedRows);
        });
        return deferred.promise;
    }

    updateToc(Toc) {
        let deferred = this.$q.defer();
        this.tocs.update({ _id: Toc._id }, Toc, {}, function (err, numReplaced) {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }
}

TocService.$inject = ['$q'];

export {TocService};
*/
