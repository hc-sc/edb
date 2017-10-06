<template>
  <div>
    <vue-input type='text' id='dossiertitle' :label='$t("DOSSIER_DESCRIPTION_TITLE")' v-model='model.dossiertitle' required></vue-input>
    <vue-select id='regulatorycontents' :label='$t("REGULATORY_CONTENTS")' :options='tocs' :displayValue='o => o.tocshortname' :matchValue='matchById' @input='model.tocId = $event._id' :value='model.tocId' required></vue-select>
    <vue-select id='product' :label='$t("PRODUCT")' :options='products' :displayValue='o => o.genericproductname' :matchValue='matchById' @input='model.product = $event._id' :value='model.product' required></vue-select>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import {BackendService} from '@/store/backend.service.js';
import {model} from '@/mixins/model.js';

export default {
  name: 'NewDossier',
  mixins: [model],
  data() {
    return {
      model: {
        dossiertitle: '',
        tocId: '',
        product: ''
      },
      products: [],
      tocs: []
    };
  },
  async created() {
    this.products = await BackendService.getAppDataAll('product');
    this.tocs = await BackendService.getAppDataAll('toc');
  },
  components: {
    'vue-input': Input,
    'vue-select': Select
  }
};
</script>