import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './submission.template';

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
      constructor($state, GhstsService) {
        this.$state = $state;
        this.GhstsService = GhstsService.getService();
        this.navbarItems = [
          { title: 'Description', state: '.description' },
          // { title: 'Legal Entities', state: '.legalEntities' },
          { title: 'Receivers', state: '.receivers' },
          // { title: 'Substances', state: '.substances' },
          { title: 'Product', state: '.product' },
          // { title: 'Files', state: '.files' },
          { title: 'Documents', state: '.documents' }
        ];

        this.toolbarItems = {
          navIcons: [
            { name: 'back', label: 'Back', state: 'home' }
          ],
          title: 'eDossier Builder',
          functionIcons: [
            { name: 'save', label: 'Save' },
            { name: 'globals', label: 'Dropdowns' },
            { name: 'compare', label: 'Compare' },
            { name: 'check', label: 'Validate', func: this.validateXML.bind(this)},
            { name: 'archive', label: 'Package', func: this.package.bind(this)},
            { name: 'settings', label: 'Settings', state: 'settings' },
            { name: 'help', label: 'Help' }
          ]
        };
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