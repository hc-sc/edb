import { DossierDataService } from '../../services/app.data.service';
//import {GhstsService} from '../../services/ghsts.service';
export default class BaseCtrl {
    //url make it specific
    constructor($state,PicklistService,GhstsService, AppDataService, url) {//pass specific data service and url
        let that = this;
        this.$state=$state;
        this.url = url;
        this.pickListService = PicklistService.getService();
        //  this.GhstsService = GhstsService.getService();
        this.AppDataService = AppDataService.getService();
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
    getRecords(data = {}) {
        return this.AppDataService.edb_get({ url: this.url, data: {} });
    }
    createRecord(data) { // set data with url
        DossierDataService.edb_put(data);
    }
    deleteRecord(data) {
        DossierDataService.edb_delete(data);
    }
    updateRecord(data) {
        DossierDataService.edb_post();
    }
}