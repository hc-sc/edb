<template>
  <div class='pane'>
    <vue-select id='status' :label='$t("SUBMISSION_STATUS")' :options='submissionStatuses' :value='model._state' @input='model._state = $event' :displayValue='o => $t(o)'></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';
import {
  SUBMISSION_STATUS_IN_PROGRESS,
  SUBMISSION_STATUS_PACKAGED,
  SUBMISSION_STATUS_SENT
} from '../../../constants/shared.js';

export default {
  name: 'EditSubmission',
  data() {
    return {
      model: {
        status: ''
      },
      submissionStatuses: [
        SUBMISSION_STATUS_PACKAGED,
        SUBMISSION_STATUS_SENT
      ]
    };
  },
  components: {
    'vue-select': Select
  }
};
</script>