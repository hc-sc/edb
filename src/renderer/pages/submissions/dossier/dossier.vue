<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <div class='f-container f-cross-start'>
        <vue-button class='input-prefix' @click.native='assignPID("dossierpid")'>generate</vue-button>
        <span class='f-gap'></span>
        <vue-input type='text' id='dossierpid' :label='$t("DOSSIER_PID")' v-model='model.dossierpid' required disabled></vue-input>
      </div>
      <vue-input id='dossiercompid' :label='$t("DOSSIER_COMP_ID")' v-model='model.companydossierid' required></vue-input>
      <vue-input id='dossiertitle' :label='$t("DOSSIER_DESCRIPTION_TITLE")' v-model='model.dossiertitle' required></vue-input>
      <vue-table id='radossiertype' :title='$t("REGULATORY_AUTHORITY_DOSSIER_TYPE")' :items='[]' required></vue-table>
      <vue-table id='referenceddossier' :title='$t("REFERENCED_DOSSIER")' :items='[]' required></vue-table>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save("dossier")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
        <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
        </vue-icon>
      </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Dossier',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('dossier'),
    };
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-table': Table
  }
};
</script>