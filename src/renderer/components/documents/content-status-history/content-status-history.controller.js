import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ContentStatusHistoryCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService) {
    super($mdDialog, index, node, picklists, picklistService);
  }
}