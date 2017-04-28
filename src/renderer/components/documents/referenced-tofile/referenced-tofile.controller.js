import ModalBaseCtrl from '../../common/modal.base.controller';

export default class ReferencedToFileCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService, $scope, AppDataService, $state) {
    super($mdDialog, index, node, picklists, picklistService, $scope);
    this.$state = $state;
    this.appDataService = AppDataService.getService();
    this.appDataService.edb_get({_url: 'file'})
      .then(ret => {
        this.files = JSON.parse(ret.data); 
        console.log(this);
        this.files = this.files.filter(file => {
          return file._dossier === this.$state.params.dossierid;
        });        
      })
      .catch(err => {
        console.log(err);
      });
  }
}