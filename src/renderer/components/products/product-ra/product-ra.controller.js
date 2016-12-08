import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ProductRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, AppDataService) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
    this.appDataService = AppDataService.getService();
    this.appDataService.edb_get({_url: 'substance'})
      .then(ret => {
        this.substances = JSON.parse(ret.data); 
      })
      .catch(err => {
        console.log(err);
      });
  }
}