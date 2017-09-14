<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='appRecords' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='substancename'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='appRecords && appRecords.length'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='assignPID("substancepid")'>generate</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='substancepid' :label='$t("SUBSTANCE_PID")' v-model='model.substancepid' required disabled></vue-input>
          </div>
          <vue-textarea id='substancename' :label='$t("SUBSTANCE_NAME")' v-model='model.substancename' required :max='2000'></vue-textarea>
          <vue-table id='substanceidentifier' :title='$t("SUBSTANCE_IDENTIFIER")' addable :items='model.substanceidentifier' :headers='[{name: "substanceidentifiertype", url: "picklist"}, "identifier"]' :displayHeader='displayTranslation' @select='showDialog("substanceidentifier", model.substanceidentifier[$event], $event)' @add='addItem("substanceidentifier")'></vue-table>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("substance")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
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
    getComponent(ref) {
      return SubstanceIdentifier;
    }
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    await this.$store.dispatch('app/getAppDataAll', 'substance'),
    this.select(this.appRecords[0]);
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
