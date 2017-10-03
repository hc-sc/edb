<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-input type='text' id='sourcefile' :label='$t("FILE_SOURCE")'></vue-input>
      <vue-input type='text' id='filepid' :label='$t("FILE_PID")'></vue-input>
      <vue-input type='text' id='companyfileid' :label='$t("FILE_COMPANY_ID")'></vue-input>
      <vue-input type='text' id='filetype' :label='$t("FILE_TYPE")'></vue-input>'
      <vue-input type='text' id='formatcomment' :label='$t("FORMAT_COMMENT")'></vue-input>
      <vue-input type='text' id='md5checksum' :label='$t("MD5CHECKSUM")'></vue-input>
      <vue-input type='text' id='submissionfilename' :label='$t("FILE_NAME")'></vue-input>
      <vue-table id='fileinformation' :title='$t("REGULATORY_AUTHORITY_FILE_INFORMATION")' :items='[]'></vue-table>
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
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>
