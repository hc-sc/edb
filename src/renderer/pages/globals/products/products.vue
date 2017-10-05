<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='selectListItem' :items='records' :displayValue='displayDefaultFilterListItem' :label='$t("search")' sortByArgs='genericproductname' :selectedItem='currentRecord'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
        <template v-if='shouldShowFields()'>
          <div class='f-container f-cross-start'>
            <vue-button class='input-prefix' @click.native='assignPID("productpid")'>generate</vue-button>
            <span class='f-gap'></span>
            <vue-input type='text' id='productpid' :label='$t("PRODUCT_PID")' v-model='model.productpid' required disabled></vue-input>
          </div>
          <vue-input id='genericproductname' :label='$t("GENERIC_PRODUCT_NAME")' v-model='model.genericproductname' required :max='255'></vue-input>
          <vue-select-extensible id='formulationtype' :label='$t("FORMULATION_TYPE")' :options='formulationtype' :value='model.formulationtype' @input='model.formulationtype = $event._id' :matchValue='matchById' typeName='EXTENSION_TYPE_FORMULATION_TYPE' :displayValue='displayPicklistItem'></vue-select-extensible>
          <vue-table id='ingredients' :title='$t("INGREDIENTS")' :items='model.ingredients.ingredient' :headers='[{name: "toSubstanceId", url: "substance"}, "quantity", {name: "unit", url: "picklist"}]' :displayHeader='displayTranslation' @select='selectTableItem("ingredients", model.ingredients.ingredient[$event], $event)' addable @add='addItem("ingredients")'></vue-table>
        </template>
        <template v-else>
          {{$t('noitems')}}
        </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("product")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' @click.native='add("product")'></vue-icon>
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
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
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
    getComponent() {
      return Ingredients;
    }
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.resetForm('product');
    await this.$store.dispatch('app/getAppDataAll', {url: 'product', sortBy: 'genericproductname'});
    this.selectListItem(this.records[0], false);
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
