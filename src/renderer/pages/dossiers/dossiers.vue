<template>
  <div style='position: relative;'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('dossier', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-dialog ref='dialog' id='dialog'></vue-dialog>
      <vue-table id='dossiers' :title='$tc("dossier", 2)' addable @addItem='addDossier' :items='dossiers' :headers='["dossierdescriptiontitle", "productname", "metadatastatus", "created", "lastmodified"]' :displayHeader='$t' @select='selectDossier($event)' editable @add='addDossier'></vue-table>
      <vue-table v-if='dossier' id='submissions' :title='$tc("submission", 2)' @addItem='addSubmission' @select='selectSubmission($event)' :items='submissions || []' :headers='["submissiontitle", "submissionnumber", "metadatastatus", "created", "lastmodified"]':displayHeader ='$t'></vue-table>
      <p v-else>{{$t('NO_DOSSIER_SELECTED')}}</p>
    </main>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
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
      submissions: []
    };
  },
  methods: {
    ...mapMutations('app', ['updateCurrentDossier', 'updateCurrentSubmission']),
    addDossier() {
      this.showFormDialog(NewDossier)
      .then(({dossiertitle, tocId, product}) => {
        if (dossiertitle && dossiertitle.length && tocId && product) {
          BackendService.createGhsts({dossiertitle, tocId, product})
          .then(async ({dossierid, submissionid}) => {
            this.updateCurrentDossier(dossierid);
            this.updateCurrentSubmission(submissionid);
            this.$router.push('/submission');
          })
          .catch(() => {
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
      this.dossier = this.dossiers[index];
    },
    selectSubmission(index) {
      this.updateCurrentSubmission(this.submissions[index].id);
      this.$router.push('submission');
    },
    getComponent() {
      return NewDossier;
    }
  },
  updated() {
    this.resetForm();
  },
  watch: {
    dossier() {
      this.submissions = this.dossier.submission.map(submission => {
        submission.metadatastatus = submission._state;
        submission.created = submission._created;
        submission.lastmodified = submission._lastMod;
        return submission;
      });
    }
  },
  async created() {
    this.resetForm();
    this.dossiers = await BackendService.getGhstsAll();
    this.dossiers = this.dossiers.map(dossier => {
      dossier.productname = dossier.product[0].genericproductname;
      dossier.metadatastatus = dossier._state;
      dossier.lastmodified = dossier._lastMod;
      dossier.created = dossier._created;
      return dossier;
    });
  },
  components: {
    'vue-dialog': Dialog,
    'vue-header': Header,
    'vue-history': History,
    'vue-table': Table
  }
};
</script>
