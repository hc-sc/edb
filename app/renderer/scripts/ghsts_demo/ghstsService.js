import {GHSTS} from '../common/ghsts.js'
import {ContactPerson, ContactAddress, LegalEntity} from '../legal_entity/legalEntityModel.js';
import {Receiver, Sender} from '../receiver/receiverModel.js'
import {ValueStruct, IdentifierStruct} from '../common/sharedModel.js'
import Submission from '../submission/submissionModel';

const outputFile = './app/renderer/data/DemoGHSTS.xml';

class GhstsService {
    constructor(ReceiverService, LegalEntityService, SubmissionService) {
        this.receiverService = ReceiverService;
        this.legalEntityService = LegalEntityService; 
        this.submissionService = SubmissionService; 
    }
            
    assembleDemoGHSTS(){          
        // read from existing ghsts.xml for most of the objects
        let ghsts = new GHSTS("./app/renderer/data/ghsts.xml");     
        let promise = ghsts.readObjects();
        let self = this;
        // listen for both fulfillment and rejection        
        promise.then(function(contents) {
            console.log('read from xml into obj.  now about to read from database to get the objects');            

            // add legal entities from database to GHSTS
            let leListPromise = self.legalEntityService.getLegalEntities(); 
            leListPromise.then(function(leList) {
                // console.log('get le lists', leList)                
                leList.forEach(le => { 
                    let leObj = new LegalEntity(le);
                    ghsts.addLegalEntity(leObj.toGHSTSJson());
                });

                // add receivers from database to GHSTS
                let rcvrListPromise = self.receiverService.getReceivers(); 
                rcvrListPromise.then(function(rcvrList) {                    
                    rcvrList.forEach(receiver => {
                        let rcvrObj = new Receiver(receiver);
                        // console.log('receiver json ', rcvrObj.toGHSTSJson())     
                        ghsts.addReceiver(rcvrObj.toGHSTSJson());
                    });
                    
                    //replace submission
                    //NOTE: at this point, there is no restrictions on how many times we've inserted a submission into the DB, so there may be several rows returned, just grab the first
                    let submissionPromise = self.submissionService.getSubmission();
                    submissionPromise.then(submission => {
                        let subObj = new Submission(submission[0]);
                        ghsts.addSubmission(subObj.toGHSTSJson());
                        
                        let sub = ghsts.submission[0];
                        
                        //NOTE: this ghsts has an inner ghsts object that is used to actually write the xml. Default is to append new nodes, rather than replace, so we need to replace it by hand. See console output
                        // console.log(ghsts.ghsts.PRODUCT[0].DOSSIER[0].SUBMISSION);
                        
                        //replace the submission that was there
                        ghsts.ghsts.PRODUCT[0].DOSSIER[0].SUBMISSION = sub;
                        
                        //we have built the object, output to xml file
                        ghsts.writeXML(outputFile);
                        console.log(`Written to ${outputFile}`);
                    });
                })
            })
        }, function(err) {
            // rejection
            console.error(err.message);
        });    
    }        
}

GhstsService.$inject = [ 'receiverService', 'legalEntityService', 'submissionService'];

export { GhstsService }


