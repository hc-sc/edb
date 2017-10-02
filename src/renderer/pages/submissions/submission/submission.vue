<template>
  <div class='pane'>
    <vue-input required id='submissiontitle' :label='$t("SUBMISSION_TITLE")' v-model='model.submissiontitle'></vue-input>
    <vue-input type='number' required id='submissionnumber' disabled v-model='model.submissionumber' :label='$t("SUBMISSION_NUMBER")'></vue-input>
    <vue-input type='date' required id='submissionversiondate' v-model='model.submissionversiondate' :label='$t("SUBMISSION_VERSION_DATE")'></vue-input>
    <vue-switch id='incremental' v-model='model.incremental' :label='$t("INCREMENTAL")'></vue-switch>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Switch from '@/components/switch/switch.vue';
import {model} from '@/mixins/model.js';
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'Submission',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('submission'),
    };
  },
  computed: {
    ...mapState('app', ['submission'])
  },
  methods: {
    ...mapMutations('app', ['updateCurrentRecord'])
  },
  watch: {
    submission() {
      this.model = this.submission;
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  created() {
    this.updateCurrentRecord(this.mergeModelAndRecord('submission'), this.submission);
    this.$store.commit('ready');
  },
  components: {
    'vue-input': Input,
    'vue-switch': Switch,
  }
};
</script>