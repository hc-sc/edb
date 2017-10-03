<template>
  <vue-select id='receiver' :options='receivers' :label='$tc("receiver", 2)' :displayValue='o => o._shortname' :value='model.receiver' @input='model.toLegalEntityId = $event._id' :matchValue='getMatch'></vue-select>

  <!-- <vue-select-extensible id='legalentitytype' :label='$t("legalentitytype")' typeName='EXTENSION_TYPE_LEGALENTITY_TYPE' :value='model.legalentitytype' @input='model.legalentitytype = $event._id' :options='legalentitytype' :displayValue='displayPicklistItem' :matchValue='matchById' required></vue-select-extensible> -->
</template>

<script>
import Select from '@/components/select/select.vue';
import {BackendService} from '@/store/backend.service.js';
import {matchBy} from '@/services/utils.service.js';

export default {
  name: 'SenderSelect',
  data() {
    return {
      model: {
        receiver: ''
      },
      receivers: []
    };
  },
  methods: {
    getMatch() {
      return matchBy('_id');
    }
  },
  async created() {
    this.receivers = await BackendService.getAppData('sender');
  },
  components: {
    'vue-select': Select
  }
};
</script>
