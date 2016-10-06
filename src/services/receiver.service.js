const BaseService = require('./base.service');
const BACKEND_CONST = require('../constants/backend');

exports.ReceiverService = class ReceiverService extends BaseService {
  constructor($q, level, prodAndDossierName, isActive) {
    super($q, 'receivers', undefined, 'RECEIVER', level, prodAndDossierName, isActive ? BACKEND_CONST.ACTIVE_SUBMISSION_NAME : BACKEND_CONST.LAST_SUBMISSION_NAME);
  }
};

//import Nedb from 'nedb';
/*var Nedb = require('nedb');
import xml2js from 'xml2js';
import {ValueStruct} from '../common/sharedModel.js';
import {Receiver, Sender} from './receiverModel.js';

class ReceiverService {
    constructor($q, legalEntityService) {
        this.$q = $q;
        this.legalEntityService = legalEntityService;
        this.receivers = new Nedb({ filename: __dirname + '/db/receivers', autoload: true });
    }

    getReceivers() {
        let deferred = this.$q.defer();
        this.receivers.find({}, function (err, rows) {
            if (err) deferred.reject(err);
            deferred.resolve(rows);
        });
        return deferred.promise;
    }

    getReceiverById(id) {
        let deferred = this.$q.defer();
        this.receivers.find({ '_id': id }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getReceiverByName(name) {
        let deferred = this.$q.defer();
        var re = new RegExp(name, 'i');
        let condition = { $regex: re };
        this.receivers.find({ 'SHORT_NAME': condition }, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getRAsWithLegalEntityName() {
        let legalEntities = [];
        let receivers = [];

        return this.legalEntityService.getLegalEntities()
            .then(les => {
                legalEntities = les.map(le => {
                    return le;
                });

                return this.getReceivers();
            })
            .then(res => {
                receivers = res.map(re => {
                    return re;
                });

                let receiversWithNames = [];

                for (const rec of receivers) {
                    for (const le of legalEntities) {
                        if (le._identifier === rec._toLegalEntityId) {
                            receiversWithNames.push({
                                xsId: rec._identifier,
                                name: le.LEGALENTITY_NAME
                            });

                            break;
                        }
                    }
                }
                return receiversWithNames;
            });
    }

    createReceiver(Receiver) {
        let deferred = this.$q.defer();
        this.receivers.insert(Receiver, function (err, result) {
            if (err) deferred.reject(err);
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    deleteReceiver(id) {
        let deferred = this.$q.defer();
        this.receivers.remove({ '_id': id }, function (err, res) {
            if (err) deferred.reject(err);
            deferred.resolve(res.affectedRows);
        });
        return deferred.promise;
    }

    updateReceiver(Receiver) {
        let deferred = this.$q.defer();
        this.receivers.update({ _id: Receiver._id }, Receiver, {}, function (err, numReplaced) {
            if (err) deferred.reject(err);
            deferred.resolve(numReplaced);
        });
        return deferred.promise;
    }

    // the following are demo related methods.  can be moved to a dedicated test class later
    getReceiverGHSTSById(id) {
        // return GHSTS xml from receiver json.
        let deferred = this.$q.defer();
        this.receivers.find({ '_id': id }, function (err, result) {
            if (err) deferred.reject(err);

            // retrieved Json from database
            let rcvrJSON = result[0];
            // create Receiver based on receiver JSON
            let rcvr = new Receiver(rcvrJSON);

            // convert to XML
            let builder = new xml2js.Builder({ rootName: 'RECEIVER', attrkey: 'attr$' });
            let xml = builder.buildObject(rcvr.toGHSTSJson());
            deferred.resolve(xml);
        });
        return deferred.promise;
    }

    initializeReceivers(submission) {
        // read from sample ghsts and populate the database with receivers.
        let entities = submission.receivers;
        entities.forEach(rcvr => {
            // convert GHSTS json to receivers objects
            // xml2js' use-and-abuse array setting is on to play safe for now, hence the default array references.
            let status = new ValueStruct(rcvr.METADATA_STATUS[0].VALUE[0], rcvr.METADATA_STATUS[0].VALUE_DECODE[0]);
            let receiver = new Receiver();
            receiver.receiverId = rcvr.attr$.Id;
            receiver.toLegalEntityId = rcvr.attr$.To_Legal_Entity_Id;
            receiver.METADATA_STATUS = status;
            receiver.ROLE = rcvr.ROLE ? rcvr.ROLE[0] : '';
            receiver.SHORT_NAME = rcvr.SHORT_NAME[0];

            let sender = new Sender();
            // the sample only has one sender in each receiver, otherwise we need to loop through the senders
            sender.toLegalEntityId = rcvr.SENDER[0].attr$.To_Legal_Entity_Id;
            sender.COMPANY_CONTACT_REGULATORY_ROLE = rcvr.SENDER[0].COMPANY_CONTACT_REGULATORY_ROLE ? rcvr.SENDER[0].COMPANY_CONTACT_REGULATORY_ROLE[0] : '';
            sender.REMARK =  rcvr.SENDER[0].REMARK ? rcvr.SENDER[0].REMARK[0] : '';
            receiver.addSender(sender);

            // enable the following to insert into db.
            this.createReceiver(receiver);

        });
    }

    _createSampleReceiver() {
        // private method: create a sample receiver for tests
        let  rcvr = new Receiver();
        rcvr.METADATA_STATUS = new ValueStruct('New', 'New');
        rcvr.SHORT_NAME = 'HealthCan';
        rcvr.ROLE = 'Recipient';
        rcvr.receiverId = 'ID_RCVR_HC';
        rcvr.toLegalEntityId = 'LE_CA_AUTHORITY';         // the number is from le sample
        let sender = new Sender();
        sender.toLegalEntityId = 'LE_CA_DRUGSYS';
        sender.COMPANY_CONTACT_REGULATORY_ROLE = 'Sender';
        sender.REMARK = 'Kanata Drug System';

        rcvr.addSender(sender);

        console.log(JSON.stringify(rcvr));
        return rcvr;
    }

    addReceiverToDB() {
        // add a new receiver to database
        let rcvr = this._createSampleReceiver();
        this.createReceiver(rcvr);
    }

}

ReceiverService.$inject = ['$q', 'legalEntityService'];

export { ReceiverService };
*/