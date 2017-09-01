<template>
  <div style='position: relative;'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('dossier', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-dialog ref='dialog' id='dialog'></vue-dialog>
      <vue-table id='dossiers' :title='$tc("dossier", 2)' addable @addItem='addDossier'></vue-table>
      <vue-table v-if='selectedDossier' id='submissions' :title='$tc("submission", 2)' @addItem='addSubmission'></vue-table>
    </main>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Table from '@/components/table/table.vue';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Dossiers',
  data() {
    return {
      dossiers: [],
      selectedDossier: null
    };
  },
  methods: {
    addDossier() {
      console.log('adding dossier');
    },
    addSubmission() {
      console.log('adding submission');
    }
  },
  async created() {
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
