<template>
  <div class='pane'>
    <vue-select id='status' :label='$t("DOSSIER_STATUS")' :options='dossierStatuses' :value='model.status' @input='model.status = $event' :displayValue='o => $t(o)'></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';

export default {
  name: 'EditDossier',
  data() {
    return {
      model: {
        status: ''
      },
      dossierStatuses: [
        'OPEN',
        'CLOSED'
      ]
    };
  },
  components: {
    'vue-select': Select
  }
};
</script>