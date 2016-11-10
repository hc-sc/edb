import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './substances.template';

import Sidenav from '../common/sidenav/sidenav.component';
import { } from '../../services/app.data.service';
import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME } from '../../../constants/shared';


export default angular.module('substances', [
  ngMaterial,
  GHSTS_NG_MODULE_NAME,
  APP_DATA_NG_MODULE_NAME,
  Sidenav
])
.component('substances', {
  template,
  controller: class SubstancesCtrl {
    constructor(GhstsService, AppDataService) {
      let self = this;
      this.GhstsService = GhstsService.getService();
      this.AppDataService = AppDataService.getService();
      this.items = [];
      this.AppDataService.edb_get({url: 'substance', data: {}}).then(results => {
//        let data = results.data;
        self.items = results.data.map(item => {
          return {name: item.SUBSTANCE_NAME};
          });
        });
      console.log(self.items);
/*      [
        { name: 'First' },
        { name: 'Second' }
      ];
*/    }


    select(item) {
      console.log(item);
    }
  }
})
.name;