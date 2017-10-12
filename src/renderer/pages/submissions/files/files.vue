<template>
  <main class='pane'>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-split-pane>
        <div slot='split-pane-1'>
          <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='file => file.filename' :label='$t("search")' sortByArgs='filename' :selectedItem='currentRecord'></vue-list-filter>
        </div>
        <div slot='split-pane-2' class='pane'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='selectFile'>{{$t('FILE')}}</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='filesource' :label='$t("FILE_SOURCE")' v-model='model.filegeneric.filesource' required></vue-input>
          </div>
          <vue-input type='text' id='filepid' :label='$t("FILE_PID")'></vue-input>
          <vue-input type='text' id='companyfileid' :label='$t("FILE_COMPANY_ID")'></vue-input>
          <vue-input type='text' id='filetype' :label='$t("FILE_TYPE")'></vue-input>
          <vue-input type='text' id='formatcomment' :label='$t("FORMAT_COMMENT")'></vue-input>
          <vue-input type='text' id='md5checksum' :label='$t("MD5CHECKSUM")'></vue-input>
          <vue-input type='text' id='submissionfilename' :label='$t("FILENAME")'></vue-input>
          <vue-table id='fileinformation' :title='$t("REGULATORY_AUTHORITY_FILE_INFORMATION")' :items='model.filera'  :headers='[]' :displayHeader='displayTranslation' addable @add='addItem("filera")' @action='handleAction($event, model.filera)' @select='selectTableItem("filera", model.filera[$event], $event)' ></vue-table>
          <div class='bottom-float'>
            <vue-icon fab @click.native='save("submission")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
            <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
            </vue-icon>
          </div>
        </div>
      </vue-split-pane>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import FileRA from '@/pages/submissions/files/file-ra.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Files',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('file'),
    };
  },
  methods: {
    selectFile() {
      console.log('select file');
    },
    getComponent() {
      return FileRA;
    }
  },
  created() {
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>
