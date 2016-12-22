import ModalBaseCtrl from '../../common/modal.base.controller';

export default class DossierRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
    console.log(this);
  }
}