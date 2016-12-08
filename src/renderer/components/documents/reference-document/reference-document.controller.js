import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ReferenceDocumentCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService) {
    super($mdDialog, index, node, picklists, picklistService);
  }
}