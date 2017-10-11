<template>
  <vue-select id='receiver' :options='receivers' :label='$tc("receiver", 2)' :displayValue='o => o.shortname' :value='model.receiver.toLegalEntityId' @input='model.receiver = $event' :matchValue='matchBy("_id")'></vue-select>
</template>

<script>
import Select from '@/components/select/select.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {matchBy} from '@/services/utils.service.js';

export default {
  name: 'ReceiverSelect',
  mixins: [model],
  data() {
    return {
      model: {
        receiver: this.getEmptyModel('receiver')
      },
      receivers: []
    };
  },
  methods: {
    matchBy
  },
  async created() {
    this.receivers = await BackendService.getAppDataAll('receiver');
  },
  components: {
    'vue-select': Select
  }
};
</script>
