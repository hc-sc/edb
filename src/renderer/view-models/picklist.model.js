export default class Picklist {
  constructor(typename, value, decode, isExt, status, id) {
    if (typename) {
      if (typeof typename === 'object') {
        Object.assign(this, typename);
      } else if (typeof typename === 'string') {
        if (id)
          this.id = id;
        this.TYPE_NAME = typename;
        this.value = value;
        this.valuedecode = decode;
        this.status = status ? status : 'enabled';
        this.isExt = (isExt !== 'undefined') ? isExt : true;
      } else {
        console.log('Error: wrong using of Picklist constructor with Type_Name 1: [' + typename + '] / Value: [' + value + ']');
      }
    } else {
      console.log('Error: wrong using of Picklist constructor with Type_Name 2: [' + typename + '] / Value: [' + value + ']');
    } 
  }   
}