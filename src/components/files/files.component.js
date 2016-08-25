import angular from 'angular';

import FilesCtrl from './files.controller';

export default angular.module('app.edit.files', [
  'ui.router',
  'ngMaterial',
])
.component('files', {
  templateUrl: './components/files/files.template.html',
  controller: FilesCtrl
});