<template>
  <vue-input type='text' id=''></vue-input>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';

export default {
  name: 'NewDossier',
  data() {
    return {
      model: {
        dossiertitle: '',
        regulatorycontents: undefined,
        product: undefined
      }
    };
  },
  components: {
    'vue-input': Input,
    'vue-select': Select
  }
};
</script>