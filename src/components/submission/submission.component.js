import angular from 'angular';

import SubmissionCtrl from './submission.controller';

export default angular.module('app.edit.submission', [
  'ui.router',
  'ngMaterial',
])
.component('submission', {
  templateUrl: './components/submission/submission.template.html',
  controller: SubmissionCtrl
});