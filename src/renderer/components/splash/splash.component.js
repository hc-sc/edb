import angular from 'angular';
import ngMaterial from 'angular-material';
import Card from '../common/card/card.component';
import template from './splash.template';

import './splash.scss';

export default angular.module('splash', [
  ngMaterial,
  Card
])
  .component('splash', {
    template
  })
  .name;