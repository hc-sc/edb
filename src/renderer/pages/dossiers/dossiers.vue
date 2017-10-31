<template>
  <div style='position: relative;'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('dossier', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-dialog ref='dialog' id='dialog' type='confirm'></vue-dialog>

      <vue-table id='dossiers' :title='$tc("dossier", 2)' addable :items='mappedDossiers' :headers='["dossierdescriptiontitle", "productname", {key: "_state", name: "DOSSIER_STATUS"}, {key: "_created", name: "created"}, {key: "_lastMod", name: "lastmodified"}]' :displayHeader='$t' initialSortBy='_lastMod' :initialDesc='true' @select='selectDossier($event)' editable @add='addDossier' @action='handleAction($event, dossiers, "dossier")' :isEditable='e => e.editable' :isDeletable='e => e.deletable'></vue-table>

      <vue-table v-if='dossier' id='submissions' :title='$tc("submission", 2)' addable @add='addSubmission' @select='selectSubmission($event)' :items='mappedSubmissions' :headers='["submissiontitle", "submissionnumber", {key: "_state", name: "SUBMISSION_STATUS"}, {key: "packagetype", name: "PACKAGE_TYPE"}, {key: "_created", name: "created"}, {key: "_lastMod", name: "lastmodified"}]' :displayHeader ='$t' editable viewable @action='handleAction($event, dossier, "submission")' :isDeletable='s => s.deletable' :isEditable='s => s.editable' :isViewable='s => s.viewable' initialSortBy='submissionnumber' :initialDesc='true'></vue-table>
      <p v-else>{{$t('NO_DOSSIER_SELECTED')}}</p>
    </main>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import EditDossier from '@/pages/dossiers/edit-dossier.vue';
import EditSubmission from '@/pages/dossiers/edit-submission.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import NewDossier from '@/pages/dossiers/new-dossier.vue';
import Table from '@/components/table/table.vue';
import {BackendService} from '@/store/backend.service.js';
import {model} from '@/mixins/model.js';
import {mapMutations} from 'vuex';
import {cloneDeep} from 'lodash';
import {
  DOSSIER_STATUS_OPEN,
  SUBMISSION_STATUS_IN_PROGRESS,
  SUBMISSION_STATUS_PACKAGED,
  SUBMISSION_STATUS_SENT
} from '../../../constants/shared.js';

export default {
  name: 'Dossiers',
  mixins: [model],
  data() {
    return {
      dossier: null,
      dossiers: [],
      sub: null
    };
  },
  computed: {
    mappedDossiers() {
      return this.dossiers.map((dossier, index) => {
        dossier = cloneDeep(dossier);
        dossier.productname = dossier.product[0].genericproductname;
        dossier._state = this.$t(dossier._state);
        dossier.deletable = this.canDeleteDossier(index);
        dossier.editable = this.canEditDossier(index);
        return dossier;
      });
    },

    mappedSubmissions() {
      return this.dossier.submission.map((submission, index) => {
        submission = cloneDeep(submission);
        submission.packagetype = submission.incremental ? this.$t('incremental') : this.$t('FULL');
        submission._state = this.$t(submission._state);
        submission.deletable = this.canDeleteSubmission(index);
        submission.editable = this.canEditSubmission(index);
        submission.viewable = this.canViewSubmission(index);
        return submission;
      });
    }
  },
  methods: {
    ...mapMutations('app', ['updateDossierData', 'updateCurrentGhsts']),

    getComponent(compName) {
      switch (compName) {
        case 'newdossier':
          return NewDossier;
        case 'editdossier':
          return EditDossier;
        case 'editsubmission':
          return EditSubmission;
      }
    },

    handleAction(event, model, compName) {
      switch(event.type) {
        case 'delete':
          if (compName === 'dossier') this.deleteDossier(event.index);
          else if (compName === 'submission') this.deleteSubmission(event.index);
          break;
        case 'edit':
          if (compName === 'dossier') this.editDossier(event.index);
          else if (compName === 'submission') this.editSubmission(event.index);
          break;
        case 'view':
          this.viewSubmission(event.index);
          break;
      }
    },

    addDossier() {
      this.showFormDialog('newdossier')
      .then(({dossiertitle, tocId, product}) => {
        if (dossiertitle && dossiertitle.length && tocId && product) {
          // check for duplicates, 'product' is really a product id
          if (this.dossiers.find(dossier => {
            return dossiertitle === dossier.dossierdescriptiontitle &&
                    product === dossier.product[0]._id;
          })) {
            this.showMessage(this.$t('DUPLICATE_DOSSIERS'));
            return;
          }

          BackendService.createGhsts({dossiertitle, tocId, product})
          .then(async ({dossierid, dossiertitle, submissionid}) => {
            this.updateDossierData({dossierid, dossiertitle});
            this.sub = (await BackendService.getGhsts({_submissionid: submissionid}))[0];
            this.goToSubmission();
          })
          .catch(err => {
            console.log(err);
            this.showMessage(this.$t('SAVE_FAILURE'));
          });
        }
        else {
          this.showMessage(this.$t('MISSING_DOSSIER_FIELDS'));
        }
      }, () => {
        // no error, just cancelled dialog
      })
      .catch(() => {
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    async addSubmission() {
      // current business rules
      if (this.dossier && this.dossier['_state'] === DOSSIER_STATUS_OPEN) {
        // find the highest numbered submission version
        let lastSubmission;
        if (this.dossier.submission && this.dossier.submission.length) {
          lastSubmission = this.dossier.submission.reduce(
            (highest, submission) => {
              return highest.submissionnumber > submission.submissionnumber ? highest : submission;
            }, this.dossier.submission[0]);
        }

        // there are no previous submissions, so just create the first
        if (lastSubmission == null) {
          BackendService.createGhsts({dossierId: this.dossier._id})
          .then(async sub => {
            this.updateDossierData(sub);
            this.sub = (await BackendService.getGhsts({_submissionid: sub.submissionid}))[0];
            this.goToSubmission();
          })
          .catch(err => {
            this.showMessage(this.$t('CREATE_SUBMISSION_FAILURE'));
            console.error(err);
          });
        }

        // there are previous submissions, but all are sent
        else if (lastSubmission._state === SUBMISSION_STATUS_SENT) {
          BackendService.createGhsts({dossierId: this.dossier._id, submissionid: lastSubmission._id})
          .then(async sub => {
            this.updateDossierData(sub);
            this.sub = (await BackendService.getGhsts({_submissionid: sub.submissionid}))[0];
            this.goToSubmission();
          })
          .catch(err => {
            this.showMessage(this.$t('CREATE_SUBMISSION_FAILURE'));
            console.error(err);
          });
        }

        // the last submission is not sent
        else {
          this.showMessage(this.$t('CANNOT_ADD_SUBMISSION_NON_SENT'));
        }
      }
      else {
        this.showMessage(this.$t('CANNOT_ADD_SUBMISSION_DOSSIER_CLOSED'));
      }
    },

    selectDossier(index) {
      this.dossier = this.dossiers[index];
    },

    canEditDossier(index) {
      const dossier = this.dossiers[index];
      const state = new RegExp(this.dossiers[index]._state, 'i');
      if (state.test(DOSSIER_STATUS_OPEN)) {
        if (dossier.submission.find(sub => sub._state != SUBMISSION_STATUS_SENT)) return false;
        return (dossier.submission && dossier.submission.length > 0);
      }
      return false;
    },

    editDossier(index) {
      // pass the whole dossier, so if in the future we want
      // to edit more fields
      this.showFormDialog('editdossier', this.dossiers[index])
      .then(dossier => {
        this.$set(this.dossiers, index, dossier);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    canDeleteDossier(index) {
      const dossier = this.dossiers[index];
      return (dossier.submission && dossier.submission.length === 0);
    },

    async deleteDossier(index) {
      console.log(this.dossiers[index]);
      try {
        // await BackendService.deleteGhsts(this.dossiers[index]._id);
        await BackendService.deleteAppData('dossier', this.dossiers[index]._id);
        this.dossiers.splice(index, 1);
      } catch(err) {
        this.showMessage('ERROR');
        console.error(err);
      }
    },

    canViewSubmission(index) {
      const state = new RegExp(this.dossier.submission[index]._state, 'i');
      return (state.test(SUBMISSION_STATUS_SENT) ||
              state.test(SUBMISSION_STATUS_PACKAGED));
    },

    viewSubmission(index) {
      if (this.canViewSubmission(index)) {
        this.showMessageDialog({message: this.$t('OPEN_VIEWER'), confirm: false})
        .then(() => {
          this.$dialog.close();
          BackendService.openViewerGhsts(this.dossier.submission[index]._id);
        }, () => {
          // rejection from dialog, no problems
        })
        .catch(err => {
          this.showMessage(this.$t('ERROR_OPENING_VIEWER'));
          console.error(err);
        })
        .then(() => this.$dialog.close());
      }
      else {
        this.showMessage(this.$t('CANNOT_VIEW'));
      }
    },

    canEditSubmission(index) {
      const state = new RegExp(this.dossier.submission[index]._state, 'i');
      return (state.test(SUBMISSION_STATUS_PACKAGED));
    },

    editSubmission(index) {
      this.showFormDialog('editsubmission', this.dossier.submission[index])
      .then(async submission => {
        console.log(submission);
        let curGhsts = await BackendService.getGhsts({_submissionid: submission._id});

        curGhsts[0]._state = submission._state; //SUBMISSION_STATUS_SENT;
        console.log(curGhsts[0]);
        await BackendService.updateGhsts(curGhsts[0]);
        this.$set(this.dossier.submission, index, submission);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    canDeleteSubmission(index) {
      const state = new RegExp(this.dossier.submission[index]._state, 'i');
      return (state.test(SUBMISSION_STATUS_IN_PROGRESS) || state.test(SUBMISSION_STATUS_PACKAGED));
    },

    deleteSubmission(index) {
      console.log(index, this.dossier, this.dossier.submission);
      this.showMessageDialog({message: this.$t('CONFIRM_DELETE_SUBMISSION')})
      .then(async () => {
        try {
          await BackendService.deleteGhsts({
            _url: 'submission',
            submissionId: this.dossier.submission[index]._id,
            dossierId: this.dossier._id
          });
          this.dossier.submission.splice(index, 1);
        }
        catch(err) {
          this.showMessage(this.$t('ERROR_DELETING_SUBMISSION'));
          console.error(err);
        }
      })
      .catch(() => {

      })
      .then(() => this.$dialog.close());
    },

    async selectSubmission(index) {
      if (this.dossier.submission[index]._state !== SUBMISSION_STATUS_IN_PROGRESS) {
        this.showMessage(this.$t('CANNOT_OPEN_SENT_OR_PACKAGED'));
        return;
      }

      this.updateDossierData({dossiertitle: this.dossier.dossierdescriptiontitle, dossierid: this.dossier._id});
      this.sub = await BackendService.getGhsts({_submissionid: this.dossier.submission[index]._id});
      this.sub = this.sub[0];
      this.goToSubmission();
    },

    // set global ghsts object, and then navigate to submission screen
    goToSubmission() {
      this.updateCurrentGhsts(this.sub);
      this.$router.push('/submission');
    }
  },

  updated() {
    this.resetForm();
  },

  async created() {
    this.resetForm();
    this.dossiers = await BackendService.getGhstsAll();
  },

  components: {
    'vue-dialog': Dialog,
    'vue-header': Header,
    'vue-history': History,
    'vue-table': Table
  }
};
</script>
