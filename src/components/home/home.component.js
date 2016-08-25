import angular from 'angular';

import HomeCtrl from './home.controller';
import CardButton from '../shared/card-button/card-button.component';
import IconButton from '../shared/icon-button/icon-button.component';
import FileSystemService from '../shared/services/fs.service';

export default angular.module('app.home', [
  'ui.router',
  'ngMaterial',
  CardButton.name,
  IconButton.name
])
.component('home', {
  templateUrl: './components/home/home.template.html',
  controller: HomeCtrl
})
.service('fsService', FileSystemService);