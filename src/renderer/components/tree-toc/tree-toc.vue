<docs>
## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'. This is based off of the 'Tree' component

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'
- addable (Function, default = true): if you can add to the tree
- onAdd (Function, default = emit('add', value)): cb for add
- deletable (Function, default = true): if you can remove children
- onDelete (Function, default = splice): removes child
- getChildren (Function, default = tree.children): determines how to get a child array
- getLabel (Function, default = tree.label): determines how to get a tree's label

#### Data

- open (Boolean): if the children are visible

#### Computed

- label (String): function to retrieve the name of the node
- children (Array): function to retrieve the array of children
- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state
- expand(): open the tree children
- collapse(): collapses the trees children
- expandAll(): recurisevely expands all
- collapseAll(): recursively collapse all

</docs>

<template>
  <ul :id='name' class='tree-list'>
    <slot>
      <li class='tree-item'>
        <div @click='toggle'>
          <span>
            <i class='material-icons tree-icon' :style='{visibility: hasChildren || hasDocs ? "visible" : "hidden"}' :class='{open}'>chevron_right</i>
            <i class='material-icons tree-icon' :style='{visibility: addable(tree) ? "visible" : "hidden"}' @click='addDoc'>add</i>
          </span>
          {{label}}
          <span v-if='numDocs > 0'> [{{numDocs}}]</span>
        </div>
        <ul v-if='hasDocs' class='docs' v-show='open'>
          <li v-for='(doc, index) of docs' :key='index'>
            <div class='flex flex-row'>
              <i class='material-icons tree-icon' @click='deleteDoc(index)'>delete</i>
              <span>{{doc.document.documenttitle}}</span>
            </div>
          </li>
        </ul>
        <div v-if='hasChildren' v-show='open'>
          <vue-tree v-for='(child, index) of children' :key='child.tocnodepid' :tree='child' :getChildren='getChildren' :getLabel='getLabel' :addable='addable' :onAdd='onAdd' :onDelete='onDelete' @increment='incrementNumDocs' @decrement='decrementNumDocs'>
          </vue-tree>
        </div>
      </li>
    </slot>
  </ul>
</template>

<script>
import Icon from '@/components/icon/icon.vue';

/** Modified from VueJS examples page
 * http://optimizely.github.io/vuejs.org/examples/tree-view.html
 */
export default {
  name: `Tree`,
  props: {
    id: {
      type: String,
    },
    tree: {
      type: Object,
      required: true
    },
    addable: {
      type: Function,
      default() {
        return true;
      }
    },
    onAdd: {
      type: Function,
      default(value) {
        this.$emit('add', value);
      }
    },
    deletable: {
      type: Function,
      default() {
        return true;
      }
    },
    onDelete: {
      type: Function,
      default(tree, index) {
        this.getChildren(tree).splice(index, 1);
      }
    },
    getChildren: {
      type: Function,
      default(tree) {
        return tree.children;
      }
    },
    getLabel: {
      type: Function,
      default(tree) {
        return tree.label;
      }
    }
  },
  data() {
    return {
      open: false,
      numDocs: 0
    };
  },
  computed: {
    name() {
      return this.tree.nodename.replace(' ', '').toLowerCase();
    },
    children() {
      return this.getChildren(this.tree) || [];
    },
    label() {
      return this.getLabel(this.tree);
    },
    hasChildren() {
      return this.children && this.children.length > 0;
    },
    docs() {
      return this.tree.toc2doc || [];
    },
    hasDocs() {
      return this.docs && this.docs.length > 0;
    }
  },
  methods: {
    toggle() {
      this.open ? this.collapse() : this.expand();
    },
    expand() {
      if (this.hasChildren || this.hasDocs) this.open = true;
    },
    collapse() {
      this.open = false;
    },
    expandAll() {
      this.$children.forEach(child => child.expandAll());
      this.expand();
    },
    collapseAll() {
      this.$children.forEach(child => child.collapseAll());
      this.collapse();
    },

    async deleteDoc(index) {
      try {
        await this.onDelete(this.tree, index);
        if (this.docs.length === 0) this.collapse();
        this.$emit('decrement');
      }
      catch(err) {
        this.showMessage('SAVE_FAILURE');
        console.log(err);
      }
    },

    async addDoc() {
      try {
        await this.onAdd(this.tree);
        this.expand();
        this.$emit('increment');
      }
      catch(err) {
        console.error(err);
      }
    },
    incrementNumDocs() {
      ++this.numDocs;
      this.$emit('increment');
    },
    decrementNumDocs() {
      --this.numDocs;
      this.$emit('decrement');
    },

    initNumDocs() {
      this.numDocs = this.$children.reduce((total, child) => {
        return total += child.initNumDocs();
      }, this.docs.length);
    },

    getNumDocs() {
      this.numDocs = this.$children.reduce((total, child) => {
        return total += child.numDocs;
      }, this.docs.length);
    }
  },

  watch: {
    'tree.tocname': () => {
      console.log('here');
      this.getNumDocs();
    },
    numDocs() {
      this.getNumDocs();
    }
  },

  // for recursive components, need to load the reference
  beforeCreate() {
    if(!this.$options.components['vue-tree']) {
      this.$options.components['vue-tree'] = require('./tree-toc.vue');
    }
  },

  mounted() {
    this.getNumDocs();
    if (this.tree.isRoot) {
      this.$emit('mounted');
    }
  },

  updated() {
    this.getNumDocs();
  },

  components: {
    'vue-icon': Icon
  }
};
</script>

<style>
.tree-item {
  cursor: pointer;
}

.tree-list {
  padding-left: 1rem;
  line-height: 1.5rem;
  list-style-type: none;
}

.tree-icon {
  vertical-align: bottom;
  transform: rotate(0);
  transition: .1s ease;
}

.tree-icon.open {
  transform: rotate(90deg);
}

.docs {
  margin-left: 20px;
  list-style: none;
}
</style>