export default class AppFooterCtrl {
  constructor() {
    this.colour = 'dark';
    this.icons = [
      { icon: 'help', label: 'Help', onClick: this.showHelp.bind(this) }
    ];
  }

  showHelp() {}
}