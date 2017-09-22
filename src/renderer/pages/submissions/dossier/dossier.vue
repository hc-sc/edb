<template>
  <main>
    <div class='f-container f-cross-start'>
      <vue-button class='input-prefix' @click.native='assignPID("dossierpid")'>generate</vue-button>
      <span class='f-gap'></span>
      <vue-input type='text' id='dossierpid' :label='$t("DOSSIER_PID")' v-model='model.dossierpid' required disabled></vue-input>
    </div>
    <vue-input id='companydossierid' :label='$t("COMPANY_DOSSIER_ID")' v-model='model.companydossierid' required></vue-input>
    <vue-input id='dossiertitle' :label='$t("DOSSIER_TITLE")' v-model='model.dossiertitle' required></vue-input>
  </main>
</template>

<script>
import Input from '@/components/input/input.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Dossier',
  mixins: [model],
  components: {
    'vue-input': Input,
    'vue-table': Table
  }
};
</script>