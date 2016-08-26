import angular from 'angular';

import FilesCtrl from './files.controller';
import fileService from './files.service';
import PickListService from '../shared/services/picklist.service';
//import receiverService from '../receivers/receiverService';
export default angular.module('app.edit.files', [
  'ui.router',
  'ngMaterial',
])
.component('files', {
  templateUrl: './components/files/files.template.html',
  controller: FilesCtrl,
  controllerAs: '_ctrl'
}).service('fileService', fileService)
//.service('receiverService', receiverService)
.service('picklistService', PickListService);