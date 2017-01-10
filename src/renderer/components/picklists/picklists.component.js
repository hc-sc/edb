import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import Accordion from '../common/accordion/accordion.component';

import template from './picklists.template';
import './picklists.scss';

export default angular.module('picklists', [
  uiRouter,
  ngMaterial,
  Accordion
])
.component('picklists', {
  template,
  bindings: {
    picklists: '<'
  },
  controller: class PicklistCtrl {
    constructor() {
      this.expandIcon = {name: 'right', label: 'Expand'};
      this.collapseIcon = {name: 'down', label: 'Collapse'};
      this.items = this.picklists;
      this.promoteItems();
    }

    promoteItems() {
      this.items = this.items.map(item => {
        item.items.map(subitem => {
          return subitem.enabled = subitem.status === 'enabled' ? true : false;
        });

        return Object.assign(
          item,
          {title: item.type, showing: false}
        );
      });
    }

    toggleShow(item) {
      this.items.forEach(i => {
        if (i.title === item.title) {
          i.showing = item.showing ? false : true;
        }
        else i.showing = false;
      });
    }
  }
})
.name;