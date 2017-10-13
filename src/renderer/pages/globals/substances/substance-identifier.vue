<template>
  <div class='page' id='substanceidentifier' ref='substanceidentifier'>
    <vue-select-extensible id='substanceidentifiertype' :label='$t("substanceidentifiertype")' :options='substanceidentifiertype' :value='model.substanceidentifiertype' @input='model.substanceidentifiertype = $event._id' :matchValue='matchById' typeName='EXTENSION_TYPE_SUBSTANCE_IDENTIFIER_TYPE' :displayValue='displayPicklistItem'></vue-select-extensible>
    <vue-input id='identifier' :label='$t("substanceidentifier")' v-model='model.identifier' :max='255'></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';

export default {
  name: 'SubstanceIdentifier',
  mixins: [model],
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
