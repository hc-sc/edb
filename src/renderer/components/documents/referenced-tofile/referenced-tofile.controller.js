import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ReferencedToFileCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, AppDataService) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
    this.appDataService = AppDataService.getService();
    this.appDataService.edb_get({_url: 'file'})
      .then(ret => {
        this.files = JSON.parse(ret.data); 
      })
      .catch(err => {
        console.log(err);
      });
  }
}