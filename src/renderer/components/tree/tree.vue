<docs>
## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- label (String): function to retrieve the name of the node
- children (Array): function to retrieve the array of children
- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state

</docs>

<template>
  <ul :id='tree' class='tree-list'>
    <slot>
      <li class='tree-item'>
        <div @click='toggle'>
          <span>
            <span @click='add'>+</span>
          </span>
          {{label}}
        </div>
        <div v-if='hasChildren' v-show='open'>
          <vue-tree v-for='(child, index) of children' :key='index' :tree='child' :getChildren='getChildren' :getLabel='getLabel'>
          </vue-tree>
        </div>
      </li>
    </slot>
  </ul>
</template>

<script>
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
    onAdd: {
      type: Function,
      default(value) {
        this.$emit('add', value);
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
    };
  },
  computed: {
    children() {
      return this.getChildren(this.tree) || [];
    },
    label() {
      return this.getLabel(this.tree);
    },
    hasChildren() {
      return !!(this.children && this.children.length);
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    add() {
      this.$emit('add');
    }
  },

  // for recursive components, need to load the reference
  beforeCreate() {
    if(!this.$options.components['vue-tree']) {
      this.$options.components['vue-tree'] = require('./tree.vue');
    }
  },
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
</style>