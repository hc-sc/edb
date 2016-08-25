import angular from 'angular';

import AppFooterCtrl from './app-footer.controller';
import IconButton from '../icon-button/icon-button.component';

export default angular.module('app.app-footer', [
  IconButton.name
])
.component('appFooter', {
  templateUrl: './components/shared/app-footer/app-footer.template.html',
  controller: AppFooterCtrl
});