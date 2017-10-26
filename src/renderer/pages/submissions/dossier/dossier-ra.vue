<template>
  <div>
    <vue-select id='regulatoryauthorityfield' :label='$tc("REGULATORY_AUTHORITY", 1)' :options='ras' :displayValue='ra => ra.legalentityname' :matchValue='matchBy("_id")' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>
    <vue-select-extensible id='regulatorytype' :label='$t("regulatorytype")' :options='regulatorytype' :matchValue='matchById' :value='model.regulatorytype' @input='model.regulatorytype = $event._id' :displayValue='displayPicklistItem' typeName='EXTENSION_TYPE_REGULATORY_TYPE' required></vue-select-extensible>
    <vue-select-extensible id='applicationtype' :label='$t("applicationtype")' :value='model.applicationtype' @input='model.applicationtype = $event._id' :options='applicationtype'  :matchValue='matchById' :displayValue='displayPicklistItem' typeName='EXTENSION_TYPE_APPLICATION_TYPE' required></vue-select-extensible>
    <vue-chips deletable unique id='projectidnumber' :label='$t("projectidnumber")' v-model='model.projectidnumber'></vue-chips>
  </div>
</template>

<script>
import Chips from '@/components/chips/chips.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

export default {
  name: 'DossierRA',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('dossierra'),
      ras: []
    };
  },
  computed: {
    ...mapGetters('picklists', ['regulatorytype', 'applicationtype', 'raId'])
  },
  async created() {
    try {
      let les = await BackendService.getAppData('legalentity');
      this.ras = les.filter(le => le.legalentitytype === this.raId);
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-chips': Chips,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible
  }
};
</script>