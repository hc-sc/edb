<template>
  <vue-select id='tosubstanceid' :label='$t("substancename")' :options='substances' :displayValue='su => su.substancename' :matchValue='matchById' :value='model.toSubstanceId' @input='model.toSubstanceId = $event._id' required></vue-select>
</template>

<script>
import Select from '@/components/select/select.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'RelatedToSubstance',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('documentgeneric.relatedtosubstance'),
      substances: []
    };
  },
  async created() {
    this.substances = await BackendService.getAppData('substance');
  },
  components: {
    'vue-select': Select
  }
};
</script>