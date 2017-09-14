<template>
  <div class='page' id='substanceidentifier' ref='substanceidentifier'>
    <vue-select-extensible id='substanceidentifiertype' :label='$t("substanceidentifiertype")' :options='substanceidentifiertype' :value='model.substanceidentifiertype' @input='assignNestedValue("substanceidenfifiertype", $event)'></vue-select-extensible>
    <vue-input id='substanceidentifier' :label='$t("SUBSTANCE_IDENTIFIER")' v-model='model.substanceidentifier' :max='255'></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'SubstanceIdentifier',
  data() {
    return {
      model: this.getEmptyModel()
    };
  },
  computed: {
    ...mapGetters('picklists', ['substanceidentifiertype'])
  },
  methods: {
    getEmptyModel() {
      return {
        substanceidentifiertype: {},
        identifier: ''
      };
    }
  },
  components: {
    'vue-input': Input,
    'vue-select-extensible': SelectExtensible
  }
};
</script>