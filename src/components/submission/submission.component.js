import angular from 'angular';

import SubmissionCtrl from './submission.controller';
import CardButton from '../shared/card-button/card-button.component';

export default angular.module('app.edit.submission', [
  'ui.router',
  'ngMaterial',
  CardButton.name
])
.component('submission', {
  templateUrl: './components/submission/submission.template.html',
  controller: SubmissionCtrl
});