<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='appRecords' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='sender'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='appRecords && appRecords.length'>
          <vue-select id='legalentities' :label='$tc("legalentity", 1)' :options='legalentities' :displayValue='v => v.legalentityname' @input='model.To_Legal_Entity_Id = $event._id'></vue-select>
          <vue-input id='shortname' :label='$t("SHORT_NAME")' v-model='model._shortname' required></vue-input>
          <vue-input id='companycontactregulatoryrole' :label='$t("COMPANY_CONTACT_REGULATORY_ROLE")' v-model='model.companycontactregulatoryrole'></vue-input>
          <vue-input id='remark' :label='$t("REMARK")' v-model='model.remark'></vue-input>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("sender")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import Select from '@/components/select/select.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Senders',
  mixins: [model],
  data() {
    return {
      legalentities: [],
      model: {...this.getEmptyModel('sender')}
    };
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    let [, les] = await Promise.all([
      this.$store.dispatch('app/getAppDataAll', 'sender'),
      BackendService.getAppData('legalentity')
    ]);
    this.legalentities = les;
    this.select(this.appRecords[0]);
    this.$store.commit('ready');
  },
  components: {
    'vue-dialog': Dialog,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-split-pane': SplitPane
  }
};
</script>
