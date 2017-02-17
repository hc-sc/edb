import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ProductRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, ModelService, AppDataService, isSubmission, curGhsts) {
    super($mdDialog, index, node, picklists, picklistService, $scope, ModelService);
    this.appDataService = AppDataService.getService();
    this.isSubmission = isSubmission;
    this.ghsts = curGhsts;
    this.appDataService.edb_get({_url: 'substance'})
      .then(ret => {
        this.substances = JSON.parse(ret.data); 
      })
      .catch(err => {
        console.log(err);
      });
    this.getReceivers();
  }
}