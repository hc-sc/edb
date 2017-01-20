import angular from 'angular';
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

  selectFolder(item) {
    this.appDataService.edb_get({ _url: 'file', method: 'selectFolder' })
      .then(ret => {
        if (ret.code === 'EDB00000')
          this[item] = ret.data;
        else
          this.showMessage('Canceled');
      })
      .catch(err => {
        console.log(err);
      });
  }
}