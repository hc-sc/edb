<template>
  <main class='pane'>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
      <div class='f-container f-cross-start'>
        <vue-button class='input-prefix' @click.native='assignPID("productpid")'>{{$t('generatepid')}}</vue-button>
        <span class='f-gap'></span>
        <vue-input type='text' id='productpid' :label='$t("productpid")' v-model='model.productpid' required :pattern='getValidPIDRegExp()'></vue-input>
      </div>
      <vue-input id='genericproductname' :label='$t("genericproductname")' v-model='model.genericproductname' required :max='255'></vue-input>
      <vue-select-extensible id='formulationtype' :label='$t("formulationtype")' :options='formulationtype' :value='model.formulationtype' @input='model.formulationtype = $event._id' :matchValue='matchById' typeName='EXTENSION_TYPE_FORMULATION_TYPE' :displayValue='displayPicklistItem' required></vue-select-extensible>
      <vue-table id='ingredients' :title='$t("ingredients")' :items='model.ingredients.ingredient' :headers='[{name: "toSubstanceId", url: "substance"}, "quantity", {name: "unit", url: "picklist"}]' :displayHeader='displayTranslation' @select='selectTableItem("ingredient", model.ingredients.ingredient[$event], $event)' addable @add='addTableItem("ingredients.ingredient")' @action='handleAction($event, model.ingredients.ingredient)'></vue-table>
      <vue-table id='productras' :title='$t("REGULATORY_AUTHORITY_PRODUCT_INFORMATION")' :items='model.productra' :headers='[{name: "toSpecificForRAId", url: "legalentity"}, "productname"]' :displayHeader='displayTranslation' @select='selectTableItem("productra", model.productra[$event], $event)' addable @add='addTableItem("productra")' @action='handleAction($event, model.productra)'></vue-table>
    </div>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("product")' id='save' :label='$t("save")' icon='save' position='top' :disabled='currentRecord == null'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Dialog from '@/components/dialog/dialog.vue';
import Icon from '@/components/icon/icon.vue';
import Ingredients from '@/pages/globals/products/ingredients.vue';
import Input from '@/components/input/input.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import ProductRA from '@/pages/submissions/product/product-ra.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapGetters} from 'vuex';

export default {
  name: 'Products',
  mixins: [model],
  data() {
    return {
      model: {...this.getEmptyModel('product')},
    };
  },
  computed: {
    ...mapGetters('picklists', ['formulationtype'])
  },
  methods: {
    getComponent(compName) {
      console.log(compName);
      return compName === 'productra' ? ProductRA : Ingredients;
    }
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('product');
    this.resetForm();
    try {
      let model = (await BackendService.getAppData('product', {_id: this.ghsts._product}))[0];
      this.updateCurrentRecord(this.mergeModelAndRecord(this.getEmptyModel('product'), model));
      this.mapStateToModel();
    }
    catch(err) {console.log(err);}
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-dialog': Dialog,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-table': Table,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane
  }
};
</script>
