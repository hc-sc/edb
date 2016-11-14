import { DossierDataService } from '../../services/dossier.data.service';
//import {GhstsService} from '../../services/ghsts.service';
import NewFactory from '../common/NewFactory';
export default class BaseCtrl {
    //url make it specific
    constructor($mdDialog, $state, PicklistService, GhstsService, DossierDataService, url) {//pass specific data service and url
        let that = this;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.url = url;
        this.pickListService = PicklistService.getService();
        //  this.GhstsService = GhstsService.getService();
        this.DossierDataService = DossierDataService.getService();
        this.records = []; //declare a whole entity instead of some specific fields
        this.selectedRecord = null;
        //tool bar
        this.getRecords({})
            .then(result => { that.records = result.data; that.selectedRecord = result.data[0]; });
        /*
        this.$init = function () {
            that.getRecords({})
                .then(result => { that.records = result.data; that.selectedRecord = result.data[0]; });
        }
        */
    }
    getRecords(data = {}) { //get by id from backend
        return this.DossierDataService.edb_get({ url: this.url, data: {} });
    }
    createRecord(data) { // set data with url
        DossierDataService.edb_put(data);
    }
    saveRecord(event) {
        let that=this;
        if (this.selectedRecord && this.selectedRecord._id) {
            this.DossierDataService.edb_post({ url: this.url, data: this.selectedRecord }).then(
               
                affectedRows =>{
                console.log("test");
                that.$mdDialog.show(
                    that.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Updated Successfully!')
                        .ok('Ok')
                        .targetEvent(event)
                )} 

            );
        }
        else {
            this.DossierDataService.edb_put({ url: this.url, data: this.selectedRecord }).then(affectedRows =>
                that.$mdDialog.show(
                    that.$mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent(event)
                )
            );

            // refresh the substance list
            that.getRecords();
        }
       
        console.log("save record");
    }
    addRecord(name) { //factory method by entity name
        let record = NewFactory.getObject(name);
        //substance.SUBSTANCE_NAME = 'New';
        this.records.push(record);
        this.selectedRecord = record;
        this.selectedIndex = this.records.length - 1;
    }
    deleteRecord($event) {

        let confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .content('Are you sure you want to delete this substance?')
            .ok('Yes')
            .cancel('No')
            .targetEvent($event);

        this.$mdDialog.show(confirm).then(() => {
            console.log("delete record.");
           // that.DossierDataService.edb_delete({ url: this.url, data: {} });
        });


    }
    updateRecord(data) {
        DossierDataService.edb_post(data);
    }
}