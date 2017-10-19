<template>
  <div class='pane'>
    <vue-select id='status' :label='$t("SUBMISSION_STATUS")' :options='submissionStatuses' :value='model.status' @input='model.status = $event' :displayValue='o => $t(o)'></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';

export default {
  name: 'EditSubmission',
  data() {
    return {
      model: {
        status: ''
      },
      submissionStatuses: [
        'IN_PROGRESS',
        'PACKAGED',
        'SENT'
      ]
    };
  },
  components: {
    'vue-select': Select
  }
};
</script>