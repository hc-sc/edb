<template>
  <div>
    <vue-textarea type='text' id='dossiertitle' :label='$t("dossierdescriptiontitle")' v-model='model.dossiertitle' required :max='2000'></vue-textarea>
    <vue-select id='regulatorycontents' :label='$t("REGULATORY_CONTENTS")' :options='tocs' :displayValue='o => o.tocshortname' :matchValue='matchById' @input='model.tocId = $event._id' :value='model.tocId' required></vue-select>
    <vue-select id='product' :label='$t("product")' :options='products' :displayValue='o => o.genericproductname' :matchValue='matchById' @input='model.product = $event._id' :value='model.product' required></vue-select>
  </div>
</template>

<script>
import Select from '@/components/select/select.vue';
import Textarea from '@/components/textarea/textarea.vue';
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
    this.products = this.products.filter(product => {
      console.log(product);
      return !('dossier' in product);
    });
    this.tocs = await BackendService.getAppDataAll('toc');
  },
  components: {
    'vue-select': Select,
    'vue-textarea': Textarea
  }
};
</script>