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
            <i class='material-icons tree-icon' v-if='hasChildren' :class='{open}'>chevron_right</i>
            <i class='material-icons tree-icon' v-if='addable(tree)' @click='onAdd(tree)'>add</i>
            <!-- <i class='material-icons tree-icon' v-if='deletable(tree)'>delete</i> -->
          </span>
          {{label}}
        </div>
        <div v-if='hasChildren' v-show='open'>
          <vue-tree v-for='(child, index) of children' :key='index' :tree='child' :getChildren='getChildren' :getLabel='getLabel' :addable='addable' :onAdd='onAdd'>
          </vue-tree>
        </div>
      </li>
    </slot>
  </ul>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import {BackendService} from '@/store/backend.service.js';

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
      this.open ? this.collapse() : this.expand();
    },
    expand() {
      if (this.hasChildren) this.open = true;
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
    }
  },

  // for recursive components, need to load the reference
  beforeCreate() {
    if(!this.$options.components['vue-tree']) {
      this.$options.components['vue-tree'] = require('./tree.vue');
    }
  },

  async created() {
    try {
      this.documents = await BackendService.getAppData('document');
    }
    catch(err) {console.log(err);}
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
</style>