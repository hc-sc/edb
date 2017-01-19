import AppDataService from '../../services/app.data.service';
export default class SettingsCtrl {
  constructor(AppDataService) {
    this.appDataService = AppDataService.getService();
    this.toolbarItems = {
      navIcons: [
        { name: 'home', label: 'Home', state: 'splash' }
      ],
      title: 'Settings',
      functionIcons: [
        { name: 'help', label: 'Help' }
      ]
    };
    this.listFileButton = { name: 'list', label: 'Select File', color: 'dark' };
    this.pidprefix="ghsts";
    this.viewerlocation;
    this.packagelocation;
  }
  save() {

  }
  selectFile() {
    this.appDataService.edb_get({ _url: 'file', method: 'selectFile', data: angular.copy(this.selected) })
      .then(ret => {
        this.selected = JSON.parse(ret.data);
        console.log(this.selected);
      })
      .catch(err => {
        console.log(err);
      });
  }
}