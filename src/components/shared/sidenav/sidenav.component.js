import angular from 'angular';

import SidenavCtrl from './sidenav.controller';

export default angular.module('app.sidenav', [
  'ui.router',
  'ngMaterial'
])
.component('sidenav', {
  templateUrl: './components/shared/sidenav/sidenav.template.html',
  controller: SidenavCtrl,
  bindings: {
    navs: '<',
    colour: '@'
  }
});