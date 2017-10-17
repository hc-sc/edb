<template>
  <vue-select id='documents' :label='$t("documents")' :options='documents' :displayValue='o => o.documentgeneric.documenttitle' :matchValue='matchBy("_id")' :value='documentpid' @input='documentpid = $event._id' required></vue-select>
</template>

<script>
import Select from '@/components/select/select.vue';
import {BackendService} from '@/store/backend.service.js';
import {matchBy} from '@/services/utils.service.js';

export default {
  name: 'Document',
  data() {
    return {
      documentpid: '',
      documents: []
    };
  },
  methods: {
    matchBy
  },
  async created() {
    try {
      this.documents = await BackendService.callMethod('document', 'get', {_dossier: this.dossierid});
    }
    catch(err) {
      console.log(err);
    }
  },
  components: {
    'vue-select': Select
  }
};
</script>