import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import Tbl from '../common/tbl/tbl.component';
import TblEdit from '../common/tbl-edit/tbl-edit.component';
import Footer from '../common/footer/footer.component';
import DossierService from '../../services/dossier.service';
import { } from '../../services/ghsts.service';
import { } from '../../services/app.data.service';
import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME, PICKLIST_NG_MODULE_NAME } from '../../../constants/shared';
import newDossierTemplate from './new-dossier/new-dossier.template';
import editSubmissionTemplate from'./edit-submission/edit-submission.template';
import editDossierTemplate from './edit-dossier/edit-dossier.template';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  GHSTS_NG_MODULE_NAME,
  APP_DATA_NG_MODULE_NAME,
  PICKLIST_NG_MODULE_NAME,
  Toolbar,
  Tbl,
  TblEdit,
  Footer
])
  .component('home', {
    template,
    controller: class HomeCtrl {
      constructor($mdDialog, $mdToast, $state, GhstsService, PicklistService, AppDataService) {
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$state = $state;
        this.GhstsService = GhstsService.getService();
        this.picklistService = PicklistService.getService();
        this.appDataService = AppDataService.getService();
        this.dossiers = [];
        this.dossierTitle;
        this.supportedversions = [{
          _id: '',
          valuedecode: ''
        }];

        this.GhstsService.edb_get().then(result => {
          this.dossiers = JSON.parse(result.data)
            .map(dossier => {
              dossier.productname = dossier.product[0].genericproductname;
              return dossier;
            });
          this.results = this.dossiers.slice();
          if (Array.isArray(this.dossiers) && this.dossiers.length > 0) {
            this.selectDossier(this.dossiers[0]._id);
          }
          return this.appDataService.edb_get({ _url: 'product' });
        })
          .then(products => {
            this.products = JSON.parse(products.data);
            return this.appDataService.edb_get({ _url: 'toc' });
          })
          .then(toc => {
            this.toc = JSON.parse(toc.data);
          });

        this.toolbarItems = {
          navIcons: [
            { name: 'home', label: 'Home', state: 'splash' }
          ],
          functionIcons: [
          //  { name: 'globals', state: 'globals.legalEntities', label: 'Entities' },
           // { name: 'settings', state: 'settings', label: 'Settings' },
           // { name: 'help', label: 'Help', func: this.backend.bind(this) }
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

        this.submissions = [];
        this.submissionProjection = [
          'submissiontitle',
          'submissionnumber',
          'packagetype',
          '_state',
          '_created',
          '_lastMod'
        ];
      }

      selectDossier(id) {
        if (id) {
          console.log(id);
          this.dossier = this.dossiers.filter(dossier => {
            return dossier._id === id;
          })[0];
          this.submissions = this.dossier.submission.map(sub => {
            sub.packagetype = sub.incremental ? 'Incremental' : 'Full';
            sub.dossierdescriptiontitle = this.dossier.dossierdescriptiontitle;
            return sub;
          });
          this.submissions.sort((a, b) => {
            return a.submissionnumber < b.submissionnumber ? 1 : a.submissionnumber > b.submissionnumber ? -1 : 0;
          });
        }
      }

      newDossier() {
        let prompt = {
          template: newDossierTemplate,
          controller: class NewDossierCtrl {
            constructor($mdDialog, products, toc) {
              this.$mdDialog = $mdDialog;
              this.dossiertitle;
              this.products = products.filter(product => {
                if (!product.dossier || typeof product.dossier !== 'string')
                  return product;
              });
              this.product;
              this.toc = toc;
              this.tocId;
            }

            confirm() {
              this.$mdDialog.hide({
                dossiertitle: this.dossiertitle,
                product: this.product,
                tocId: this.tocId
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
            products: this.products,
            toc: this.toc
          }
        };

        this.$mdDialog.show(prompt)
          .then(name => {
            let {dossiertitle, tocId, product} = name;
            if (dossiertitle && tocId && product) {
              this.GhstsService.edb_put(name).then(result => {
                console.log(result.data);
                this.$state.go('submission.submissionNode', {
                  dossierid: result.data.dossierid,
                  submissionid: result.data.submissionid,
                  dossiertitle: result.data.dossiertitle
                });
              }).catch(err => {
                console.log(err);
              });
            }
          });
      }

      editDossier(index) {
        const statuses = ['Open', 'Closed'];
        const prompt = {
          template: editDossierTemplate,
          controller: class EditDossierCtrl {
            constructor($mdDialog, statuses) {
              this.$mdDialog = $mdDialog;
              this.statuses = statuses;
              this.status = '';
            }

            confirm() {
              this.$mdDialog.hide({
                status: this.status
              });
            }

            cancel() {
              this.$mdDialog.cancel();
            }
          },
          controllerAs: '$ctrl',
          locals: {
            $mdDialog: this.$mdDialog,
            statuses: statuses
          }
        };

        this.$mdDialog.show(prompt)
        .then(selection => {
          // send selection to update in backend
          console.log(selection);
        });
      }

      deleteDossier(index) {
        console.log(index);
        // confirm backend deletes the item
        // .then(() => {
        //   this.dossiers = this.dossiers.slice(0, index).concat(this.dossiers.slice(index + 1));
        //
        //    if the dossier was selected, change selection
        // }
        // .catch(() => {
        //   this.$mdToast.show(
        //     this.$mdToast.simple()
        //     .textContent('Error in deleting')
        //     .hideDelay(1200)
        //   );
        // });
      }

      viewSubmission(index) {
        const state = this.submissions[index]._state;
        if (/sent/i.test(state) || /packaged/i.test(state)) {
          let confirm =
            this.$mdDialog.confirm()
              .title('Open packaged submission in Viewer')
              .textContent('The viewer must be closed to load properly')
              .ok('View')
              .cancel('Cancel');
          this.$mdDialog.show(confirm)
            .then(() => {
              this.GhstsService.edb_openViewer({submissionid: this.submissions[index]._id});
            });
        }
        else {
          this.$mdToast.show(
            this.$mdToast.simple()
            .textContent('Cannot view a submission that hasn\'t been packaged or sent')
            .hideDelay(1200)
          );
        }
      }

      deleteSubmission(index) {
        const state = this.submissions[index]._state;
        if (/sent/i.test(state)) {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Cannot delete a submission that has been sent')
              .hideDelay(1200)
          );
        }
        else {
          let confirm = this.$mdDialog.confirm()
          .title('Confirm delete')
          .textContent('Are you sure you want to delete this submission?')
          .ok('Delete')
          .cancel('Cancel');

          this.$mdDialog.show(confirm)
          .then(() => {
            // delete on the backend first
            //backend.delete
            // .then(() => {
              this.submissions = this.submissions.slice(0, index).concat(this.submissions.slice(index + 1));
            // }
            // .catch(e => {
            //   this.$mdToast.show(
            //     this.$mdToast.simple()
            //     .textContent('Error in deleting')
            //     .hideDelay(1200)
            //   );
            // }
          });
        }
      }

      editSubmission(index) {
        console.log(index);
        const statuses = ['In Progress', 'Packaged', 'Sent'];
        const prompt = {
          template: editSubmissionTemplate,
          controller: class EditSubmissionCtrl {
            constructor($mdDialog, statuses) {
              this.$mdDialog = $mdDialog;
              this.statuses = statuses;
              this.status = '';
            }

            confirm() {
              this.$mdDialog.hide({
                status: this.status
              });
            }

            cancel() {
              this.$mdDialog.cancel();
            }
          },
          controllerAs: '$ctrl',
          locals: {
            $mdDialog: this.$mdDialog,
            statuses: statuses
          }
        };

        this.$mdDialog.show(prompt)
        .then(selection => {
          // send selection to update in backend
          console.log(selection);
        });
      }

      selectSubmission(id, index) {
        let status = this.submissions[index]._state.toLowerCase();
        if (status === 'active' || status === 'reopen') {
          this.$state.go('submission.submissionNode', {
            dossierid: this.dossier._id,
            submissionid: this.submissions[index]._id,
            dossiertitle: this.dossier.dossierdescriptiontitle
          });
        }
        else {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Cannot open a packaged or sent submission')
              .hideDelay(1200)
          );
        }
      }

      newSubmission() {
        // get new ghsts ids
        let state = this.submissions[0]._state.toLowerCase();
        if (state === 'packaged' || state === 'sent') {
          this.GhstsService.edb_put({ _url: 'ghsts', data: { dossierId: this.dossier._id, submissionid: this.submissions[0]._id } })
            .then(result => {
              this.$state.go('submission.submissionNode', {
                dossierid: result.data.dossierid,
                submissionid: result.data.submissionid,
                dossiertitle: result.data.dossiertitle
              });
            });
        } else
          console.log(state);
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
        ).then(ret => {
          console.log('it is /// ' + ret);
        });
      }
    }
  })
  .service('DossierService', DossierService)
  .name;