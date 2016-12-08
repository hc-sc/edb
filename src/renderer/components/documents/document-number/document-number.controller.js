import ModalBaseCtrl from '../../common/modal.base.controller';

export default class DocumentNumberCtrl extends ModalBaseCtrl {
  constructor($mdDialog, index, node, picklists, picklistService) {
    super($mdDialog, index, node, picklists, picklistService);
    
  }

  updateDocNumType(prop, value) {
    //this.selected.contactaddress[prop] = value;
    console.log("prop: " + prop);
    console.log("value: " + value);
    
   //this.documentCtrl.updateDocumentNumber("hai");
    //this.selected.documentgeneric.documentnumber[prop] = value;
  }
}