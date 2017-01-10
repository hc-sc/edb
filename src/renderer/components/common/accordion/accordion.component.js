// NOTE: this code is not a code fit for an accordion, should be moved into picklist component

import angular from 'angular';
import ngMaterial from 'angular-material';

import Icon from '../icon/icon.component';

import template from './accordion.template';

import './accordion.scss';

export default angular.module('accordion', [
  ngMaterial,
  Icon
])
.component('accordion', {
  template,
  bindings: {
    items: '<'
  },
  controller: class AccordianCtrl {
    constructor($scope) {
      console.log(this.items);
      this.$scope = $scope;
      this.expandIcon = {name: 'right', label: 'Expand'};
      this.collapseIcon = {name: 'down', label: 'Collapse'};
      this.promoteItems();
    }

    promoteItems() {
      this.items = this.items.map(item => {
        item.items.map(subitem => {
          return subitem.enabled = subitem.status === 'enabled' ? true : false;
        });

        return Object.assign(
          item,
          {showing: false}
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