<template>
  <div style='position: relative;'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('dossier', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-dialog ref='dialog' id='dialog'></vue-dialog>
      <vue-table id='dossiers' :title='$tc("dossier", 2)' addable @addTableItem='addDossier' :items='mappedDossiers' :headers='["dossierdescriptiontitle", "productname", "metadatastatus", {key: "_created", name: "created"}, "lastmodified"]' :displayHeader='$t' initialSortBy='dossierdescriptiontitle' :initialDesc='true' @select='selectDossier($event)' editable @add='addDossier' @action='handleAction($event, dossiers)' :isEditable='e => e.editable' :isDeletable='e => e.deletable'></vue-table>
      <vue-table v-if='dossier' id='submissions' :title='$tc("submission", 2)' addable @addTableItem='addSubmission' @select='selectSubmission($event)' :items='dossier.submission' :headers='["submissiontitle", "submissionnumber", "metadatastatus", "_created", "lastmodified"]':displayHeader ='$t' editable viewable @action='handleAction($event, dossier)'></vue-table>
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

export default {
  name: 'Dossiers',
  mixins: [model],
  data() {
    return {
      dossier: null,
      dossiers: [],
      sub: null,
    };
  },
  computed: {
    mappedDossiers() {
      return this.dossiers.map(dossier => {
        dossier.productname = dossier.product[0].genericproductname;
        dossier.deletable = this.canDeleteDossier(dossier);
        dossier.editable = this.canEditDossier(dossier);
        dossier.submission = dossier.submission.map(submission => {
          submission.deletable = this.canDeleteSubmission(submission);
          submission.editable = this.canEditSubmission(submission);
          submission.viewable = this.canViewSubmission(submission);
          return submission;
        });
        return dossier;
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

    handleAction(event, model) {
      switch(event.type) {
        case 'delete':
          model.splice(event.value, 1);
          break;
        case 'edit':
          this.editDossier(event.value);
          break;
        case 'view':
          console.log('viewing');
          break;
      }
    },

    addDossier() {
      this.showFormDialog(NewDossier)
      .then(({dossiertitle, tocId, product}) => {
        if (dossiertitle && dossiertitle.length && tocId && product) {
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
      }, err => {
        console.error(err);
      })
      .catch(() => {
        this.showMessage(this.$t('ADD_ITEM_FAILURE'));
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    addSubmission() {
      console.log('adding submission');
    },

    selectDossier(index) {
      this.dossier = this.mappedDossiers[index];
    },

    canEditDossier(event) {
      return true;
    },

    editDossier(dossier) {
      console.log(dossier);
      // this.showFormDialog('editdossier', this.dossiers[index])
      // .then(result => {
      //   console.log(result);
      // })
      // .catch(err => {
      //   console.error(err);
      // })
      // .then(() => {
      //   this.$dialog.close();
      // });
    },

    canDeleteDossier(dossier) {},

    deleteDossier(index) {},

    newSubmission() {

    },

    canViewSubmission(submission) {},

    viewSubmission(index) {},

    canEditSubmission(submission) {},

    editSubmission(index) {
      this.showFormDialog('editdossier', this.dossiers[index])
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },

    canDeleteSubmission(submission) {

    },

    deleteSubmission(index) {},

    async selectSubmission(index) {
      this.updateDossierData({dossiertitle: this.dossier.dossierdescriptiontitle, dossierid: this.dossier._id});
      this.sub = await BackendService.getGhsts({_submissionid: this.dossier.submission[index]._id});
      this.sub = this.sub[0];
      this.goToSubmission();
    },

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
