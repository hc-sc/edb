import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import Tbl from '../common/tbl/tbl.component';
import Footer from '../common/footer/footer.component';
import DossierService from '../../services/dossier.service';
import { } from '../../services/ghsts.service';
import { } from '../../services/app.data.service';
import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME,PICKLIST_NG_MODULE_NAME } from '../../../constants/shared';
import newDossierTemplate from './new-dossier/new-dossier.template';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  GHSTS_NG_MODULE_NAME,
  APP_DATA_NG_MODULE_NAME,
  PICKLIST_NG_MODULE_NAME,
  Toolbar,
  Tbl,
  Footer
])
.component('home', {
  template,
  controller: class HomeCtrl {
    constructor($mdDialog, $state, GhstsService, PicklistService, AppDataService) {
      this.$mdDialog = $mdDialog;
      this.$state = $state;
      this.GhstsService = GhstsService.getService();
      this.picklistService = PicklistService.getService();
      this.appDataService = AppDataService.getService();
      this.dossiers = [];
      this.dossierTitle;

      this.GhstsService.edb_get().then( result => {
        this.dossiers = JSON.parse(result.data)
                        .map(dossier => {
                          dossier.productname = dossier.product[0].genericproductname;
                          return dossier;
                        });
        this.results = this.dossiers.slice();
        return this.appDataService.edb_get({_url: 'product'});
      })
      .then(products => {
        this.products = JSON.parse(products.data);
      });
      this.toolbarItems = {
        navIcons: [
          { name: 'home', label: 'Home', state: 'splash' }
        ],
        functionIcons: [
          { name: 'globals', state: 'globals.legalEntities', label: 'Entities' },
          { name: 'settings', state: 'settings', label: 'Settings' },
          { name: 'help', label: 'Help', func: this.backend.bind(this) }
        ]
      };

      this.dossierProjection = [
        'dossierdescriptiontitle',
        'dossierpid',
        'productname',
        '_state',
        '_created',
        '_lastMod'
      ];

      this.dossier;
      this.submissions = [];
      this.submissionProjection = [
        'submissiontitle',
        'submissionnumber',
        'adminnumber',
        'packagetype',
        '_state',
        '_created',
        '_lastMod'
      ];

    }

    selectDossier(id, index) {
      // this.$state.go('dossier', { dossierPID: this.dossiers[index].DOSSIER_PID });
      this.dossier = this.dossiers.filter(dossier => {
        return dossier._id === id;
      })[0];
      this.submissions = this.dossier.submission.map(sub => {
        sub.packagetype = sub.incremental ? 'Incremental' : 'Full';
        sub.dossierdescriptiontitle = this.dossier.dossierdescriptiontitle;
        return sub;
      });
    }

    newDossier() {
      let prompt = {
        template: newDossierTemplate,
        controller: class NewDossierCtrl {
          constructor($mdDialog, products) {
            this.$mdDialog = $mdDialog;
            this.foldertitle;
            this.products = products;
            this.product;
          }

          confirm() {
            this.$mdDialog.hide({
              foldertitle: this.foldertitle,
              product: this.product,
              // tocid: ''
            });
          }

          cancel() {
            this.$mdDialog.cancel();
          }

          update(prop, value) {
            this[prop] = value;
          }
        },
        controllerAs: '$ctrl',
        locals: {
          $mdDialog: this.$mdDialog,
          products: this.products
        }
      };

      this.$mdDialog.show(prompt)
        .then(name => {
          let {foldertitle, product} = name;
          // let nameAry = name.split('/');
          // this.GhstsService.edb_put({ productShortName: nameAry[0], dossierShortName: nameAry[1] }).then(result => {
          //   console.log(result);
          //   this.$state.go('submission.description', { dossierPID: 43243, submissionNumber: 1 });
          // }).catch(err => {
          //   console.log(err);
          // });
        });
    }

    deleteDossier(index) {
      this.dossiers = this.dossiers.slice(0, index).concat(this.dossiers.slice(index + 1, 0));
    }

    selectSubmission(id, index) {
      this.$state.go('submission.sub', {
        dossierid: this.dossier._id,
        submissionid: this.submissions[index]._id,
        dossiertitle: this.dossier.dossierdescriptiontitle
      });
    }

    newSubmission() {
      // get new ghsts ids
      this.GhstsService.edb_put({_url: 'ghsts', data: {dossierId: this.dossier._id}})
      .then(newSubmission => {
        console.log(newSubmission);
      });

      // this.$state.go('submission.sub', {
        // dossierid: this.dossier._id,
        // submissionid:
      // })
    }

    update(prop, value) {
      this[prop] = value;
    }

   backend() {
      console.log('for backend test');
      // this.GhstsService.edb_get()
      //   .then(result => {
      //     console.log(result);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.picklistService.edb_put(
      {
    TYPE_NAME: 'EXTENSION_TYPE_ADMIN_NUMBER_TYPE',
    value: 'AAAAAAAAAAAAAAAAA',
    valuedecode: 'AAAAAAAAAAAAAAAAA',
    isExt: true
      }
      ).then(ret =>{
        console.log('it is /// ' + ret );
      });
    }
  }
})
.service('DossierService', DossierService)
.name;