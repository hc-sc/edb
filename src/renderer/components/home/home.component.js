import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import template from './home.template';

import Toolbar from '../common/toolbar/toolbar.component';
import TblEdit from '../common/tbl-edit/tbl-edit.component';
import Footer from '../common/footer/footer.component';
import DossierService from '../../services/dossier.service';
import { } from '../../services/ghsts.service';
import { } from '../../services/app.data.service';
import { GHSTS_NG_MODULE_NAME, APP_DATA_NG_MODULE_NAME, PICKLIST_NG_MODULE_NAME } from '../../../constants/shared';
import newDossierTemplate from './new-dossier/new-dossier.template';
import editSubmissionTemplate from'./edit-submission/edit-submission.template';
import editDossierTemplate from './edit-dossier/edit-dossier.template';

import {
  DOSSIER_STATUS_OPEN,
  DOSSIER_STATUS_CLOSED,
  SUBMISSION_STATUS_IN_PROGRESS,
  SUBMISSION_STATUS_PACKAGED,
  SUBMISSION_STATUS_SENT
} from '../../../constants/shared.js';

export default angular.module('home', [
  uiRouter,
  ngMaterial,
  mdDataTable,
  GHSTS_NG_MODULE_NAME,
  APP_DATA_NG_MODULE_NAME,
  PICKLIST_NG_MODULE_NAME,
  Toolbar,
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
        this.hasSelection = false;
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
          // if (Array.isArray(this.dossiers) && this.dossiers.length > 0) {
          //   this.selectDossier(this.dossiers[0]._id);
          // }
          return this.appDataService.edb_get({ _url: 'product' });
        })
          .then(products => {
            this.products = JSON.parse(products.data);
            return this.appDataService.edb_get({ _url: 'toc' });
          })
          .then(toc => {
            this.toc = JSON.parse(toc.data);
            this.setOptions();
          });

        this.toolbarItems = {
          navIcons: [
            { name: 'home', label: 'Home', state: 'splash' }
          ],
          functionIcons: []
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

      $onChanges() {
        this.setOptions();
      }

      shouldShowSubmissions() {
        this.hasSelection =
          (Array.isArray(this.dossiers) && Array.isArray(this.submissions) && this.dossier != null) ? true : false;
      }

      setOptions() {
        this.dossiers = this.dossiers.map(dos => {
          dos.deletable = this.canDeleteDossier(dos);
          dos.editable = this.canEditDossier(dos);
          dos.submission = dos.submission.map(sub => {
            sub.deletable = this.canDeleteSubmission(sub);
            sub.editable = this.canEditSubmission(sub);
            sub.viewable = this.canViewSubmission(sub);
            return sub;
          });
          return dos;
        });

        this.submissions = this.submissions.map(sub => {
          sub.deletable = this.canDeleteSubmission(sub);
          sub.editable = this.canEditSubmission(sub);
          sub.viewable = this.canViewSubmission(sub);
          return sub;
        });
      }

      selectDossier(id) {
        if (id) {
          this.dossier = this.dossiers.filter(dossier => {
            return dossier._id === id;
          })[0];

          // need to change selected, remember angular can't tell when
          // objects are mutated beyond when the reference changes
          this.dossiers = this.dossiers.map(dossier => {
            dossier.isSelected = this.dossier._id === dossier._id ? true : false;
            return dossier;
          });
          this.submissions = this.dossier.submission.map(sub => {
            sub.packagetype = sub.incremental ? 'Incremental' : 'Full';
            sub.dossierdescriptiontitle = this.dossier.dossierdescriptiontitle;
            return sub;
          });
        }
        this.shouldShowSubmissions();
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
        if (!this.canEditDossier(this.dossiers[index])) return false;
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
            statuses: this.getPossibleDossierStates(this.dossiers[index])
          }
        };

        this.$mdDialog.show(prompt)
        .then(selection => {
          this.dossiers[index]._state = selection.status;
          return this.appDataService.edb_post(this.dossiers[index]);
        })
        .then(ret => {
          let curProd = JSON.parse(ret.data);
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i]._id === curProd._id) {
              this.products[i] = curProd;
              break;
            }
          }
          this.setOptions();
        });
      }

      deleteDossier(index) {
        if (this.canDeleteDossier(this.dossiers[index])) {
          console.log('deleting');
          this.appDataService.edb_delete({url: 'dossier', data: this.dossiers[index]._id})
          .then(ret => {
            let curProd = JSON.parse(ret.data);
            for (let i = 0; i < this.products.length; i++) {
              if (this.products[i]._id === curProd._id) {
                this.products[i] = curProd;
                break;
              }
            }
          });
          // confirm backend deletes the item
          // .then(() => {
            // !!!!!JUN TASK
          //   this.dossiers = this.dossiers.slice(0, index).concat(this.dossiers.slice(index + 1));
          //
          //   if the dossier was selected, empty selection
          // }
          // .catch(() => {
          //   this.$mdToast.show(
          //     this.$mdToast.simple()
          //     .textContent('Error in deleting')
          //     .hideDelay(1200)
          //   );
          // });
          this.shouldShowSubmissions();
        }
        else {
          this.$mdToast.show(
            this.$mdToast.simple()
            .textContent('Cannot delete a dossier that has sent submissions')
            .hideDelay(1200)
          );
        }
      }

      viewSubmission(index) {
        if (this.canViewSubmission(this.submissions[index])) {
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
            .textContent('Cannot view a submission that hasn\'t been packaged or Sent')
            .hideDelay(1200)
          );
        }
      }

      deleteSubmission(index) {
        if (this.canDeleteSubmission(this.submissions[index])) {
          let confirm = this.$mdDialog.confirm()
            .title('Confirm delete')
            .textContent('Are you sure you want to delete this submission?')
            .ok('Delete')
            .cancel('Cancel');

          this.$mdDialog.show(confirm)
            .then(() => {
              // delete on the backend first
              return this.GhstsService.edb_delete({_url: 'submission', submissionId: this.submissions[index]._id, dossierId: this.dossier._id});
            })
            .then(() => {
              this.dossiers.forEach(dos => {
                if (dos._id === this.dossier._id) {
                  dos.submission = dos.submission.filter(sub => {
                    console.log(this.submissions[index]);
                    return (sub._id === this.submissions[index]._id) ? false : true;
                  });
                }
              });
              this.submissions = this.submissions.slice(0, index).concat(this.submissions.slice(index + 1));
              this.setOptions();
              this.$mdToast.show(
                this.$mdToast.simple()
                  .textContent('Deleted')
                  .hideDelay(1200)
              );
            })
            .catch(err => {
              console.log(err);
              this.$mdToast.show(
                this.$mdToast.simple()
                  .textContent('Error in deleting')
                  .hideDelay(1200)
              );
            });

        }
        else {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Cannot delete a submission that has been Sent')
              .hideDelay(1200)
          );
        }
      }

      editSubmission(index) {
        if (this.canEditSubmission(this.submissions[index])) {
          // disable the statuses that you can't use
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
              statuses: this.getPossibleSubmissionStates(this.submissions[index])
            }
          };

          this.$mdDialog.show(prompt)
          .then(selection => {
            // send selection to update in backend
            if (selection.status === SUBMISSION_STATUS_SENT) {
              let curGhsts = this.GhstsService.edb_getSync({_submissionid: this.submissions[0]._id})[0];
              curGhsts._state = SUBMISSION_STATUS_SENT;
              return this.GhstsService.edb_post(curGhsts);
            } else
              return Promise.reject();
          })
          .then(ret => {
            this.submissions[index]._state = SUBMISSION_STATUS_SENT;
            this.setOptions();
            this.$mdToast.show(
              this.$mdToast.simple()
                .textContent('Submission status changed to sent!')
                .hideDelay(1200)
            );
          })
          .catch(err => {console.log(err);});
        }
        else {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Can only edit a submission that has been packaged')
              .hideDelay(1200)
          );
        }
      }

      selectSubmission(id, index) {
        const state = new RegExp(this.submissions[index]._state, 'i');
        if (state.test(SUBMISSION_STATUS_IN_PROGRESS)) {
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

        let state = this.submissions.length > 0 ? this.submissions[0]._state.toLowerCase() : 'notsent';
        let subId = '';
        if (state === 'sent')
          subId = this.submissions[0]._id;

        this.GhstsService.edb_put({ _url: 'ghsts', data: { dossierId: this.dossier._id, submissionid: subId } })
          .then(result => {
            this.$state.go('submission.submissionNode', {
              dossierid: result.data.dossierid,
              submissionid: result.data.submissionid,
              dossiertitle: result.data.dossiertitle
            });
          });
      }

      // BUSINESS RULES FOR WORKFLOW

      // can delete if in-progress or packaged
      canDeleteSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_IN_PROGRESS));
      }

      // if in-progress, will be set to packaged by packager
      // if packaged, can set to sent or back to in-progress
      // if sent, cannot change
      canEditSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_PACKAGED));
      }

      // can view submission if packaged or sent
      canViewSubmission(item) {
        const state = new RegExp(item._state, 'i');
        return (state.test(SUBMISSION_STATUS_SENT) ||
                state.test(SUBMISSION_STATUS_PACKAGED));
      }

      // can delete dossier if there are no sent submissions
      canDeleteDossier(item) {
        const state = new RegExp(item._state, 'i');

        if (state.test(DOSSIER_STATUS_CLOSED)) return false;

        const sent = new RegExp(SUBMISSION_STATUS_SENT, 'i');
        const inprogress = new RegExp(SUBMISSION_STATUS_IN_PROGRESS, 'i');
        for (let sub of item.submission) {
          if (sent.test(sub._state) || inprogress.test(sub._state)) return false;
        }

        return true;
      }

      // if dossier is open and all submissions are sent can close
      // if dossier is closed, can open
      canEditDossier(item) {
        const state = new RegExp(item._state, 'i');
        if (state.test(DOSSIER_STATUS_OPEN)) {
          for (let sub of item.submission) {
            if (sub._state !== SUBMISSION_STATUS_SENT) return false;
          }
          console.log('here');
          return true;
        }
        return false;
      }

      getPossibleDossierStates(item) {
        const states = [];
        if (item._state === DOSSIER_STATUS_CLOSED) {
          states.push({label: DOSSIER_STATUS_CLOSED, disabled: false});
          states.push({label: DOSSIER_STATUS_OPEN, disabled: false});
        }
        else if (item._state === DOSSIER_STATUS_OPEN) {
          states.push({label: DOSSIER_STATUS_CLOSED, disabled: false});
          states.push({label: DOSSIER_STATUS_OPEN, disabled: false});
        }
        return states;
      }

      getPossibleSubmissionStates(item) {
        const states = [];

        // if in progress, should not even be able to open edit modal,
        // is handled by the package function
        if (item._state === SUBMISSION_STATUS_IN_PROGRESS) {
          states.push({label: SUBMISSION_STATUS_IN_PROGRESS, disabled: false});
          states.push({label: SUBMISSION_STATUS_PACKAGED, disabled: false});
          states.push({label: SUBMISSION_STATUS_SENT, disabled: false});
        }

        // if in packaged, can change back to in progress, or to sent
        else if (item._state === SUBMISSION_STATUS_PACKAGED) {
          states.push({label: SUBMISSION_STATUS_IN_PROGRESS, disabled: true});
          states.push({label: SUBMISSION_STATUS_PACKAGED, disabled: false});
          states.push({label: SUBMISSION_STATUS_SENT, disabled: false});
        }

        // if sent, should not even be able to open edit model
        // in future, may be able to go back to packaged
        else if (item._state === SUBMISSION_STATUS_SENT) {
          states.push({label: SUBMISSION_STATUS_IN_PROGRESS, disabled: false});
          states.push({label: SUBMISSION_STATUS_PACKAGED, disabled: false});
          states.push({label: SUBMISSION_STATUS_SENT, disabled: false});
        }
        return states;
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