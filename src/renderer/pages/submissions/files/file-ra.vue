<template>
  <div>
    <vue-select id='regulatoryauthorityfield' :label='$tc("REGULATORY_AUTHORITY", 1)' :options='ras' :displayValue='ra => ra.legalentityname' :matchValue='matchBy("_id")' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>
    <vue-switch id='cbidesignation' :label='$t("cbidesignation")' v-model='model.cbidesignation'></vue-switch>
    <vue-input id='filecomment' :label='$t("filecomment")' v-model='model.filecomment'></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import Switch from '@/components/switch/switch.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'FileRA',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('filera'),
      ras: []
    };
  },
  async created() {
    try {
      this.ras = await BackendService.getAppData('legalentity');
    }
    catch(err) {console.log(err);}
  },
  components: {
    'vue-input': Input,
    'vue-select': Select,
    'vue-switch': Switch
  }
};
</script>