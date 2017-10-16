<template>
  <div>
    <vue-select id='regulatoryauthority' :label='$tc("REGULATORY_AUTHORITY", 1)' :options='ras' :displayValue='ra => ra.legalentityname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id'></vue-select>

    <vue-select id='dataprotection' :label='$t("dataprotection")' :options='dataprotection' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.dataprotection' @input='model.dataprotection = $event._id'></vue-select>

    <vue-select id='datarequirement' :label='$t("datarequirement")' :options='datarequirement' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.datarequirement' @input='model.datarequirement = $event._id'></vue-select>

    <vue-chips deletable unique id='documentcomment' :label='$t("documentcomment")' v-model='model.documentcomment'></vue-chips>

    <vue-toolbar>
      {{$t('othernationalguideline')}}
      <span slot='right'>
        <vue-button @click.native='addOtherNationalGuideline'>add</vue-button>
      </span>
    </vue-toolbar>
    <ul>
      <li v-for='(item, index) of model.othernationalguideline' :key='index' class='list-item'>
        <vue-button @click.native='deleteOtherNationalGuideline(index)'>delete</vue-button>
        <vue-input type='text' :id='`guidelinenumber-${index}`' :label='$t("guidelinenumber")' v-model='item.guidelinenumber'></vue-input>
        <vue-input type='text' :id='`guidelinesystem-${index}`' :label='$t("guidelinesystem")' v-model='item.guidelinesystem'></vue-input>
      </li>
    </ul>

    <br/>

    <vue-fieldset :legend='$t("radocumentnumber")'>
      <vue-select-extensible id='radocumentnumber' :label='$t("radocumentnumbertype")' :options='radocumentnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.radocumentnumber.radocumentnumbertype' @input='model.radocumentnumber.radocumentnumbertype = $event._id' typeName='EXTENSION_TYPE_RA_DOCUMENT_NUMBER_TYPE' required></vue-select-extensible>

      <vue-input type='text' id='identifier' :label='$t("identifier")' v-model='model.radocumentnumber.identifier' required></vue-input>

      <vue-switch id='alreadysubmitted' :label='$t("alreadysubmitted")' :value='model.radocumentnumber.alreadysubmitted' @input='model.radocumentnumber.alreadysubmitted = $event'></vue-switch>

      <vue-toolbar>
        {{$t('dossiercontext')}}
        <span slot='right'>
          <vue-button @click.native='addDossierContext'>add</vue-button>
        </span>
      </vue-toolbar>
      <ul>
        <li v-for='(item, index) of model.radocumentnumber.dossiercontext' :key='index' class='list-item'>
          <vue-button @click.native='deleteDossierContext(index)'>delete</vue-button>
          <vue-input type='text' :id='`dossierpid-${index}`' :label='$t("dossierpid")' v-model='item.dossierpid'></vue-input>
          <vue-input type='text' :id='`dossiernumber-${index}`' :label='$t("dossiernumber")' v-model='item.dossiernumber'></vue-input>
        </li>
      </ul>
    </vue-fieldset>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Input from '@/components/input/input.vue';
import List from '@/components/list/list.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Switch from '@/components/switch/switch.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

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
    ...mapGetters('picklists', ['dataprotection', 'datarequirement', 'radocumentnumbertype'])
  },
  methods: {
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
      this.ras = await BackendService.getAppData('legalentity');
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-fieldset': Fieldset,
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
.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.list-item:not:last-child {
  border-bottom: 1px solid lightgray;
}

.list-item > div {
  padding-left: 10px;
  flex: 2;
}
</style>