<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='substancename' :selectedItem='currentRecord'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='shouldShowFields()'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='assignPID("substancepid")'>{{$t('generatepid')}}</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='substancepid' :label='$t("substancepid")' v-model='model.substancepid' required :pattern='getValidPIDRegExp()'></vue-input>
          </div>
          <vue-textarea id='substancename' :label='$t("substancename")' v-model='model.substancename' required :max='2000'></vue-textarea>
          <vue-table id='substanceidentifier' :title='$t("substanceidentifiers")' :items='model.substanceidentifier' :headers='[{name: "substanceidentifiertype", url: "picklist"}, "identifier"]' :displayHeader='displayTranslation' @select='selectTableItem("substanceidentifier", model.substanceidentifier[$event], $event)' addable @add='addTableItem("substanceidentifier")' @action='handleAction($event, model.substanceidentifier)'></vue-table>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("substance")' id='save' :label='$t("save")' icon='save' position='top' :disabled='currentRecord == null'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("substance")'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Dialog from '@/components/dialog/dialog.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import SubstanceIdentifier from '@/pages/globals/substances/substance-identifier.vue';
import Table from '@/components/table/table.vue';
import Textarea from '@/components/textarea/textarea.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Substances',
  mixins: [model],
  data() {
    return {
      legalentities: [],
      model: {...this.getEmptyModel('substance')}
    };
  },
  methods: {
    getComponent() {
      return SubstanceIdentifier;
    }
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('substance');
    this.resetForm();
    await this.$store.dispatch('app/getAppDataAll', {url: 'substance', sortBy: 'substancename'}),
    this.selectListItem(this.records[0], false);
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-dialog': Dialog,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-table': Table,
    'vue-textarea': Textarea,
    'vue-split-pane': SplitPane
  }
};
</script>
