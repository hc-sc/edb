<template>
  <div>
    <vue-select id='referencetype' :label='$t("referencetype")' :options='referencetype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.referencetype' @input='model.referencetype = $event._id' required></vue-select>

    <vue-switch id='internal' :label='$t("internal")' v-model='model.internal'></vue-switch>

    <vue-input type='text' id='documentpid' :label='$t("documentpid")' v-model='model.documentpid' required></vue-input>

    <vue-select id='documentnumbertype' :label='$t("documentnumbertype")' :options='documentnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.documentnumber.documentnumbertype' @input='model.documentnumber.documentnumbertype = $event._id' required></vue-select>

    <vue-input type='text' id='identifier' :label='$t("identifier")' v-model='model.documentnumber.identifier' required></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Switch from '@/components/switch/switch.vue';
import {model} from '@/mixins/model.js';
import {mapGetters} from 'vuex';

export default {
  name: 'ReferencedDocument',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('documentgeneric.referenceddocument')
    };
  },
  computed: {
    ...mapGetters('picklists', ['referencetype', 'documentnumbertype'])
  },
  components: {
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-switch': Switch
  }
};
</script>