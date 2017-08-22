<template>
  <vue-input type='text' id='identifier' :label='$tc("identifier")' v-model='model.identifier'><vue-input>
  <vue-select-extensible></vue-select-extensible>
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';

export default {
  name: 'OtherIdentifiers',
  data() {
    return {
      model: {}
    }
  },
  components: {
    'vue-input': Input,
    'vue-select-extensible': SelectExtensible
  }
}
</script>