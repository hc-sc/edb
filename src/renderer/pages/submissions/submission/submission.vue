<template>
  <div>
    <vue-input required id='submissiontitle' :label='$t("SUBMISSION_TITLE")' v-model='model.submissiontitle'></vue-input>
    <vue-input type='number' required id='submissionnumber' disabled v-model='model.submissionumber' :label='$t("SUBMISSION_NUMBER")'></vue-input>
    <vue-input type='date' required id='submissionversiondate' v-model='model.submissionversiondate' :label='$t("SUBMISSION_VERSION_DATE")'></vue-input>
    <vue-switch id='incremental' v-model='model.incremental' :label='$t("INCREMENTAL")'></vue-switch></vue-switch>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Switch from '@/components/switch/switch.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Submission',
  mixins: [model],
  components: {
    'vue-input': Input,
    'vue-switch': Switch,
  }
};
</script>