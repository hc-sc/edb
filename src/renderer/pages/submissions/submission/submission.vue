<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-input required id='submissiontitle' :label='$t("submissiontitle")' v-model='model.submissiontitle'></vue-input>
      <vue-input type='number' required id='submissionnumber' disabled v-model='model.submissionnumber' :label='$t("submissionnumber")'></vue-input>
      <vue-input type='date' required id='submissionversiondate' v-model='model.submissionversiondate' :label='$t("submissionversiondate")'></vue-input>
      <vue-switch id='incremental' v-model='model.incremental' :label='$t("incremental")' :disabled='model.submissionnumber == 1'></vue-switch>
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
import {BackendService} from '@/store/backend.service.js';
import {mapMutations} from 'vuex';

export default {
  name: 'Submission',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('submission'),
    };
  },
  methods: {
    ...mapMutations('app', ['updateCurrentRecord'])
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('submission');
    this.resetForm();
    try {
      let model = (await BackendService.getAppData('submission', this.ghsts._submissionid))[0];
      this.updateCurrentRecord(this.mergeModelAndRecord(this.getEmptyModel('submission'), model));
      this.mapStateToModel();
    }
    catch(err) {
      this.showMessage(this.$t('ERROR_LOADING'));
    }
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