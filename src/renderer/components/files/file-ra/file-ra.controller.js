import ModalBaseCtrl from '../../common/modal.base.controller';

export default class FileRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, ModelService, AppDataService, isSubmission, curGhsts) {
    super($mdDialog, index, node, picklists, picklistService, $scope, ModelService);
    this.appDataService = AppDataService.getService();
    this.isSubmission = isSubmission;
    this.ghsts = curGhsts;
    this.getReceivers();
  }
}