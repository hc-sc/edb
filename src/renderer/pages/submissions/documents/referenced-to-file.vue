<template>
  <vue-select id='referencedtofile' :label='$t("FILENAME")' :options='files' :displayValue='file => file.filename' :matchValue='matchById'></vue-select>
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
      model: {
        file: ''
      },
      files: []
    };
  },
  async created() {
    try {
      this.files = await BackendService.getAppData('file');
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