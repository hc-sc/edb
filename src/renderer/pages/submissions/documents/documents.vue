<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-split-pane>
        <div slot='split-pane-1'>
          <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='doc => doc.documentgeneric.documenttitle' :label='$t("search")' sortByArgs='documenttitle' :selectedItem='currentRecord'></vue-list-filter>
        </div>
        <div slot='split-pane-2' class='pane'>
          <template v-if='shouldShowFields()'>
            <div class='f-container f-cross-start'>
              <vue-button class='input-prefix' @click.native='assignPID("documentgeneric.documentpid")'>{{$t('generatepid')}}</vue-button>
              <span class='f-gap'></span>
              <vue-input type='text' id='documentpid' :label='$t("documentpid")' v-model='model.documentgeneric.documentpid'></vue-input>
            </div>

            <vue-input type='text' id='documentfamilypid' :label='$t("documentfamilypid")' v-model='model.documentgeneric.documentfamilypid' required></vue-input>

            <vue-input type='text' id='documentcompanyid' :label='$t("documentcompanyid")' v-model='model.documentgeneric.documentcompanyid' required></vue-input>

            <vue-input type='text' id='documentfamily' :label='$t("documentfamily")' v-model='model.documentgeneric.documentfamily' required></vue-input>

            <vue-input type='text' id='documenttitle' :label='$t("documenttitle")' v-model='model.documentgeneric.documenttitle' required></vue-input>

            <vue-input type='text' id='documentauthor' :label='$t("documentauthor")' v-model='model.documentgeneric.documentauthor' required></vue-input>

            <vue-input type='date' id='documentissuedate' :label='$t("documentissuedate")' v-model='model.documentgeneric.documentissuedate' required></vue-input>

            <vue-table id='referencedtofile' :title='$t("referencedtofile")' :items='model.documentgeneric.referencedtofile' :headers='[{name: "toFileId", url: "file"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentgeneric.referencedtofile")' @select='selectTableItem("documentgeneric.referencedtofile", model.documentgeneric.referencedtofile[$event], $event)' @action='handleAction($event, model.documentgeneric.referencedtofile)'></vue-table>

            <vue-table id='documentinformation' :title='$t("REGULATORY_AUTHORITY_DOCUMENT_INFORMATION")' :items='model.documentra' :headers='[{name: "toSpecificForRAId", url: "legalentity"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentra")' @select='selectTableItem("documentra", model.documentra[$event], $event)' @action='handleAction($event, model.documentra)'></vue-table>

            <vue-fieldset :legend='$t("documentsource")'>
              <vue-switch id='isCompleteSource' :label='$t("completedocumentsource")' :value='isCompleteSource' @input='isCompleteSource = $event'></vue-switch>

              <div v-if='isCompleteSource'>
                <vue-input type='text' id='completedocumentsource' :label='$t("completedocumentsource")' v-model='model.documentgeneric.completedocumentsource' required></vue-input>
              </div>

              <div v-else>
                <vue-input type='text' id='documentsource' :label='$t("documentsource")' v-model='model.documentgeneric.documentsource' required></vue-input>

                <vue-input type='number' id='documentyear' :label='$t("documentyear")' v-model='model.documentgeneric.documentyear' required :min='1900'></vue-input>

                <vue-input type='text' id='documentissue' :label='$t("documentissue")' v-model='model.documentgeneric.documentissue' required></vue-input>

                <vue-input type='text' id='documentvolume' :label='$t("documentvolume")' v-model='model.documentgeneric.documentvolume' required></vue-input>

                <vue-input type='text' id='documentpages' :label='$t("documentpages")' v-model='model.documentgeneric.documentpages' required></vue-input>
              </div>
            </vue-fieldset>

            <vue-switch id='publishedindicator' :label='$t("publishedindicator")' :value='model.documentgeneric.publishedindicator' @input='model.documentgeneric.publishedindicator = $event' style='display: block'></vue-switch>

            <vue-switch id='gxpindicator' :label='$t("gxpindicator")' :value='model.documentgeneric.gxpindicator' @input='model.documentgeneric.gxpindicator = $event' style='display: block'></vue-switch>

            <vue-switch id='testedonvertebrate' :label='$t("testedonvertebrate")' :value='model.documentgeneric.testedonvertebrate' @input='model.documentgeneric.testedonvertebrate = $event' style='display: block'></vue-switch>

            <vue-chips deletable unique id='documentowner' :label='$t("documentowner")' v-model='model.documentgeneric.documentowner'></vue-chips>

            <vue-chips deletable unique id='testlaboratory' :label='$t("testlaboratory")' v-model='model.documentgeneric.testlaboratory'></vue-chips>

            <vue-table id='referenceddocument' :title='$t("referenceddocument")' :items='model.documentgeneric.referenceddocument' :headers='[{name: "referencetype", url: "picklist"}, "internal", "documentpid"]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentgeneric.referenceddocument")' @select='selectTableItem("documentgeneric.referenceddocument", model.documentgeneric.referenceddocument[$event], $event)' @action='handleAction($event, model.documentgeneric.referenceddocument)'></vue-table>

            <vue-table id='relatedtosubstance' :title='$t("relatedtosubstance")' :items='model.documentgeneric.relatedtosubstance' :headers='[{name: "toSubstanceId", url: "substance"}]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentgeneric.relatedtosubstance")' @select='selectTableItem("documentgeneric.relatedtosubstance", model.documentgeneric.relatedtosubstance[$event], $event)' @action='handleAction("documentgeneric.relatedtosubstance", $event)'></vue-table>

            <vue-table id='documentnumber' :title='$t("documentnumber")' :items='model.documentgeneric.documentnumber' :headers='[{name: "documentnumbertype", url: "picklist"}, "identifier"]' :displayHeader='displayTranslation' required addable @add='addTableItem("documentgeneric.documentnumber")' @select='selectTableItem("documentgeneric.documentnumber", model.documentgeneric.documentnumber[$event], $event)' @action='handleAction($event, model.documentgeneric.documentnumber)'></vue-table>
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
import ReferencedDocument from '@/pages/submissions/documents/referenced-document.vue';
import ReferencedToFile from '@/pages/submissions/documents/referenced-to-file.vue';
import RelatedToSubstance from '@/pages/submissions/documents/related-to-substance.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
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
  beforeCreated() {
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
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>