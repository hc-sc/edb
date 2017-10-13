<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <vue-split-pane>
        <div slot='split-pane-1'>
          <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='doc => doc.documenttitle' :label='$t("search")' sortByArgs='documenttitle' :selectedItem='currentRecord'></vue-list-filter>
        </div>
        <div slot='split-pane-2'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='assignPID("documentgeneric.documentpid")'>{{$t('generatepid')}}</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='documentpid' :label='$t("documentpid")' v-model='model.documentgeneric.documentpid'></vue-input>
          </div>

          <vue-input type='text' id='documentfamilypid' :label='$t("documentfamilypid")' v-model='model.documentgeneric.documentfamilypid'></vue-input>

          <vue-input type='text' id='documentcompanyid' :label='$t("documentcompanyid")' v-model='model.documentgeneric.documentcompanyid'></vue-input>

          <vue-input type='text' id='documentfamily' :label='$t("documentfamily")' v-model='model.documentgeneric.documentfamily'></vue-input>

          <vue-input type='text' id='documenttitle' :label='$t("documenttitle")' v-model='model.documentgeneric.documenttitle'></vue-input>

          <vue-input type='text' id='documentauthor' :label='$t("documentauthor")' v-model='model.documentgeneric.documentauthor'></vue-input>

          <vue-input type='date' id='documentissuedate' :label='$t("documentissuedate")' v-model='model.documentgeneric.documentissuedate'></vue-input>

          <vue-table id='referencedtofile' :title='$t("referencedtofile")' :items='model.documentgeneric.referencedtofiles' required addable @add='addItem("documentgeneric.referencedtofile")' @select='selectTableItem("referencedtofile", model.documentgeneric.referencedtofiles[$event], $event)' @action='handleAction($event, model.documentgeneric.referencedtofiles)'></vue-table>

          <vue-table id='documentinformation' :title='$t("REGULATORY_AUTHORITY_DOCUMENT_INFORMATION")' :items='model.documentra' required addable  @add='addItem("documentra")' @select='selectTableItem("documentra", model.documentra[$event], $event)' @action='handleAction($event, model.documentra)'></vue-table>

          <vue-table id='documentowner' :title='$t("documentowner")' :items='model.documentgeneric.documentowner' required addable @add='addItem("documentgeneric.documentowner")' @select='selectTableItem("documentgeneric.documentowner", model.documentowner[$event], $event)' @action='handleAction($event, model.documentowner)'></vue-table>

          <vue-fieldset :legend='$t("documentsource")'>
            <vue-switch id='isCompleteSource' :label='$t("completedocumentsource")' :value='isCompleteSource' @input='isCompleteSource = $event'></vue-switch>

            <div v-if='isCompleteSource'>
              <vue-input type='text' id='completedocumentsource' :label='$t("completedocumentsource")' v-model='model.documentgeneric.completedocumentsource' required></vue-input>
            </div>

            <div v-else>
              <vue-input type='text' id='documentsource' :label='$t("documentsource")' v-model='model.documentgeneric.documentsource'></vue-input>

              <vue-input type='text' id='documentyear' :label='$t("documentyear")' v-model='model.documentgeneric.documentyear' required></vue-input>

              <vue-input type='text' id='documentissue' :label='$t("documentissue")' v-model='model.documentgeneric.documentissue' required></vue-input>

              <vue-input type='text' id='documentvolume' :label='$t("documentvolume")' v-model='model.documentgeneric.documentvolume' required></vue-input>

              <vue-input type='text' id='documentpages' :label='$t("documentpages")' v-model='model.documentgeneric.documentpages' required></vue-input>
            </div>
          </vue-fieldset>

          <vue-switch id='publishedindicator' :label='$t("publishedindicator")' :value='model.documentgeneric.publishedindicator' @input='model.documentgeneric.publishedindicator = $event' style='display: block'></vue-switch>

          <vue-switch id='gxpindicator' :label='$t("gxpindicator")' :value='model.documentgeneric.gxpindicator' @input='model.documentgeneric.gxpindicator = $event' style='display: block'></vue-switch>

          <vue-switch id='testedonvertebrate' :label='$t("testedonvertebrate")' :value='model.documentgeneric.testedonvertebrate' @input='model.documentgeneric.testedonvertebrate = $event' style='display: block'></vue-switch>

          <vue-table id='testlaboratory' :title='$t("testlaboratory")' :items='[]' required addable></vue-table>

          <vue-table id='referenceddocument' :title='$t("referenceddocument")' :items='model.documentgeneric.referenceddocument' required addable @add='addItem("documentgeneric.referenceddocument")' @action='handleAction($event, model.documentgeneric.referenceddocument)'></vue-table>

          <vue-table id='relatedtosubstance' :title='$t("relatedtosubstance")' :items='[]' required addable></vue-table>

          <vue-table id='documentnumber' :title='$t("documentnumber")' :items='model.documentgeneric.documentnumber' :headers='[{name: "documentnumbertype", url: "picklist"}, "identifier"]' :displayHeader='displayTranslation' required addable @add='addItem("documentgeneric.documentnumber")' @action='handleAction($event, model.documentgeneric.documentnumber)'></vue-table>

          <div class='bottom-float'>
            <vue-icon fab @click.native='save("document")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
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
import DocumentNumber from '@/pages/submissions/documents/document-number.vue';
import DocumentRA from '@/pages/submissions/documents/document-ra.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import ReferencedDocument from '@/pages/submissions/documents/referenced-document.vue';
import ReferencedToFile from '@/pages/submissions/documents/referenced-to-file.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';

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
      }
    }
  },
  components: {
    'vue-button': Button,
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