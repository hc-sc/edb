<template>
  <div class='page' id='substanceidentifier' ref='substanceidentifier'>
    <vue-select id='substance' :label='$t("SUBSTANCE")' :options='substances' :value='model.toSubstanceId' @input='model.toSubstanceId = $event._id' :displayValue='i => i.valuedecode' :matchValue='matchById'></vue-select>
    <vue-input type='number' id='quantity' :label='$t("quantity")' v-model='model.quantity' required></vue-input>
    <vue-select-extensible id='unit' :label='$t("unit")' :options='unit' :value='model.unit' @input='model.unit = $event._id' typeName='EXTENSION_TYPE_UNIT' :matchValue='matchById' :displayValue='displayPicklistItem'></vue-select-extensible>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import {mapGetters} from 'vuex';
import {BackendService} from '@/store/backend.service.js';
import {model} from '@/mixins/model.js';

export default {
  name: 'Ingredients',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel(),
      substances: []
    };
  },
  computed: {
    ...mapGetters('picklists', ['unit'])
  },
  async created() {
    let subs = await BackendService.getAppDataAll('substance');
    this.substances = subs && subs.length ? subs : [];
  },
  methods: {
    getEmptyModel() {
      return {
        toSubstanceId: '',
        quantity: 0,
        unit: {}
      };
    }
  },
  components: {
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible
  }
};
</script>
