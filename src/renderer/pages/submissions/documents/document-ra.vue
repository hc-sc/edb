<template>
  <div>
    <vue-select id='regulatoryauthority' :label='$t("receiver")' :options='ras' :displayValue='ra => ra.shortname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>

    <vue-select id='dataprotection' :label='$t("dataprotection")' :options='dataprotection' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.dataprotection' @input='model.dataprotection = $event._id' required></vue-select>

    <vue-select id='datarequirement' :label='$t("datarequirement")' :options='datarequirement' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.datarequirement' @input='model.datarequirement = $event._id' required></vue-select>

    <vue-chips deletable unique id='documentcomment' :label='$t("documentcomment")' v-model='model.documentcomment'></vue-chips>

    <vue-toolbar>
      {{$t('othernationalguidelines')}}
      <span slot='right'>
        <vue-icon icon='add' :label='$t("add")' id='othernationalguidelineadd' @click.native='addOtherNationalGuideline'></vue-icon>
      </span>
    </vue-toolbar>
    <ul>
      <li v-for='(item, index) of model.othernationalguideline' :key='index' class='list-item f-container f-start'>
        <vue-icon icon='delete' :label='$t("delete")' :id='`othernationalguidelinedelete-${index}`'@click.native='deleteOtherNationalGuideline(index)' style='align-self: center'></vue-icon>
        <vue-input type='text' :id='`guidelinenumber-${index}`' :label='$t("guidelinenumber")' v-model='item.guidelinenumber' required :max='255'></vue-input>
        <vue-input type='text' :id='`guidelinesystem-${index}`' :label='$t("guidelinesystem")' v-model='item.guidelinesystem' required :max='20'></vue-input>
      </li>
    </ul>

    <br/>

    <vue-fieldset :legend='$t("radocumentnumber")'>
      <vue-select-extensible id='radocumentnumber' :label='$t("radocumentnumbertype")' :options='radocumentnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.radocumentnumber.radocumentnumbertype' @input='model.radocumentnumber.radocumentnumbertype = $event._id' typeName='EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE' required></vue-select-extensible>

      <vue-input type='text' id='identifier' :label='$t("identifier")' v-model='model.radocumentnumber.identifier' required :max='255'></vue-input>

      <vue-switch id='alreadysubmitted' :label='$t("alreadysubmitted")' v-model='model.radocumentnumber.alreadysubmitted'></vue-switch>

      <vue-toolbar>
        {{$t('dossiercontexts')}}
        <span slot='right'>
          <vue-icon icon='add' :label='$t("add")' id='adddossiercontent' @click.native='addDossierContext' position='left'></vue-icon>
        </span>
      </vue-toolbar>
      <ul>
        <li v-for='(item, index) of model.radocumentnumber.dossiercontext' :key='index' class='list-item f-container f-start'>
          <vue-icon icon='delete' :label='$t("delete")' :id='`deletedossiercontext-${index}`' @click.native='deleteDossierContext(index)' position='right' style='align-self: center'></vue-icon>
          <vue-input type='text' :id='`dossierpid-${index}`' :label='$t("dossierpid")' v-model='item.dossierpid' :pattern='getValidPIDRegExp()' required></vue-input>
          <vue-input type='text' :id='`dossiernumber-${index}`' :label='$t("dossiernumber")' v-model='item.dossiernumber' required :max='255'></vue-input>
        </li>
      </ul>
    </vue-fieldset>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import List from '@/components/list/list.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Switch from '@/components/switch/switch.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {model} from '@/mixins/model.js';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'DocumentRA',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('documentra'),
      ras: []
    };
  },
  computed: {
    ...mapGetters('picklists', ['dataprotection', 'datarequirement', 'radocumentnumbertype', 'raId'])
  },
  methods: {
    ...mapActions('app', ['getSubmissionReceivers']),
    addOtherNationalGuideline() {
      this.model.othernationalguideline.push(this.getEmptyModel('documentra.othernationalguideline'));
    },
    deleteOtherNationalGuideline(index) {
      this.model.othernationalguideline.splice(index, 1);
    },
    addDossierContext() {
      this.model.radocumentnumber.dossiercontext.push(this.getEmptyModel('documentra.radocumentnumber.dossiercontext'));
    },
    deleteDossierContext(index) {
      this.model.radocumentnumber.dossiercontext.splice(index, 1);
    }
  },
  async created() {
    try {
      // use this if they only are required to be regulatory authorities
      // let les = await BackendService.getAppData('legalentity');
      // this.ras = les.filter(le => le.legalentitytype === this.raId);

      // use this if they must also be receivers from this submission
      this.ras = await this.getSubmissionReceivers();
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-fieldset': Fieldset,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list': List,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-switch': Switch,
    'vue-toolbar': Toolbar
  }
};
</script>

<style>
.list-item:not:last-child {
  border-bottom: 1px solid lightgray;
}

.list-item > div {
  padding-left: 10px;
  flex: 2;
}
</style>