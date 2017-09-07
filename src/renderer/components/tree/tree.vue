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
          {{tree.label}}
        </div>
        <div v-if='hasChildren' v-show='open'>
          <vue-tree v-for='(child, index) of tree.children' :key='index' :tree='child'>
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
    }
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    hasChildren() {
      return !!(this.tree.children && this.tree.children.length);
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
  beforeCreate() {
    if(!this.$options.components['vue-tree']) {
      this.$options.components['vue-tree'] = require('./tree.vue');
    }
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
</style>