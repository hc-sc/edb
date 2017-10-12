<template>
  <div>
    <vue-input type='text' id='referenceddossiernumber' :label='$t("referenceddossiernumber")' v-model='model.referenceddossiernumber' required></vue-input>
    <vue-input type='text' id='referenceddossierreason' :label='$t("referenceddossierreason")' v-model='model.referenceddossierreason' required></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
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
    'vue-input': Input
  }
};
</script>
