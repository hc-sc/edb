<template>
  <div>
    <vue-select id='productra' :label='$t("receiver")' :options='ras' :displayValue='ra => ra.shortname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>
    <vue-input type='text' id='productname' :label='$t("productname")' v-model='model.productname' required :max='255'></vue-input>
    <vue-toolbar>
      {{$t('adminnumbers')}}
      <span slot='right'>
        <vue-icon icon='add' :label='$t("add")' id='addadminnumber' @click.native='addAdminNumber' position='left'></vue-icon>
      </span>
    </vue-toolbar>
    <ul>
      <li v-for='(item, index) of model.adminnumber' :key='index' class='list-item'>
        <vue-icon icon='delete' :label='$t("delete")' :id='`deleteadminnumber-${index}`'@click.native='deleteAdminNumber(index)' ></vue-icon>

        <vue-select-extensible :id='`adminnumbertype-${index}`' :label='$t("adminnumbertype")' typeName='EXTENSION_TYPE_ADMIN_NUMBER_TYPE' :value='item.adminnumbertype' @input='item.adminnumbertype = $event._id' :options='adminnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' required></vue-select-extensible>

        <vue-input type='text' :id='`identifier-${index}`' :label='$t("identifier")' v-model='item.identifier' required :max='255'></vue-input>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {model} from '@/mixins/model.js';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'ProductRA',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('productra'),
      ras: []
    };
  },
  computed: {
    ...mapGetters('picklists', ['adminnumbertype'])
  },
  methods: {
    ...mapActions('app', ['getSubmissionReceivers']),
    addAdminNumber() {
      this.model.adminnumber.push(this.getEmptyModel('adminnumber'));
    },
    deleteAdminNumber(index) {
      this.model.adminnumber.splice(index, 1);
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
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
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