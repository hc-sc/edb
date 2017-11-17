<template>
  <div>
    <vue-select id='regulatoryauthorityfield' :label='$t("receiver")' :options='ras' :displayValue='ra => ra.shortname' :matchValue='matchBy("_id")' :value='model.toSpecificForRAId' @input='model.toSpecificForRAId = $event._id' required></vue-select>

    <vue-switch id='cbidesignation' :label='$t("cbidesignation")' v-model='model.cbidesignation' required></vue-switch>

    <vue-textarea id='filecomment' :label='$t("filecomment")' v-model='model.filecomment' :max='2000'></vue-textarea>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import Switch from '@/components/switch/switch.vue';
import Textarea from '@/components/textarea/textarea.vue';
import {model} from '@/mixins/model.js';
import {mapActions} from 'vuex';

export default {
  name: 'FileRA',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('filera'),
      ras: []
    };
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
    'vue-input': Input,
    'vue-select': Select,
    'vue-switch': Switch,
    'vue-textarea': Textarea
  }
};
</script>