<template>
  <div>
    <vue-select id='regulatoryauthorityfield' :label='$t("receiver")' :options='ras' :displayValue='ra => ra.shortname' :matchValue='matchBy("_id")' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>

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
import {mapGetters, mapActions} from 'vuex';

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
  methods: {
    ...mapActions('app', ['getSubmissionReceivers'])
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
    'vue-chips': Chips,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible
  }
};
</script>