import angular from 'angular';
import ngMaterial from 'angular-material';
import _ from 'lodash';
import template from './description.template';
import dossierRATemplate from './dossier-ra.template';

import TextInput from '../common/text-input/text-input.component';
import Icon from '../common/icon/icon.component';
import Tbl from '../common/tbl/tbl.component';

export default angular.module('description', [
  ngMaterial,
  TextInput,
  Icon,
  Tbl
])
.component('description', {
  template,
  bindings: {
    submission: '<'
  },
  controller: class DescriptionCtrl {
    constructor($mdDialog, $state) {
      this.$state = $state;
      this.$mdDialog = $mdDialog;

      this.dossierRAProjection = [
        'REGULATORY_TYPE',
        'APPLICATION_TYPE',
        'PROJECT_ID_NUMBER'
      ];
    }

    update(prop, value) {
      this.submission[prop] = value;
    }

    select(item, index) {
      console.log(item, index);
      this.$mdDialog.show({
        template: dossierRATemplate,
        controllerAs: '$ctrl',
        controller: class DossierRACtrl {
          constructor($mdDialog) {
            this.$mdDialog = $mdDialog;
            console.log(this);
          }

          cancel() {
            this.$mdDialog.cancel();
          }
        }
      })
      .then(answer => {

      });
    }

    delete(items, node) {
      for (let i = 0; i < items.length; ++i) {
        this.submission[0][node] = _.remove(this.submission[0][node], item => {
          return !_.isEqual(items[i][node], item[node]);
        });
      }
    }
  }
})
.name;