import angular from 'angular';
import ngMaterial from 'angular-material';
import template from './substances1.template';

import Sidenav from '../common/sidenav/sidenav.component';
import {DossierDataService } from '../../services/dossier.data.service';
import { GHSTS_NG_MODULE_NAME, DOSSIER_DATA_NG_MODULE_NAME } from '../../../constants/shared';
import {SubstancesCtrl} from './substances.controller';
export default angular.module('substances', [
  ngMaterial,
  GHSTS_NG_MODULE_NAME,
  DOSSIER_DATA_NG_MODULE_NAME,
  Sidenav
])
  .component('substances', {
    template,
    controller: SubstancesCtrl

  })
  .name;