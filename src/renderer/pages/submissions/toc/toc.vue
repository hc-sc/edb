<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-select id='treefilter' :label='$t("SEARCH_TREE")' :options='nodes' :displayValue='o => o.name' :matchValue='o => o._id' ></vue-select>

      <vue-tree :tree='currentTree' :getChildren='tree => tree.tocnode' :getLabel='tree => tree.nodename' :addable='addable' :onAdd='addNode'></vue-tree>

      <div class='bottom-float'>
        <vue-button type='button' @click.native='showTOCData'>{{$t('TOC_DATA')}}</vue-button>
      </div>
    </template>
  </main>
</template>

<script>
import Button from '@/components/button/button.vue';
import DocumentSelect from '@/pages/submissions/toc/document-select.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Progress from '@/components/progress/progress.vue';
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
      documents: [],
      nodes: []
    };
  },
  methods: {
    getComponent(ref) {
      return ref === 'tocdata' ? TOCData : DocumentSelect;
    },
    showTOCData() {
      this.showFormDialog('tocdata')
      .then(result => {console.log(result);})
      .catch(err => {console.error(err);})
      .then(this.$dialog.close());
    },
    addNode(tree) {
      if (!tree.tocnode || !tree.tocnode.length) {
        this.$set(tree, 'tocnode', []);
      }
      this.showFormDialog('document')
      .then(result => {
        tree.tocnode.push({nodename: 'hello'});
      })
      .catch(err => console.log(err))
      .then(this.$dialog.close());
    },
    addable(tree) {
      return tree.documentreferences;
    },
    setTree(node) {
      const tree = this.findNode(this.fullTree, node.tocnodepid);
      if (tree != null) {
        this.currentTree = tree;
      }
    },
    findNode(tree, pid) {
      if (tree.tocnodepid && tree.tocnodepid === pid) return tree;
      if (!('tocnode' in tree)) return null;
      for (let node of tree.tocnode) {
        const result = this.findNode(node, pid);
        if (result != null) return result;
      }
      return null;
    },
    mapNodes(list, tree) {
      list.push({name: tree.nodename, _id: tree.tocnodepid});
      if ('tocnode' in tree) tree.tocnode.forEach(node => this.mapNodes(list, node));
    }
  },
  // beforeCreate() {
  //   this.$store.commit('loading');
  // },
  // async created() {
  //   this.updateCurrentUrl('toc');
  //   this.resetForm();
  //   [this.toc, this.documents] = await Promise.all([
  //     (await BackendService.getAppData('toc'))[0],
  //     BackendService.callMethod('document', 'get', {_dossier: this.dossierid})
  //   ]);
  //   this.fullTree = this.currentTree = {nodename: 'TOC', tocnode: this.toc.structure.tocnode};
  //   this.$nextTick(() => {
  //     this.$store.commit('ready');
  //   });
  // },
  // watch: {
  //   fullTree() {
  //     this.nodes = this.mapNodes(this.nodes = [], this.fullTree);
  //   }
  // },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table,
    'vue-tree': Tree
  }
};
</script>