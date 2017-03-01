import angular from 'angular';
import AppDataService from '../../services/app.data.service';

export default class HelpCtrl {
  constructor(AppDataService) {
    this.appDataService = AppDataService.getService();
    this.toolbarItems = {
      navIcons: [
        { name: 'home', label: 'Home', state: 'splash' }
      ],
      title: 'Settings',
      functionIcons: [
      //  { name: 'help', label: 'Help' }
      ]
    };
  }
  
}