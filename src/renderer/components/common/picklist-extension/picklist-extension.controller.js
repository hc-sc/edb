
//import PicklistModel from '../../../../view-models/picklist.model';

export default class PcilstController {
  constructor() {
    this.value = null;
    this.valueDecode = null;
    this.update = function () {
      // aNewOption=new PicklistModel(input.typename,value,valueDecode,input.isExt,input.status);
      //this.selectedOption.VALUE=value;
      // this.selectedOption.VALUE_DECODE=valueDecode;
      console.log(this.value);
      this.onUpdate({value:this.value, valueDecode:this.valueDecode});
    };
    this.cancel=function(){
          this.value = null;
    this.valueDecode = null;
    this.onClose();
    }
  }

}
//pass a specific but incompleted option
//and a callback to take completed option for parent to take and save