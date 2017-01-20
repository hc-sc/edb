import ModalBaseCtrl from '../../common/modal.base.controller';

export default class DocumentRACtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, AppDataService) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
    this.appDataService = AppDataService.getService();
    this.appDataService.edb_get({_url: 'receiver'})
      .then(ret => {
        this.receivers = JSON.parse(ret.data); 
      })
      .catch(err => {
        console.log(err);
      });
  }
  //  addComment(){
  //    console.log("Add new list here");
  //  }

  //  deleteComment(comment, $event){
  //    console.log("delete item here" + comment);
  //  }
}