<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-split-pane>
        <div slot='split-pane-1'>
          <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='doc => doc.documentgeneric.documenttitle' :label='$t("search")' sortByArgs='documentgeneric.documenttitle' :selectedItem='currentRecord'></vue-list-filter>
        </div>
        <div slot='split-pane-2' class='pane'>
          <template v-if='shouldShowFields()'>
            <div class='f-container f-cross-start'>
              <vue-button class='input-prefix' @click.native='assignPID("documentgeneric.documentpid")'>{{$t('generatepid')}}</vue-button>
              <span class='f-gap'></span>
              <vue-input type='text' id='documentpid' :label='$t("documentpid")' v-model='model.documentgeneric.documentpid' required :pattern='getValidPIDRegExp()'></vue-input>
            </div>

            <div class='f-container f-cross-start'>
              <vue-button class='input-prefix' @click.native='assignPID("documentgeneric.documentfamilypid")'>{{$t('generatepid')}}</vue-button>
              <span class='f-gap'></span>
              <vue-input type='text' id='documentfamilypid' :label='$t("documentfamilypid")' v-model='model.documentgeneric.documentfamilypid' required :pattern='getValidPIDRegExp()'></vue-input>
            </div>

            <vue-input type='text' id='documentfamily' :label='$t("documentfamily")' v-model='model.documentgeneric.documentfamily' required :max='255'></vue-input>

            <vue-input type='text' id='documentcompanyid' :label='$t("documentcompanyid")' v-model='model.documentgeneric.documentcompanyid' required :max='20'></vue-input>

            <vue-textarea type='text' id='documenttitle' :label='$t("documenttitle")' v-model='model.documentgeneric.documenttitle' required :max='2000'></vue-textarea>

            <vue-input type='text' id='documentauthor' :label='$t("documentauthor")' v-model='model.documentgeneric.documentauthor' required :max='255'></vue-input>

            <vue-input type='date' id='documentissuedate' :label='$t("documentissuedate")' v-model='model.documentgeneric.documentissuedate' required></vue-input>

            <vue-chips deletable unique id='documentowner' :label='$t("documentowner")' v-model='model.documentgeneric.documentowner' required :maxChipLength='2000'></vue-chips>

            <vue-chips deletable unique id='testlaboratory' :label='$t("testlaboratory")' v-model='model.documentgeneric.testlaboratory' :maxChipLength='2000'></vue-chips>

            <vue-switch id='publishedindicator' :label='$t("publishedindicator")' v-model='model.documentgeneric.publishedindicator'></vue-switch>

            <vue-switch id='gxpindicator' :label='$t("gxpindicator")' v-model='model.documentgeneric.gxpindicator'></vue-switch>

            <vue-switch id='testedonvertebrate' :label='$t("testedonvertebrate")' v-model='model.documentgeneric.testedonvertebrate'></vue-switch>

            <vue-fieldset :legend='$t("documentsource")'>
              <vue-switch id='isCompleteSource' :label='$t("completedocumentsource")' v-model='model._docsourcetype' onValue='complete' offValue='partial'></vue-switch>

              <div v-if='model._docsourcetype'>
                <vue-textarea type='text' id='completedocumentsource' :label='$t("completedocumentsource")' v-model='model.documentgeneric.completedocumentsource' required :max='2000'></vue-textarea>
              </div>

              <div v-else>
                <vue-textarea type='text' id='documentsource' :label='$t("documentsource")' v-model='model.documentgeneric.documentsource' required :max='2000'></vue-textarea>

                <vue-input type='number' id='documentyear' :label='$t("documentyear")' v-model='model.documentgeneric.documentyear' ></vue-input>

                <vue-input type='text' id='documentissue' :label='$t("documentissue")' v-model='model.documentgeneric.documentissue' :max='20'></vue-input>

                <vue-input type='text' id='documentvolume' :label='$t("documentvolume")' v-model='model.documentgeneric.documentvolume' :max='20'></vue-input>

                <vue-input type='text' id='documentpages' :label='$t("documentpages")' v-model='model.documentgeneric.documentpages' :max='20'></vue-input>
              </div>
            </vue-fieldset>

            <vue-table id='referencedtofile' :title='$t("referencedtofiles")' :items='model.documentgeneric.referencedtofile' :headers='[{key: "toFileId", name: "filename", url: "file"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentgeneric.referencedtofile")' @select='selectTableItem("documentgeneric.referencedtofile", model.documentgeneric.referencedtofile[$event], $event)' @action='handleAction($event, model.documentgeneric.referencedtofile)'></vue-table>

            <vue-table id='documentinformation' :title='$t("REGULATORY_AUTHORITY_DOCUMENT_INFORMATION")' :items='model.documentra' :headers='[{key: "toSpecificForRAId", name: "receiver", url: "receiver"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentra")' @select='selectTableItem("documentra", model.documentra[$event], $event)' @action='handleAction($event, model.documentra)'></vue-table>

            <vue-table id='referenceddocument' :title='$t("referenceddocuments")' :items='model.documentgeneric.referenceddocument' :headers='[{name: "referencetype", url: "picklist"}, "internal", "documentpid"]' :displayHeader='displayTranslation' addable @add='addTableItem("documentgeneric.referenceddocument")' @select='selectTableItem("documentgeneric.referenceddocument", model.documentgeneric.referenceddocument[$event], $event)' @action='handleAction($event, model.documentgeneric.referenceddocument)'></vue-table>

            <vue-table id='relatedtosubstance' :title='$t("relatedtosubstances")' :items='model.documentgeneric.relatedtosubstance' :headers='[{name: "toSubstanceId", url: "substance"}]' :displayHeader='displayTranslation' addable @add='addTableItem("documentgeneric.relatedtosubstance")' @select='selectTableItem("documentgeneric.relatedtosubstance", model.documentgeneric.relatedtosubstance[$event], $event)' @action='handleAction($event, model.documentgeneric.relatedtosubstance)'></vue-table>

            <vue-table id='documentnumber' :title='$t("documentnumbers")' :items='model.documentgeneric.documentnumber' :headers='[{name: "documentnumbertype", url: "picklist"}, "identifier"]' :displayHeader='displayTranslation' addable @add='addTableItem("documentgeneric.documentnumber")' @select='selectTableItem("documentgeneric.documentnumber", model.documentgeneric.documentnumber[$event], $event)' @action='handleAction($event, model.documentgeneric.documentnumber)'></vue-table>
          </template>
          <template v-else>{{$t('noitems')}}</template>
          <div class='bottom-float'>
            <vue-icon fab @click.native='save("document")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
            <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("document")'></vue-icon>
            <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
            </vue-icon>
          </div>
        </div>
      </vue-split-pane>
    </template>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import DocumentNumber from '@/pages/submissions/documents/document-number.vue';
import DocumentRA from '@/pages/submissions/documents/document-ra.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import ReferencedDocument from '@/pages/submissions/documents/referenced-document.vue';
import ReferencedToFile from '@/pages/submissions/documents/referenced-to-file.vue';
import RelatedToSubstance from '@/pages/submissions/documents/related-to-substance.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import Textarea from '@/components/textarea/textarea.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Documents',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('document'),
      isCompleteSource: false
    };
  },
  methods: {
    getComponent(compName) {
      switch(compName) {
        case 'documentra':
          return DocumentRA;
        case 'documentgeneric.referencedtofile':
          return ReferencedToFile;
        case 'documentgeneric.documentnumber':
          return DocumentNumber;
        case 'documentgeneric.referenceddocument':
          return ReferencedDocument;
        case 'documentgeneric.relatedtosubstance':
          return RelatedToSubstance;
      }
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('document');
    this.resetForm();
    try {
      let documents = (await BackendService.callMethod('document', 'get', {_dossier: this.dossierid}));
      this.updateAppRecords(documents);
      this.selectListItem(this.records[0], false);
    }
    catch(err) {
      this.showMessage('ERROR');
    }
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-fieldset': Fieldset,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table,
    'vue-textarea': Textarea
  }
};
</script>