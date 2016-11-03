import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './submission.template';
import { equals } from 'easy-equals';

import Toolbar from '../common/toolbar/toolbar.component';
import Navbar from '../common/navbar/navbar.component';
import Icon from '../common/icon/icon.component';
import Description from '../description/description.component';
import LegalEntities from '../legal-entities/legal-entities.component';
import Receivers from '../receivers/receivers.component';
import Substances from '../substances/substances.component';
import Product from '../product/product.component';
import Files from '../files/files.component';
import Documents from '../documents/documents.component';

import { } from '../../services/ghsts.service';
import { GHSTS_NG_MODULE_NAME} from '../../../constants/shared';

export default angular.module('submission', [
  uiRouter,
  Toolbar,
  Navbar,
  Icon,
  Description,
  LegalEntities,
  Receivers,
  Substances,
  Product,
  Files,
  Documents,
  GHSTS_NG_MODULE_NAME
])
  .component('submission', {
    template,
    bindings: {
      submission: '<'
    },
    controller: class SubmissionCtrl {
      constructor($state, GhstsService, $transitions) {

        //allows for interrupting state transition (for use with ensuring any modifications are saved)
        this.dereg = $transitions.onBefore({}, (event) => {
          return true;
        });

        console.log(this);

        this.$state = $state;
        this.GhstsService = GhstsService.getService();
        this.navbarItems = [
          { title: 'Description', state: '.description' },
          { title: 'Receivers', state: '.receivers' },
          { title: 'Product', state: '.product' },
          { title: 'Documents', state: '.documents' }
        ];

        this.globalItems = [
          { title: 'Legal Entities', state: 'globals.legalEntities' },
          { title: 'Substances', state: 'globals.substances' },
          { title: 'Products', state: 'globals.products' },
          { title: 'Files', state: 'globals.files' },
          { title: 'Picklists', state: 'globals.picklists' }
        ];

        this.toolbarItems = {
          navIcons: [
            { name: 'back', label: 'Back', state: 'home' },
            { name: 'home', label: 'Home', state: 'splash' }
          ],
          title: this.submission.DOSSIER_DESCRIPTION_TITLE,
          functionIcons: [
            { name: 'save', label: 'Save' },
            { name: 'globals', label: 'Entities', state: 'globals.legalEntities' },
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
        this.GhstsService.edb_validation()
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log(err);
        });
      }

      package() {
        this.GhstsService.edb_package()
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