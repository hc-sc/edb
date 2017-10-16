<template>
  <div>
    <vue-select-extensible id='documentnumbertype' :label='$t("documentnumbertype")' :options='documentnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.documentnumbertype' @input='model.documentnumbertype = $event._id' typeName='EXTENSION_TYPE_DOCUMENT_NUMBER_TYPE' required></vue-select-extensible>
    <vue-input type='text' id='identifier' :label='$t("identifier")' v-model='model.identifier' required></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {model} from '@/mixins/model.js';
import {mapGetters} from 'vuex';

export default {
  name: 'DocumentNumber',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('documentgeneric.documentnumber'),
    };
  },
  computed: {
    ...mapGetters('picklists', ['documentnumbertype'])
  },
  components: {
    'vue-input': Input,
    'vue-select-extensible': SelectExtensible
  }
};
</script>