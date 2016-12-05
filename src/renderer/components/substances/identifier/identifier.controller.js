import ModalBaseCtrl from '../../common/modal.base.controller';

export default class SubstanceIdentifierCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists) {
    super($mdDialog);
    this.node = node;
    this.index = index;
    this.picklists = picklists;
  }
}