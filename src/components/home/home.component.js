import angular from 'angular';

import HomeCtrl from './home.controller';
import CardButton from '../shared/card-button/card-button.component';
import IconButton from '../shared/icon-button/icon-button.component';
import {} from '../../ng-services/ghsts.service';
import {} from '../../ng-services/dossier.data.service';
import { GHSTS_NG_MODULE_NAME, DOSSIER_DATA_NG_MODULE_NAME } from '../../constants/shared';

export default angular.module('app.home', [
  'ui.router',
  'ngMaterial',
  GHSTS_NG_MODULE_NAME,
  DOSSIER_DATA_NG_MODULE_NAME,
  CardButton.name,
  IconButton.name
])
.component('home', {
  templateUrl: './components/home/home.template.html',
  controller: HomeCtrl
});