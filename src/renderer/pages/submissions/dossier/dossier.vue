<template>
  <main>
    <div class='pane'>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-progress v-if='loading'></vue-progress>
      <template v-else>
        <div class='f-container f-cross-start'>
          <vue-button class='input-prefix' @click.native='assignPID("dossierpid")'>{{$t("generatepid")}}</vue-button>
          <span class='f-gap'></span>
          <vue-input type='text' id='dossierpid' :label='$t("dossierpid")' v-model='model.dossierpid' required :pattern='getValidPIDRegExp()'></vue-input>
        </div>
        <vue-input id='dossiercompid' :label='$t("dossiercompid")' v-model='model.dossiercompid' required></vue-input>
        <vue-input id='dossierdescriptiontitle' :label='$t("dossierdescriptiontitle")' v-model='model.dossierdescriptiontitle' required></vue-input>
        <vue-table id='radossiertype' :title='$t("REGULATORY_AUTHORITY_DOSSIER_TYPE")' :items='model.dossierra' :headers='[{name: "toSpecificForRAId", url: "legalentity"}, {name: "applicationtype", url: "picklist"}, {name: "regulatorytype", url: "picklist"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("dossierra")' @select='selectTableItem("dossierra", model.dossierra[$event], $event)' @action='handleAction($event, model.dossierra)'></vue-table>
        <vue-table id='referenceddossier' :title='$t("referenceddossier")' :items='model.referenceddossier' :headers='["referenceddossiernumber", "referenceddossierreason"]' :displayHeader='displayTranslation' addable @add='addTableItem("referenceddossier")' @select='selectTableItem("referenceddossier", model.referenceddossier[$event], $event)' @action='handleAction($event, model.referenceddossier)'></vue-table>
        <div class='bottom-float'>
          <vue-icon fab @click.native='save("dossier")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
          <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
          </vue-icon>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import DossierRA from '@/pages/submissions/dossier/dossier-ra.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Progress from '@/components/progress/progress.vue';
import ReferencedDossier from '@/pages/submissions/dossier/referenced-dossier.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Dossier',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('dossier')
    };
  },
  methods: {
    getComponent(compName) {
      return compName === 'dossierra' ? DossierRA : ReferencedDossier;
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('dossier');
    this.resetForm();
    try {
      // check this line
      console.log(this.getEmptyModel('dossier'));
      let model = await BackendService.getAppData('dossier', this.dossierid);
      console.log(model, this.getEmptyModel('dossier'), this.model);
      this.updateCurrentRecord(this.mergeModelAndRecord(this.getEmptyModel('dossier'), model[0]));
      this.mapStateToModel();
    }
    catch(err) {
      this.showMessage('ERROR');
    }
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-progress': Progress,
    'vue-table': Table
  }
};
</script>