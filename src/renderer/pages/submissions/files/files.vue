<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-split-pane>
        <div slot='split-pane-1'>
          <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='file => file.filegeneric.filename.split("/").pop()' :label='$t("search")' sortByArgs='filename' :selectedItem='currentRecord'></vue-list-filter>
        </div>
        <div slot='split-pane-2' class='pane'>
          <template v-if='shouldShowFields()'>
            <div class='f-container f-cross-start'>
              <vue-button class='input-prefix' @click.native='selectFile'>{{$t('file')}}</vue-button>
              <span class='f-gap'></span>
              <vue-input type='text' id='filesource' :label='$t("FILE_SOURCE")' v-model='model._filereallocation' required disabled></vue-input>
            </div>
            <div class='f-container f-cross-start'>
              <vue-button class='input-prefix' @click.native='assignPID("filegeneric.filepid")'>{{$t('generatepid')}}</vue-button>
              <span class='f-gap'></span>
              <vue-input type='text' id='filepid' :label='$t("filepid")' v-model='model.filegeneric.filepid' required :pattern='getValidPIDRegExp()'></vue-input>
            </div>
            <vue-input type='text' id='filecompanyid' :label='$t("filecompanyid")' v-model='model.filegeneric.filecompanyid'></vue-input>
            <vue-select id='filetype' :label='$t("filetype")' :value='model.filegeneric.filetype' @input='model.filegeneric.filetype = $event._id' :options='filetype' :displayValue='displayPicklistItem' :matchValue='matchById' required></vue-select>
            <vue-input type='text' id='formatcomment' :label='$t("formatcomment")' v-model='model.filegeneric.formatcomment'></vue-input>
            <vue-input type='text' id='md5checksum' :label='$t("md5checksum")' v-model='model.filegeneric.md5CHECKSUM' disabled></vue-input>
            <vue-input type='text' id='filename' :label='$t("filename")' v-model='model.filegeneric.filename' disabled></vue-input>
            <vue-table id='fileinformation' :title='$t("REGULATORY_AUTHORITY_FILE_INFORMATION")' :items='model.filera'  :headers='[{name: "toSpecificForRAId", url: "legalentity"}, "cbidesignation", "filecomment"]' :displayHeader='displayTranslation' addable @add='addTableItem("filera")' @select='selectTableItem("filera", model.filera[$event], $event)' @action='handleAction($event, model.filera)' required></vue-table>
          </template>
          <template v-else>{{$t('noitems')}}</template>
          <div class='bottom-float'>
            <vue-icon fab @click.native='save("file")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
            <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("file")'></vue-icon>
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
import Progress from '@/components/progress/progress.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

export default {
  name: 'Files',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('file'),
    };
  },
  computed: {
    ...mapGetters('picklists', ['filetype'])
  },
  methods: {
    async selectFile() {
      this.model._dossier = this.dossierid;
      this.model = await BackendService.callMethod('file', 'selectFile', this.model);
    },
    getComponent() {
      return FileRA;
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('file');
    this.resetForm();
    try {
      let files = (await BackendService.callMethod('file', 'get', {_dossier: this.dossierid}));
      this.updateAppRecords(files);
      this.selectListItem(this.records[0], false);
    }
    catch(err) {
      this.showMessage('ERROR');
    }
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>
