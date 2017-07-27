<template>
  <main>
    <vue-dialog id='contactperson-dialog' ref='contactperson-dialog'>
      <vue-contacts ref='contactperson'></vue-contacts>
    </vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='legalentities' :displayValue='le => le.legalentityname' :label='$t("search")'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <div class='f-container f-cross-start'>
          <vue-button class='input-prefix'>generate</vue-button>
          <span class='spacer'></span>
          <vue-input type='text' id='legalentitypid' :label='$t("legalentitypid")' v-model='model.legalentitypid' required></vue-input>
        </div>
        <vue-input type='text' id='legalentityname' :label='$t("legalentityname")' required v-model='model.legalentityname'></vue-input>
        <vue-select-extensible id='legalentitytype' :label='$t("legalentitytype")' :value='model.legalentitytype' @input='model.legalentitytype = $event._id' :options='legalentitytype' :displayValue='displayPicklistItem' :matchValue='matchById'></vue-select-extensible>
         <vue-chips deletable unique id='othername' :label='$tc("othername", 2)' :items.sync='model.othername'></vue-chips>
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
        <vue-table :title='$tc("contact", 2)' :items='model.contactperson' id='contact' :headers='["lastname", "firstname", "title", "email"]' :displayHeader='displayTranslation' selectable pageable sortable @select='showModal("contactperson", $event)'></vue-table>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-button display='fab'>
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
    ])
  },
  methods: {
    showModal(ref, index) {
      // this.$refs[ref].$set(model, cloneDeep(this.model.contactperson[index]));
      // this.$refs[ref].open();
      console.log(this.$refs);
      this.$refs['contactperson'].model = cloneDeep(this.model.contactperson[index]);
      this.$refs['contactperson-dialog'].open();
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

// function getSampleLegalEntities() {
//   return [
//     {
//       legalentitypid: 'urn:ghsts:sample',
//       legalentityname: 'Australian Pesticides and Veterinary Medicines Authority',
//       legalentitytype: {origin: 'IUCLID', status: 'enabled', value: 'Regulatory Authority', valueDecode: 'Regulatory Authority'},
//       othername: ['APVMA'],
//       contactaddress: {
//         street1: '18 Wormald Street',
//         street2: '',
//         zipcode: '2609',
//         city: 'Symonston',
//         state: 'ACT',
//         country: 'Australia',
//         phone: '+61 2 6210 4701',
//         fax: '+61 20 6210 4701 234',
//         email: 'enquiries@apvma.gov.au',
//         website: 'http://apvma.gov.au'
//       },
//       contactperson: [
//         {
//           organization: 'APVMA',
//           department: 'Regulatory Affairs',
//           title: 'Director',
//           firstname: 'Susan',
//           lastname: 'Miller',
//           phone: '+61 2 6210 4701 3544',
//           mobile: '+61 413 025 837',
//           fax: '',
//           email: 'susan.miller@apvma.gov.au'
//         },
//         {
//           organization: 'PMRA',
//           department: 'Regulatory Affairs',
//           title: 'Boss',
//           firstname: 'Some',
//           lastname: 'Person',
//           phone: '+1 613 899 9998',
//           mobile: '',
//           fax: '',
//           email: 'some.person@pmra.gc.ca'
//         },
//         {
//           organization: 'PMRA',
//           department: 'Regulatory Affairs',
//           title: 'Director',
//           firstname: 'Another',
//           lastname: 'Individual',
//           phone: '+1 613 899 9999',
//           mobile: '',
//           fax: '',
//           email: 'another.individual@pmra.gc.ca'
//         },
//       ]
//     },
//     {
//       legalentitypid: 'urn:ghsts:sample2',
//       legalentityname: 'Instituto Braseileiro do Meio Ambiente',
//       legalentitytype: 'Regulatory Authority',
//       othername: ['IBAMA'],
//       contactaddress: {
//         street1: 'SCEN Trecho 2',
//         street2: 'Ed. Sede - Cx. Postal n 09566',
//         zipcode: '70818-900',
//         city: 'Brasilia',
//         state: 'DF',
//         country: 'Brazil',
//         phone: '+55 61-3316-1212',
//         fax: '+55 61-3316-1212-433',
//         email: 'sic@ibama.gov.br',
//         website: 'http://www.ibama.gov.br'
//       },
//       contactperson: [{
//         organization: 'IBAMA',
//         department: '',
//         title: '',
//         firstname: 'Joao',
//         lastname: 'Gilberto',
//         phone: '+55 61-3316-1212-265',
//         mobile: '+55 21-99635-9499',
//         fax: '',
//         email: ''
//       }]
//     }
//   ];
// }
</script>
