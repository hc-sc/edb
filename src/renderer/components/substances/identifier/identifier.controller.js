import ModalBaseCtrl from '../../common/modal.base.controller';

export default class SubstanceIdentifierCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
  }
}