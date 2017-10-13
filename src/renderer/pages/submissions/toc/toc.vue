<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-select id='treefilter' :label='$t("SEARCH_TREE")' :options='[]' :displayValue='o => o.nodeName' :matchValue='o => o.nodeName' ></vue-select>

      <vue-tree :tree='currentTree' :getChildren='tree => tree.tocnode' :getLabel='tree => tree.nodename' :addable='addable' :onAdd='addNode'></vue-tree>

      <div class='bottom-float'>
        <vue-button type='button' @click.native='showTOCData'>{{$t('TOC_DATA')}}</vue-button>
      </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import TOCData from '@/pages/submissions/toc/toc-data.vue';
import Tree from '@/components/tree/tree.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'TOC',
  mixins: [model],
  data() {
    return {
      toc: {label: 'TOC', children: []},
      fullTree: {},
      currentTree: {},
      documents: []
    };
  },
  methods: {
    getComponent() {
      return TOCData;
    },
    showTOCData() {
      this.showFormDialog('toc')
      .then(result => {console.log(result);})
      .catch(err => {console.error(err);})
      .then(this.$dialog.close());
    },
    addNode(tree) {
      if (!tree.tocnode || !tree.tocnode.length) {
        this.$set(tree, 'tocnode', []);
      }
      tree.tocnode.push({nodename: 'hello'});
    },
    addable(tree) {
      return tree.documentreferences;
    }
  },
  beforeCreated() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('toc');
    this.resetForm();
    this.toc = (await BackendService.getAppData('toc'))[0];
    this.currentTree = {nodename: 'TOC', tocnode: this.toc.structure.tocnode};
    this.$store.commit('ready');
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table,
    'vue-tree': Tree
  }
};
</script>