import angular from 'angular';

import EditCtrl from './edit.controller';
import Submission from '../submission/submission.component';
import Sidenav from '../shared/sidenav/sidenav.component';
import Documents from '../documents/documents.component';
import Dossier from '../dossier/dossier.component';
import Product from '../product/product.component';
import Files from '../files/files.component';
import Receivers from '../receivers/receivers.component';
import Substance from '../substance/substance.component';
import LegalEntity from '../legal-entity/legal-entity.component';

import GhstsService from '../shared/services/ghsts.service';

export default angular.module('app.edit', [
  'ui.router',
  'ngMaterial',
  Submission.name,
  Sidenav.name,
  Documents.name,
  Dossier.name,
  Product.name,
  Files.name,
  Receivers.name,
  Substance.name,
  LegalEntity.name
])
.component('edit', {
  templateUrl: './components/edit/edit.template.html',
  controller: EditCtrl
})
.service('ghstsService', GhstsService);