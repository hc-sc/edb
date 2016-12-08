import ModalBaseCtrl from '../../common/modal.base.controller';

export default class FileRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
  }
}