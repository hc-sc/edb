<template>
  <vue-input type='text' id='identifier' :label='$tc("identifier", 1)' v-model='model.identifier'></vue-input>
  <!-- <vue-select-extensible></vue-select-extensible> -->
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';

export default {
  name: 'LegalEntityIdentifier',
  data() {
    return {
      model: {
        ...this.getEmptyModel()
      }
    };
  },
  methods: {
    getEmptyModel() {
      return {
        identifier: '',
        legalentityidentifiertype: {}
      };
    }
  },
  components: {
    'vue-input': Input,
    'vue-select-extensible': SelectExtensible
  }
};
</script>