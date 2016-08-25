import angular from 'angular';

import EditCtrl from './edit.controller';
import Submission from '../submission/submission.component';
import Sidenav from '../shared/sidenav/sidenav.component';
import Documents from '../documents/documents.component';
import Dossier from '../dossier/dossier.component';
import Product from '../product/product.component';
import Files from '../files/files.component';
import LegalEntities from '../legal-entities/legal-entities.component';
import Receivers from '../receivers/receivers.component';
import Substances from '../substance/substance.component';

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
  Substances.name,
  LegalEntities.name
])
.component('edit', {
  templateUrl: './components/edit/edit.template.html',
  controller: EditCtrl
});