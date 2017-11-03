<template>
  <div>
    <vue-input type='text' id='referenceddossiernumber' :label='$t("referenceddossiernumber")' v-model='model.referenceddossiernumber' required :max='255'></vue-input>
    <vue-textarea id='referenceddossierreason' :label='$t("referenceddossierreason")' v-model='model.referenceddossierreason' required :max='2000'></vue-textarea>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Textarea from '@/components/textarea/textarea.vue';
import {model} from '@/mixins/model.js';

export default {
  name: 'ReferencedDossier',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('referenceddossier')
    };
  },
  components: {
    'vue-input': Input,
    'vue-textarea': Textarea
  }
};
</script>
