<template>
  <main>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='legalentities' :displayValue='le => le.legalentityname' :label='$t("search")'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <div class='f-container f-cross-start'>
          <vue-button class='input-prefix'>generate</vue-button>
          <span class='f-gap'></span>
          <vue-input type='text' id='legalentitypid' :label='$t("legalentitypid")' v-model='model.legalentitypid' required disabled></vue-input>
        </div>
        <vue-input type='text' id='legalentityname' :label='$t("legalentityname")' required v-model='model.legalentityname'></vue-input>
        <vue-select-extensible id='legalentitytype' :label='$t("legalentitytype")' :value='model.legalentitytype' @input='model.legalentitytype = $event._id' :options='legalentitytype' :displayValue='displayPicklistItem' :matchValue='matchById'></vue-select-extensible>
         <vue-chips deletable unique id='othername' :label='$tc("othername", 2)' v-model='model.othername'></vue-chips>
        <vue-table :title='$t("otheridentifiers")' id='other-identifiers'></vue-table>
        <vue-fieldset :legend='$t("address")'>
          <vue-input type='text' id='street1' :label='$t("street1")' v-model='model.contactaddress.street1'></vue-input>
          <vue-input type='text' id='street2' :label='$t("street2")' v-model='model.contactaddress.street2'></vue-input>
          <vue-input type='text' id='zipcode' :label='$t("zipcode")' v-model='model.contactaddress.zipcode'></vue-input>
          <vue-input type='text' id='city' :label='$t("city")' v-model='model.contactaddress.city'></vue-input>
           <vue-select-extensible id='country' :label='$tc("country", 2)' :value='model.contactaddress.country' @input='model.contactaddress.country = $event._id' :options='country' :displayValue='displayCountry' :matchValue='matchById'></vue-select-extensible>
          <vue-input type='text' id='phone' :label='$t("phone")' v-model='model.contactaddress.phone'></vue-input>
          <vue-input type='text' id='fax' :label='$t("fax")' v-model='model.contactaddress.fax'></vue-input>
          <vue-input type='text' id='email' :label='$t("email")' v-model='model.contactaddress.email'></vue-input>
          <vue-input type='text' id='website' :label='$t("website")' v-model='model.contactaddress.website'>
            <span slot='prefix'>http://</span>
          </vue-input>
        </vue-fieldset>
        <vue-table :title='$tc("contact", 2)' :items='model.contactperson' id='contact' :headers='["lastname", "firstname", "title", "email"]' :displayHeader='displayTranslation' selectable pageable sortable @select='showDialog("contactperson", $event)'></vue-table>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-button display='fab' @click.native='save()'>
        <i class='material-icons'>save</i>
      </vue-button>
      <vue-button display='fab'>
        <i class='material-icons'>add</i>
      </vue-button>
      <vue-button display='fab' @click.native='revert'>
        <i class='material-icons'>undo</i>
      </vue-button>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import Contacts from '@/pages/globals/legal-entities/contacts.vue';
import Dialog from '@/components/dialog/dialog.vue';
import Fieldset from '@/components/fieldset/fieldset.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Menu from '@/components/menu/menu.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Table from '@/components/table/table.vue';
import {mapState, mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';
import {cloneDeep} from 'lodash';
import {BackendService} from '@/store/backend.service';

export default {
  name: 'LegalEntities',
  mixins: [model],
  data() {
    return {
      model: {
        ...getEmptyModel('legalentities')
      }
    };
  },
  computed: {
    ...mapState('app',
      {
        stateModel(state) {
          return state.currentRecord;
        },
        legalentities(state) {
          return state.appRecords;
        }
      }
    ),
    ...mapGetters('picklists', [
      'country',
      'legalentitytype',
      'legalentityidentifiertype'
    ])
  },
  methods: {
    showDialog() {
      const dialog = this.$refs['dialog'];
      dialog.show({
        component: Contacts,
        model: cloneDeep(this.model.contactperson[0])
      })
      .then(result => {
        this.$set(this.model.contactperson, 0, result);
        dialog.close();
      })
      .catch(err => {
        console.log(err);
        dialog.close();
      });
    },
    selectId(prop, item) {
      this.model[prop] = item._id;
    },
    select(item) {
      if (this.legalentities) {
        this.$store.commit('app/updateModel', item);
      }
    },
    displayPicklistItem(value) {
      return value.valuedecode;
    },
    displayCountry(value) {
      return `(${value.value}) - ${value.valuedecode}`;
    },
    displayTranslation(value) {
      return this.$t(value);
    },

    async save() {
      let saved = await BackendService.updateAppData('legalentity', this.model);
      // await this.$store.dispatch('app/updateAppData', 'legalentity', this.model);
      console.log('save change ');
      console.log(saved);
    }
  },
  async created() {
    await this.$store.dispatch('app/getAppDataAll', 'legalentity');
    this.select(this.legalentities[0]);
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-contacts': Contacts,
    'vue-dialog': Dialog,
    'vue-fieldset': Fieldset,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-menu': Menu,
    'vue-select-extensible': SelectExtensible,
    'vue-select': Select,
    'vue-split-pane': SplitPane,
    'vue-table': Table
  }
};

function getEmptyModel(type) {
  switch(type) {
    case 'legalentities':
      return {
        legalentitypid: '',
        legalentityname: '',
        legalentitytype: {},
        othername: [],
        legalentityidentifier: [],
        contactaddress: {
          street1: '',
          street2: '',
          zipcode: '',
          city: '',
          state: '',
          country: {},
          phone: '',
          fax: '',
          email: '',
          website: ''
        },
        contactperson: [
          {
            organization: '',
            department: '',
            title: '',
            firstname: '',
            lastname: '',
            phone: '',
            mobile: '',
            fax: '',
            email: ''
          }
        ]
      };
  }
}
</script>
