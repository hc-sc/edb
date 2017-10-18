<template>
  <vue-select id='sender' :options='senders' :label='$tc("sender", 2)' :displayValue='o => o._shortname' :value='model._id' @input='model = $event' :matchValue='matchBy("_id")'></vue-select>
</template>

<script>
import Select from '@/components/select/select.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {matchBy} from '@/services/utils.service.js';

export default {
  name: 'SenderSelect',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('sender'),
      senders: []
    };
  },
  methods: {
    matchBy
  },
  async created() {
    this.senders = await BackendService.getAppDataAll('sender');
  },
  components: {
    'vue-select': Select
  }
};
</script>
