<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='shortname' :selectedItem='currentRecord'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='shouldShowFields()'>
          <vue-select id='legalentities' :label='$tc("legalentity", 1)' :options='legalentities' :value='model.toLegalEntityId' :matchValue='matchById' :displayValue='v => v.legalentityname' @input='model.toLegalEntityId = $event._id'></vue-select>
          <vue-input id='shortname' :label='$t("SHORT_NAME")' v-model='model.shortname' required :max='20'></vue-input>
          <vue-input id='role' :label='$t("ROLE")' v-model='model.role' :max='255'></vue-input>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("receiver")' id='save' :label='$t("save")' icon='save' position='top' :disabled='currentRecord == null'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("receiver")'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import Select from '@/components/select/select.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Receivers',
  mixins: [model],
  data() {
    return {
      legalentities: [],
      model: {...this.getEmptyModel('receiver')}
    };
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('receiver');
    this.resetForm();
    let [, les] = await Promise.all([
      this.$store.dispatch('app/getAppDataAll', {url: 'receiver', sortBy: 'shortname'}),
      BackendService.getAppData('legalentity')
    ]);
    this.legalentities = les;
    this.selectListItem(this.records[0], false);
    this.$store.commit('ready');
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-split-pane': SplitPane
  }
};
</script>
