<template>
  <div style='position: relative;'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('dossier', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-dialog ref='dialog' id='dialog'></vue-dialog>
      <vue-table id='dossiers' :title='$tc("dossier", 2)' addable @addItem='addDossier' :items='dossiers' :headers='["dossierdescriptiontitle", "productname", "metadatastatus", "created", "lastmodified"]' :displayHeader='$t' @select='selectDossier($event)' editable></vue-table>
      <vue-table v-if='dossier' id='submissions' :title='$tc("submission", 2)' @addItem='addSubmission' @select='selectSubmission($event)' :items='submissions || []' :headers='["submissiontitle", "submissionnumber", "metadatastatus", "created", "lastmodified"]':displayHeader ='$t'></vue-table>
      <p v-else>{{$t('NO_DOSSIER_SELECTED')}}</p>
    </main>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Table from '@/components/table/table.vue';
import {BackendService} from '@/store/backend.service.js';
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'Dossiers',
  data() {
    return {
      dossiers: [],
      submissions: []
    };
  },
  computed: {
    ...mapState('app', ['dossier', 'submission']),
  },
  methods: {
    ...mapMutations('app', ['updateCurrentDossier', 'updateCurrentSubmission']),
    addDossier() {
      console.log('adding dossier');
    },
    addSubmission() {
      console.log('adding submission');
    },
    selectDossier(index) {
      this.updateCurrentDossier(this.dossiers[index]);
    },
    selectSubmission(index) {
      this.updateCurrentSubmission(this.submissions[index]);
      this.$router.push('submission');
    }
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
