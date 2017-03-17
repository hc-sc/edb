import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import template from './submission.template';
import XMLInvaliErrorTemplate from './xml-validation-error/xml-validation-error.html';
import { equals } from 'easy-equals';

import Toolbar from '../common/toolbar/toolbar.component';
import Navbar from '../common/navbar/navbar.component';
import Icon from '../common/icon/icon.component';
import Spinner from '../common/spinner/spinner.component';

import { } from '../../services/ghsts.service';
import { GHSTS_NG_MODULE_NAME } from '../../../constants/shared';

import AppDataService from '../../services/app.data.service';

export default angular.module('submission', [
  uiRouter,
  ngMaterial,
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
      constructor($state, AppDataService, $transitions, $rootScope, GhstsService, $scope, $mdDialog, $mdToast) {
        this.$scope = $scope;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.appDataService = AppDataService.getService();
        this.ghstsService = GhstsService.getService();
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;

        //allows for interrupting state transition (for use with ensuring any modifications are saved)
        this.dereg = $transitions.onBefore({}, (event) => {
          // SO hacky...
          return true;
        });

        this.navbarItems = [
          { title: 'Submission', state: '.submissionNode' },
          { title: 'Senders/Receivers', state: '.receivers' },
          { title: 'Dossier', state: '.dossier' },
          { title: 'Products', state: '.products' },
          { title: 'Files', state: '.files' },          
          { title: 'Documents', state: '.documents' },
          { title: 'TOC', state: '.toc' }
        ];

        this.toolbarItems = {
          navIcons: [
            { name: 'back', label: 'Back', state: 'home' },
            { name: 'home', label: 'Home', state: 'splash' }
          ],
          functionIcons: [
           // { name: 'globals', label: 'App Data', state: 'globals.legalEntities' },
           // { name: 'compare', label: 'Compare' },
            { name: 'check', label: 'Validate', func: this.validateXML.bind(this) },
            { name: 'archive', label: 'Package', func: this.package.bind(this) },
            { name: 'email', label: 'Send', func: this.sendSubmission.bind(this) },
           // { name: 'settings', label: 'Settings', state: 'settings' },
           // { name: 'help', label: 'Help' }
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
            this.showMessage('Passed XML validation.');
          })
          .catch(err => {
            let prompt = {
              template: XMLInvaliErrorTemplate,
              controller: class XMLInvalidCtrl {
                constructor($mdDialog, err) {
                  this.$mdDialog = $mdDialog;
                  this.err = err;
                }
                confirm() {
                  this.$mdDialog.cancel();
                }
              },
              controllerAs: '$ctrl',
              locals: {
                $mdDialog: this.$mdDialog,
                err: err
              }
            };

            this.$mdDialog.show(prompt);
          });
      }

      package() {
        this.ghstsService.edb_package()
          .then(results => {
            console.log(results);
            this.showMessage('Package created at: ' + results.data);
          })
          .catch(err => {
            console.log(err);
          });
      }

      sendSubmission() {
        console.log(this);
        let curGhsts = this.ghstsService.edb_getSync({_submissionid: this.dossierData.submissionid})[0];
        curGhsts._state = 'sent';
        console.log(curGhsts);
        this.ghstsService.edb_post(curGhsts)
          .then(ret => {
            console.log(ret);
            this.showMessage('Submission Status set to sent.');
            this.$state.go('home');
          })
          .catch(err => {console.log(err);});
      }

      // used to display notifications to the user
      showMessage(message) {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent(message)
            .hideDelay(3600)
        );
      }

    }
  })
  .name;