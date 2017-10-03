<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-input required id='submissiontitle' :label='$t("SUBMISSION_TITLE")' v-model='model.submissiontitle'></vue-input>
      <vue-input type='number' required id='submissionnumber' disabled v-model='model.submissionnumber' :label='$t("SUBMISSION_NUMBER")'></vue-input>
      <vue-input type='date' required id='submissionversiondate' v-model='model.submissionversiondate' :label='$t("SUBMISSION_VERSION_DATE")'></vue-input>
      <vue-switch id='incremental' v-model='model.incremental' :label='$t("INCREMENTAL")' :disabled='model.submissionnumber == 1'></vue-switch>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save("submission")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
        <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
        </vue-icon>
      </div>
    </template>
  </main>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Progress from '@/components/progress/progress.vue';
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
    this.updateCurrentRecord(this.mergeModelAndRecord(this.getEmptyModel('submission'), this.submission));
    this.$store.commit('ready');
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-progress': Progress,
    'vue-switch': Switch,
  }
};
</script>