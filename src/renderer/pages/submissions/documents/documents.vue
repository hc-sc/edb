<template>
  <main>
    <div class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-input type='text' id='documentpid' :label='$t("DOCUMENT_PID")'></vue-input>
      <vue-input type='text' id='documentfamilypid' :label='$t("DOCUMENT_FAMILY_PID")'></vue-input>
      <vue-input type='text' id='documentcompanyid' :label='$t("DOCUMENT_COMPANY_ID")'></vue-input>
      <vue-input type='text' id='documentfamily' :label='$t("DOCUMENT_FAMILY")'></vue-input>
      <vue-input type='text' id='documenttitle' :label='$t("DOCUMENT_TITLE")'></vue-input>
      <vue-input type='text' id='documentauthor' :label='$t("DOCUMENT_AUTHOR")'></vue-input>
      <vue-input type='date' id='documentissuedate' :label='$t("DOCUMENT_ISSUE_DATE")'></vue-input>
      <vue-table id='documentinformation' :title='$t("REGULATORY_AUTHORITY_DOCUMENT_INFORMATION")' :items='[]' required addable></vue-table>
      <vue-table id='documentowner' :title='$t("DOCUMENT_OWNER")' :items='[]' required addable></vue-table>
      <vue-switch id='documentsource' :label='$t("DOCUMENT_SOURCE")' :value='false'></vue-switch>
      <vue-fieldset :legend='$t("DOCUMENT_SOURCE")'></vue-fieldset>
      <vue-switch id='publishedindicator' :label='$t("PUBLISHED_INDICATOR")' :value='false'></vue-switch>
      <vue-switch id='gxpindicator' :label='$t("GXP_INDICATOR")' :value='false'></vue-switch>
      <vue-switch id='testedonvertebrate' :label='$t("TESTED_ON_VERTEBRATE")' :value='false'></vue-switch>
      <vue-table id='testlaboratory' :title='$t("TEST_LABORATORY")' :items='[]' required addable></vue-table>
      <vue-table id='referenceddocument' :title='$t("REFERENCED_DOCUMENT")' :items='[]' required addable></vue-table>
      <vue-table id='relatedtosubstance' :title='$t("RELATED_TO_SUBSTANCE")' :items='[]' required addable></vue-table>
      <vue-table id='documentnumber' :title='$t("DOCUMENT_NUMBER")' :items='[]' required addable></vue-table>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save("submission")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
        <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
        </vue-icon>
      </div>
    </template>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'Documents',
  mixins: [model],
  components: {
    'vue-button': Button,
    'vue-fieldset': Fieldset,
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