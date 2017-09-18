<template>
  <div>
    <vue-input type='text' id='identifier' :label='$tc("identifier", 1)' v-model='model.identifier' :max='255' required></vue-input>
    <vue-select-extensible id='legalentityidentifiertype' :label='$t("legalentityidentifiertype")' :value='model.legalentityidentifiertype' @input='model.legalentityidentifiertype = $event._id' :options='legalentityidentifiertype'  :matchValue='matchById' :displayValue='displayPicklistItem' typeName='EXTENSION_TYPE_LEGALENTITY_IDENTIFIER_TYPE'></vue-select-extensible>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';

export default {
  name: 'LegalEntityIdentifier',
  mixins: [model],
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
  computed: {
    ...mapGetters('picklists', [
      'legalentityidentifiertype'
    ])
  },
  components: {
    'vue-input': Input,
    'vue-select-extensible': SelectExtensible
  }
};
</script>