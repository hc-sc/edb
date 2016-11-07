import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './globals.template';

import Toolbar from '../common/toolbar/toolbar.component';
import Navbar from '../common/navbar/navbar.component';

export default angular.module('globals', [
  ngMaterial,
  Toolbar,
  Navbar
])
.component('globals', {
  template,
  controller: class GlobalsCtrl {
    constructor() {
      this.toolbarItems = {
        navIcons: [
          { name: 'back', state: 'home', label: 'back' },
          { name: 'home', label: 'Home', state: 'splash' }
        ],
        title: 'Manage Application Data',
        functionIcons: [
          { name: 'settings', state: 'settings', label: 'Settings' },
          { name: 'help', label: 'Help' }
        ]
      };

      this.navbarItems = [
        { title: 'Legal Entities', state: 'globals.legalEntities' },
        { title: 'Substances', state: 'globals.substances' },
        { title: 'Products', state: 'globals.products' },
        { title: 'Files', state: 'globals.files' },
        { title: 'Picklists', state: 'globals.picklists' }
      ];
    }
  }
})
.name;