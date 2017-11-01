<template>
  <div>
    <vue-select id='referencedtofile' :label='$t("filename")' :options='files' :displayValue='getFilename' :matchValue='matchById' :value='model.toFileId' @input='model.toFileId = $event._id'></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';
import {BackendService} from '@/store/backend.service.js';
import {model} from '@/mixins/model.js';

export default {
  name: 'ReferencedToFile',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('documentgeneric.referencedtofile'),
      files: []
    };
  },
  methods: {
    getFilename(file) {
      return file.filegeneric.filename.split('/').pop();
    }
  },
  async created() {
    try {
      this.files = await BackendService.callMethod('file', 'get', {_dossier: this.dossierid});
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