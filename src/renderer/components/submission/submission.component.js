import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './submission.template';
import { equals } from 'easy-equals';

import Toolbar from '../common/toolbar/toolbar.component';
import Navbar from '../common/navbar/navbar.component';
import Icon from '../common/icon/icon.component';
import Spinner from '../common/spinner/spinner.component';

import { } from '../../services/ghsts.service';
import { GHSTS_NG_MODULE_NAME} from '../../../constants/shared';

import AppDataService from '../../services/app.data.service';

export default angular.module('submission', [
  uiRouter,
  Toolbar,
  Navbar,
  Icon,
  Spinner,
  GHSTS_NG_MODULE_NAME,
  AppDataService
])
  .component('submission', {
    template,
    bindings: {
      dossierData: '<',
      toc: '<'
    },
    controller: class SubmissionCtrl {
      constructor($state, AppDataService, $transitions, $rootScope, GhstsService) {
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.appDataService = AppDataService.getService();
        this.ghstsService = GhstsService.getService();

        //allows for interrupting state transition (for use with ensuring any modifications are saved)
        this.dereg = $transitions.onBefore({}, (event) => {
          // SO hacky...
          return true;
        });

        this.navbarItems = [
          { title: 'Receivers', state: '.receivers' },
          { title: 'Dossier', state: '.dossier' },
          { title: 'Submission', state: '.submissionNode' },
          { title: 'TOC', state: '.toc' }
        ];

        this.toolbarItems = {
          navIcons: [
            { name: 'back', label: 'Back', state: 'home' },
            { name: 'home', label: 'Home', state: 'splash' }
          ],
          functionIcons: [
            { name: 'globals', label: 'App Data', state: 'globals.legalEntities' },
            { name: 'compare', label: 'Compare' },
            { name: 'check', label: 'Validate', func: this.validateXML.bind(this)},
            { name: 'archive', label: 'Package', func: this.package.bind(this)},
            { name: 'settings', label: 'Settings', state: 'settings' },
            { name: 'help', label: 'Help' }
          ]
        };
      }

      $onDestroy() {
        // need to deregister the listener or else we end up with multiple calls
        this.dereg();
      }

      validateXML() {
        this.ghstsService.edb_validation()
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log(err);
        });
      }

      package() {
        this.ghstsService.edb_package()
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  })
  .name;