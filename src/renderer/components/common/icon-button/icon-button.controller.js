import constants from '../app.constants';

export default class IconButtonCtrl {
  constructor() {
    this.tooltipDelay = constants.tooltipDelay;
    this.onClick = function () {
      console.log('test');
      //call dropdown with new type
      this.onUpdate();
    }
  }


}