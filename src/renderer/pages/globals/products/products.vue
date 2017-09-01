<template>
  <main>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='products' :displayValue='se => se.name' :label='$t("search")' sortByArgs='product'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
         <template v-if='products && products.length'>
          <h1>products</h1>
         </template>
         <template v-else>
           {{$t('noitems')}}
         </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("product")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
    </template>
  </main>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Icon from '@/components/icon/icon.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import Progress from '@/components/progress/progress.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import {mapState, mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';

export default {
  name: 'Products',
  mixins: [model],
  computed: {
    ...mapState(['loading']),
    ...mapState('app', {
      products(state) {
        return state.appRecords || [];
      }
    }),
    ...mapGetters('picklists', [

    ])
  },
  methods: {
    select() {}
  },
  async beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    await this.$store.dispatch('app/getAppDataAll', 'product');
    this.select(this.products[0]);
    this.$store.commit('ready');
  },
  components: {
    'vue-dialog': Dialog,
    'vue-icon': Icon,
    'vue-list-filter': ListFilter,
    'vue-progress': Progress,
    'vue-split-pane': SplitPane
  }
};
</script>
