import PicklistModel from "../../../../models/picklist.model";
export default class DropdownCtrl {
  constructor(PicklistService) {
    this.pickListService=PicklistService.getService();
    this.selectedOption = null;
    // this.extMode = false;//extensible
    this.isOpened = false;
    this.update = function () {
      this.isOpened = true;
      console.log('isOpened is ' + this.isOpened);
      this.selectedOption = new PicklistModel(this.typename);
     // this.selectedOption.
    }
    //save
    this.saveReload = function (value, valueDecode) {
      this.selectedOption.VALUE = value;
      this.selectedOption.VALUE_DECODE = valueDecode;
      //no file found
      this.pickListService.edb_put(this.selectedOption).then(added => {
        console.log(`${added.length} added.`);
      })
        .catch(err => {
          console.log(err);
        });
        //{'TYPE_NAME': 'TYPE_METADATA_STATUS'}
        //this.typename, true
      this.pickListService.edb_get({'TYPE_NAME': this.typename}).then(
        options => {
          console.log(options);
          this.options = options.data;//returnedObject.data
        }
      );
    }
    this.close=function(){
      this.isOpened=false;
    }
  }
  
  //pass new type to parent component
  //dropdown display the new type
  //parent save new type to database and reload 
  //pass a incompleted option to pk-ext component
  //pk-ext take user input compplete the new option and pass back
  //only top level component contact back service


}
DropdownCtrl.$inject=['PicklistService'];