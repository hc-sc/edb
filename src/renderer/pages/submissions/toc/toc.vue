<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-select id='treefilter' :label='$t("SEARCH_TREE")' :options='nodes' :displayValue='o => o.name' :matchValue='matchBy("_id")' ></vue-select>

      <vue-tree :tree='currentTree' :getChildren='tree => tree.tocnode' :getLabel='tree => tree.nodename' :addable='addable' :onAdd='addNode' :onDelete='deleteNode'></vue-tree>

      <div class='bottom-float'>
        <vue-button type='button' @click.native='showTOCData()'>{{$t('TOC_DATA')}}</vue-button>
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
import Tree from '@/components/tree-toc/tree-toc.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {matchBy} from '@/services/utils.service.js';


export default {
  name: 'Toc',
  mixins: [model],
  data() {
    return {
      toc: {},
      fullTree: {},
      currentTree: {},
      documents: [],
      nodes: []
    };
  },
  methods: {
    matchBy,

    getComponent(ref) {
      return ref === 'tocdata' ? TOCData : DocumentSelect;
    },

    showTOCData() {
      this.showFormDialog('tocdata', this.toc)
      .then(result => {console.log(result);})
      .catch(err => {console.error(err);})
      .then(() => this.$dialog.close());
    },

    addable(tree) {
      return tree.documentreferences;
    },

    addNode(tree) {
      if (!tree.toc2doc) {
        this.$set(tree, 'toc2doc', []);
      }
      this.showFormDialog('document')
      .then(async result => {
        if (result) {
          let document = this.documents.find(doc => result._id == doc._id);

          if (!document) {
            this.showMessage(this.$t('ERROR'));
            console.err('Couldn\'t find matching document');
            return;
          }

          // don't allow duplicates
          if (tree.toc2doc.findIndex(doc => doc._id === document._id) >= 0) {
            this.showMessage(this.$t('DUPLICATE_DOCUMENTS'));
          }
          else {
            let nodeData = {
              _url: 'toc',
              data: {
                tocnodepid: tree.tocnodepid,
                docid: document._id
              }
            };

            try {
              await BackendService.createGhsts(nodeData);
              tree.toc2doc.push({
                document: {
                  _id: document._id,
                  documenttitle: document.documentgeneric.documenttitle
                }
              });
            }
            catch(err) {
              this.showMessage(this.$t('SAVE_ERROR'));
              console.error(err);
            }
          }
        }
      })
      .catch(err => console.log(err))
      .then(() => this.$dialog.close());
    },

    deletable() {
      return true;
    },

    async deleteNode(tree, index) {
      try {
        let result = await BackendService.deleteGhsts({
          url: 'toc',
          data: {
            tocnodepid: tree.tocnodepid,
            docid: tree.toc2doc._id
          }
        });
        tree.toc2doc.splice(index, 1);
      }
      catch(err) {
        this.showMessage(this.$t('SAVE_ERROR'));
        console.error(err);
      }
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

  beforeCreate() {
    this.$store.commit('loading');
  },

  async created() {
    this.updateCurrentUrl('toc');
    this.resetForm();

    // NOTE: remove documents from here, unless we pass it into the
    // documents dialog
    [this.toc, this.documents] = await Promise.all([
      (await BackendService.getGhsts({url: 'toc'}))[0],
      await BackendService.callMethod('document', 'get', {_dossier: this.dossierid})
    ]);
    this.fullTree = this.currentTree = {nodename: 'TOC', tocnode: this.toc.structure.tocnode};
    this.$nextTick(() => {
      this.$store.commit('ready');
    });
  },

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