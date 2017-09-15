<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='appRecords' :displayValue='le => le.legalentityname' :label='$t("search")' sortByArgs='legalentityname'></vue-list-filter>
      </div>
      <div slot='split-pane-2' class='pane'>
        <template v-if='appRecords && appRecords.length'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='assignPID("legalentitypid")'>generate</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='legalentitypid' :label='$t("legalentitypid")' v-model='model.legalentitypid' required disabled></vue-input>
          </div>
          <vue-input type='text' id='legalentityname' :label='$t("legalentityname")' required v-model='model.legalentityname' :max='255'></vue-input>
          <vue-select-extensible id='legalentitytype' :label='$t("legalentitytype")' typeName='EXTENSION_TYPE_LEGALENTITY_TYPE' :value='model.legalentitytype' @input='model.legalentitytype = $event._id' :options='legalentitytype' :displayValue='displayPicklistItem' :matchValue='matchById'></vue-select-extensible>
          <vue-chips deletable unique id='othername' :label='$tc("othername", 2)' v-model='model.othername'></vue-chips>
          <vue-table :title='$tc("legalentityidentifier", 2)' :items='model.legalentityidentifier' :headers='["identifier", {name: "legalentityidentifiertype", url: "picklist"}]' id='legalentityidentifier' :displayHeader='displayTranslation' addable @select='showDialog("legalentityidentifier", model.legalentityidentifier[$event], $event)' @add='addItem("legalentityidentifier")' @action='handleAction($event)'></vue-table>
          <vue-fieldset :legend='$t("address")'>
            <vue-input type='text' id='street1' :label='$t("street1")' v-model='model.contactaddress.street1' :max='255'></vue-input>
            <vue-input type='text' id='street2' :label='$t("street2")' v-model='model.contactaddress.street2' :max='255'></vue-input>
            <vue-input type='text' id='zipcode' :label='$t("zipcode")' v-model='model.contactaddress.zipcode' :max='255'></vue-input>
            <vue-input type='text' id='city' :label='$t("city")' v-model='model.contactaddress.city' :max='255'></vue-input>
            <vue-input type='text' id='state' :label='$t("state")' v-model='model.contactaddress.state' :max='255'></vue-input>
            <vue-select-extensible id='country' :label='$tc("country", 2)' :value='model.contactaddress.country' @input='model.contactaddress.country = $event._id' :options='country' :displayValue='displayCountry' :matchValue='matchById'></vue-select-extensible>
            <vue-input type='text' id='phone' :label='$t("phone")' v-model='model.contactaddress.phone' :max='255'></vue-input>
            <vue-input type='text' id='fax' :label='$t("fax")' v-model='model.contactaddress.fax' :max='255'></vue-input>
            <vue-input type='text' id='email' :label='$t("email")' v-model='model.contactaddress.email' :max='255'></vue-input>
            <vue-input type='text' id='website' :label='$t("website")' v-model='model.contactaddress.website'></vue-input>
          </vue-fieldset>
          <vue-table :title='$tc("contact", 2)' :items='model.contactperson' id='contact' :headers='["lastname", "firstname", "title", "email"]' :displayHeader='displayTranslation' addable @select='showDialog("contactperson", model.contactperson[$event], $event)' @add='addItem("contactperson")' @action='handleAction(model.contactperson, $event)'></vue-table>
        </template>
        <template v-else>{{$t('noitems')}}</template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("legalentity")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("legalentity")'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import Contacts from '@/pages/globals/legal-entities/contacts.vue';
import Dialog from '@/components/dialog/dialog.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import LegalEntityIdentifier from '@/pages/globals/legal-entities/legal-entity-identifier.vue';
import Progress from '@/components/progress/progress.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Table from '@/components/table/table.vue';
import {mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';

export default {
  name: 'LegalEntities',
  mixins: [model],
  data() {
    return {
      model: {
        ...this.getEmptyModel('legalentity')
      }
    };
  },
  computed: {
    ...mapGetters('picklists', [
      'country',
      'legalentitytype',
      'legalentityidentifiertype'
    ])
  },
  methods: {
    getComponent(ref) {
      switch(ref) {
        case 'contactperson':
          return Contacts;
        case 'legalentityidentifier':
          return LegalEntityIdentifier;
      }
    }
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    await this.$store.dispatch('app/getAppDataAll', 'legalentity');
    this.select(this.appRecords[0]);
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-dialog': Dialog,
    'vue-fieldset': Fieldset,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-select-extensible': SelectExtensible,
    'vue-select': Select,
    'vue-split-pane': SplitPane,
    'vue-table': Table
  }
};
</script>
