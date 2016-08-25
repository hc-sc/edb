import angular from 'angular';

import CardButtonCtrl from './card-button.controller';

export default angular.module('app.card-button', [])
.component('cardButton', {
  templateUrl: './components/shared/card-button/card-button.template.html',
  controller: CardButtonCtrl,
  bindings: {
    link: '<',
    colour: '@',
    onClick: '&'
  }
});