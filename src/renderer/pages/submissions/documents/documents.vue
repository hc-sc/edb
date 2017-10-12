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
            <vue-input type='text' id='documentpid' :label='$t("DOCUMENT_PID")' v-model='model.documentgeneric.documentpid'></vue-input>
          </div>
          <vue-input type='text' id='documentfamilypid' :label='$t("DOCUMENT_FAMILY_PID")' v-model='model.documentgeneric.documentfamilypid'></vue-input>
          <vue-input type='text' id='documentcompanyid' :label='$t("DOCUMENT_COMPANY_ID")' v-model='model.documentgeneric.documentcompanyid'></vue-input>
          <vue-input type='text' id='documentfamily' :label='$t("DOCUMENT_FAMILY")' v-model='model.documentgeneric.documentfamily'></vue-input>
          <vue-input type='text' id='documenttitle' :label='$t("DOCUMENT_TITLE")' v-model='model.documentgeneric.documenttitle'></vue-input>
          <vue-input type='text' id='documentauthor' :label='$t("DOCUMENT_AUTHOR")' v-model='model.documentgeneric.documentauthor'></vue-input>
          <vue-input type='date' id='documentissuedate' :label='$t("DOCUMENT_ISSUE_DATE")' v-model='model.documentgeneric.documentissuedate'></vue-input>
          <vue-table id='documentinformation' :title='$t("REGULATORY_AUTHORITY_DOCUMENT_INFORMATION")' :items='model.documentra' required addable  @add='addItem("documentra")' @select='selectTableItem("documentra", model.documentra[$event], $event)'></vue-table>
          <vue-table id='documentowner' :title='$t("DOCUMENT_OWNER")' :items='model.documentgeneric.documentowner' required addable @add='addItem("documentgeneric.documentowner")' @select='selectTableItem("documentgeneric.documentowner", model.documentra[$event], $event)'></vue-table>
          <vue-fieldset :legend='$t("DOCUMENT_SOURCE")'>
            <vue-switch id='documentsource' :label='$t("DOCUMENT_SOURCE")' :value='model.documentgeneric.documentsource' @input='model.documentgeneric.documentsource = $event'></vue-switch>
            <div v-if='model.documentgeneric.documentsource'>
              <vue-input type='text' id='completedocumentsource' :label='$t("COMPLETE_DOCUMENT_SOURCE")' v-model='model.documentgeneric.completedocumentsource' required></vue-input>
            </div>
            <div v-else>
              <vue-input type='text' id='documentyear' :label='$t("DOCUMENT_YEAR")' v-model='model.documentgeneric.documentyear' required></vue-input>
              <vue-input type='text' id='documentissue' :label='$t("DOCUMENT_ISSUE")' v-model='model.documentgeneric.documentissue' required></vue-input>
              <vue-input type='text' id='documentvolume' :label='$t("DOCUMENT_VOLUME")' v-model='model.documentgeneric.documentvolume' required></vue-input>
              <vue-input type='text' id='documentpages' :label='$t("DOCUMENT_PAGES")' v-model='model.documentgeneric.documentpages' required></vue-input>
            </div>
          </vue-fieldset>
          <vue-switch id='publishedindicator' :label='$t("PUBLISHED_INDICATOR")' :value='model.documentgeneric.publishedindicator' @input='model.documentgeneric.publishedindicator = $event'></vue-switch>
          <vue-switch id='gxpindicator' :label='$t("GXP_INDICATOR")' :value='model.documentgeneric.gxpindicator' @input='model.documentgeneric.gxpindicator = $event'></vue-switch>
          <vue-switch id='testedonvertebrate' :label='$t("TESTED_ON_VERTEBRATE")' :value='model.documentgeneric.testedonvertebrate' @input='model.documentgeneric.testedonvertebrate = $event'></vue-switch>
          <vue-table id='testlaboratory' :title='$t("TEST_LABORATORY")' :items='[]' required addable></vue-table>
          <vue-table id='referenceddocument' :title='$t("REFERENCED_DOCUMENT")' :items='[]' required addable></vue-table>
          <vue-table id='relatedtosubstance' :title='$t("RELATED_TO_SUBSTANCE")' :items='[]' required addable></vue-table>
          <vue-table id='documentnumber' :title='$t("DOCUMENT_NUMBER")' :items='[]' required addable></vue-table>
          <div class='bottom-float'>
            <vue-icon fab @click.native='save("submission")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
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
import DocumentRA from '@/pages/submissions/documents/document-ra.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
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
  name: 'Documents',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('document')
    };
  },
  methods: {
    getComponent(compName) {
      switch(compName) {
        case 'documentra':
          return DocumentRA;
        // case '':
        //   return
        // case '':
        //   return
        // case '':
        //   return
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