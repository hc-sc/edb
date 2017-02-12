//import angular from 'angular';
import BaseCtrl from '../common/base.controller';

export default class SubstancesCtrl extends BaseCtrl {
  constructor($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, $scope, GhstsService, $transitions) {
    super($mdDialog, $mdToast, $state, PicklistService, AppDataService, ModelService, 'sender', $scope, GhstsService, $transitions);
    this.getAppData({}, 'legalentity')
      .then(legalEntities => {
        this.legalEntities = JSON.parse(legalEntities.data);
        let raId = this.picklistService.edb_getSync({
          value: 'Regulatory Authority'
        })[0]._id;
        this.legalEntities = this.legalEntities.filter((el) =>
          el.legalentitytype && (el.legalentitytype.toLowerCase() === raId)
        );
      });
    this.senderArray;
    this.init()
      .then(
        () => {
         // this.senderArray=Array.from(this.records);
          this.senderArray=JSON.parse(JSON.stringify(this.records));
          let le;
          for (let item of this.senderArray) {
            le = this.appDataService.edb_getSync({
              _url: 'legalentity',
              data: {
                _id: item.toLegalEntityId
              }
            })[0];
            item.name = le.legalentityname;
          }
        }
      )
      .then(() => {
        this.loading = false;
      });
  }

}