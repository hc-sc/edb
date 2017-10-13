<template>
  <div>
    <vue-select id='regulatoryauthority' :label='$tc("REGULATORY_AUTHORITY", 1)' :options='ras' :displayValue='ra => ra.legalentityname' :matchValue='matchById' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id'></vue-select>

    <vue-select id='dataprotection' :label='$t("dataprotection")' :options='dataprotection' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.dataprotection' @input='model.dataprotection = $event._id'></vue-select>

    <vue-select id='datarequirement' :label='$t("datarequirement")' :options='datarequirement' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.datarequirement' @input='model.datarequirement = $event._id'></vue-select>
    <p>documentcomment</p>
    <p>othernationalguideline</p>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
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
    ...mapGetters('picklists', ['dataprotection', 'datarequirement'])
  },
  async created() {
    try {
      this.ras = await BackendService.getAppData('legalentity');
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-input': Input,
    'vue-select': Select
  }
};
</script>