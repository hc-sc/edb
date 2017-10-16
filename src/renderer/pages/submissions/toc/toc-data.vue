<template>
  <div>
    <vue-input type='text' id='shortname' :label='$t("tocshortname")' v-model='model.tocshortname' disabled></vue-input>
    <vue-input type='text' id='owner' :label='$t("tocowner")' v-model='model.tocowner' disabled></vue-input>
    <vue-input type='text' id='fullname' :label='$t("tocfullname")' v-model='model.tocfullname' disabled></vue-input>
    <vue-input type='text' id='version' :label='$t("tocversion")' v-model='model.tocversion' disabled></vue-input>
    <vue-fieldset :legend='$t("standardtocreference")'>
      <vue-input type='text' id='standardtocpid' v-model='model.standardtocreference.standardtocpid' disabled></vue-input>
      <vue-input type='text' id='filename' :label='$t("filename")' v-model='model.standardtocreference.filename' disabled></vue-input>
    </vue-fieldset>
  </div>
</template>

<script>
import Fieldset from '@/components/fieldset/fieldset.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import {model} from '@/mixins/model.js';
import {mapGetters} from 'vuex';

export default {
  name: 'TocData',
  mixins: [model],
  data() {
    return {
      model: this.getEmptyModel('toc')
    };
  },
  computed: {
    ...mapGetters('picklists', ['tocowner'])
  },
  components: {
    'vue-fieldset': Fieldset,
    'vue-input': Input,
    'vue-select': Select
  }
};
</script>