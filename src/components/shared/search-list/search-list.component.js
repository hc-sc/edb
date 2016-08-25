import angular from 'angular';

import SearchListCtrl from './search-list.controller';

export default angular.module('search-list', [
  'ngMaterial'
])
.component('searchList', {
  templateUrl: './components/shared/search-list/search-list.template.html',
  controller: SearchListCtrl
});