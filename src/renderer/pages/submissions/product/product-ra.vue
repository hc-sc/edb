<template>
  <div>
    <vue-select id='productra' :label='$tc("REGULATORY_AUTHORITY", 1)' :options='ras' :displayValue='ra => ra.legalentityname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id'></vue-select>
    <vue-input type='text' id='productname' :label='$t("productname")' v-model='model.productname' required></vue-input>
    <vue-toolbar :legend='$t("adminnumber")'>
      <div v-for='(item, index) of model.adminnumber' :key='index'>
        <vue-select id='adminnumbertype' :label='$t("adminnumbertype")' :options='ras' :displayValue='ra => ra.shortname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id'></vue-select>
      </div>
    </vue-toolbar>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

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
    ...mapGetters('picklist', ['adminnumbertype'])
  },
  async created() {
    try {
      this.ras = await BackendService.getAppData('legalentity');
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-toolbar': Toolbar,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible
  }
};
</script>