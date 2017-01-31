import ModalBaseCtrl from '../../common/modal.base.controller';

export default class DossierRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, ModelService, AppDataService) {
    super($mdDialog, index, node, picklists, picklistService, $scope, ModelService);
    console.log(this);
  }
}