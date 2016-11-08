export default class Picklist {
  constructor(typename, value, decode, isExt, status, id) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
        if (this._pklid) {  //from front-end object
          this._id = this._pklid;
          delete this._pklid;
        }
      } else if (typeof typename === 'string') {
        if (id)
          this._id = id;
        this.TYPE_NAME = typename;
        this.VALUE = value;
        this.VALUE_DECODE = decode;
        this.STATUS = status ? status : 'enabled';
        this.isExt = (isExt !== 'undefined') ? isExt : true;
      } else {
        console.log('Error: wrong using of Picklist constructor with Type_Name 1: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of Picklist constructor with Type_Name 2: [' + typename + '] / Value: [' + value + ']');
    } 
  }   
}