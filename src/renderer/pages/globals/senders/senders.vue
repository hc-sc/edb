<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='_shortname' :selectedItem='currentRecord'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='shouldShowFields()'>
          <vue-select id='legalentities' :label='$t("legalentity")' :options='legalentities' :value='model.toLegalEntityId' :displayValue='v => v.legalentityname' @input='model.toLegalEntityId = $event._id' :matchValue='matchById' required></vue-select>
          <vue-input id='shortname' :label='$t("shortname")' v-model='model._shortname' required :max='20'></vue-input>
          <vue-input id='companycontactregulatoryrole' :label='$t("companycontactregulatoryrole")' v-model='model.companycontactregulatoryrole' :max='255'></vue-input>
          <vue-textarea id='remark' :label='$t("remark")' v-model='model.remark' :max='2000'></vue-textarea>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("sender")' id='save' :label='$t("save")' icon='save' position='top' :disabled='currentRecord == null'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("sender")'></vue-icon>
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
import Textarea from '@/components/textarea/textarea.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

export default {
  name: 'Senders',
  mixins: [model],
  data() {
    return {
      legalentities: [],
      model: {...this.getEmptyModel('sender')},
    };
  },
  computed: {
    ...mapGetters('picklists', ['legalentitytype'])
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('sender');
    this.resetForm();
    [, this.legalentities] = await Promise.all([
      await this.getAppDataAll({url: 'sender', sortBy: '_shortname'}),
      BackendService.getAppData('legalentity')
    ]);

    this.selectListItem(this.records[0], false);
    this.$store.commit('ready');
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-split-pane': SplitPane,
    'vue-textarea': Textarea
  }
};
</script>
