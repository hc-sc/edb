import angular from 'angular';

import DocumentsCtrl from './documents.controller';
import SearchList from '../shared/search-list/search-list.component';

export default angular.module('app.edit.documents', [
  'ui.router',
  'ngMaterial',
  SearchList.name
])
.component('documents', {
  templateUrl: './components/documents/documents.template.html',
  controller: DocumentsCtrl,
  bindings: {
    colour: '@'
  }
});