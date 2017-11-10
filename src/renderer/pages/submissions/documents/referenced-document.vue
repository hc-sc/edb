<template>
  <div>
    <vue-select id='referencetype' :label='$t("referencetype")' :options='referencetype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.referencetype' @input='model.referencetype = $event._id' required></vue-select>

    <vue-switch id='internal' :label='$t("internal")' v-model='model.internal'></vue-switch>

    <vue-fieldset :legend='$t("REFERENCE_IDENTIFIER")'>
      <!-- <vue-switch id='usePID' :label='$t("identifier")' v-model='model._pidreference' onValue='PID' offValue='document number'></vue-switch> -->

      <!-- <div v-if='model._pidreference'> -->
        <vue-input type='text' id='documentpid' :label='$t("documentpid")' v-model='model.documentpid' required :pattern='getValidPIDRegExp()'></vue-input>
      <!-- </div> -->

      <!-- <div v-else> -->
        <vue-select-extensible id='documentnumbertype' :label='$t("documentnumbertype")' :options='documentnumbertype' :displayValue='displayPicklistItem' :matchValue='matchById' :value='model.documentnumber.documentnumbertype' @input='model.documentnumber.documentnumbertype = $event._id' required></vue-select-extensible>

        <vue-input type='text' id='identifier' :label='$t("identifier")' v-model='model.documentnumber.identifier' required :max='255'></vue-input>
      <!-- </div> -->
    </vue-fieldset>
  </div>
</template>

<script>
import Fieldset from '@/components/fieldset/fieldset.vue';
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
    'vue-fieldset': Fieldset,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-switch': Switch
  }
};
</script>