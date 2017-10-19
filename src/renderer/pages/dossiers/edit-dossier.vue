<template>
  <div class='pane'>
    <vue-select id='status' :label='$t("DOSSIER_STATUS")' :options='dossierStatuses' :value='model._state' @input='model._state = $event' :displayValue='o => $t(o)'></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';
import {DOSSIER_STATUS_CLOSED, DOSSIER_STATUS_OPEN} from '../../../constants/shared.js';

export default {
  name: 'EditDossier',
  data() {
    return {
      model: {},
      dossierStatuses: [
        DOSSIER_STATUS_OPEN,
        DOSSIER_STATUS_CLOSED
      ]
    };
  },
  components: {
    'vue-select': Select
  }
};
</script>