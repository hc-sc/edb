import angular from 'angular';

import ProjectCtrl from './project.controller';
import AppHeader from '../shared/app-header/app-header.component';
import AppFooter from '../shared/app-footer/app-footer.component';

export default angular.module('app.project', [
  'ui.router',
  'ngMaterial',
  AppHeader.name,
  AppFooter.name
])
.component('project', {
  templateUrl: './components/project/project.template.html',
  controller: ProjectCtrl
});