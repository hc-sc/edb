<docs>
## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar

</docs>

<template>
  <nav :id='id'>
    <slot>
      <vue-button display='flat' v-if='toggleable' :aria-expanded='expanded' :aria-controls='id' @click.native='toggle'>Menu</vue-button>
      <ul class='nav-list' :hidden='toggleable && !expanded'>
        <vue-nav-item v-for='(nav, index) of navs' :key='`${id}-${index}`' :id='id' :nav='nav' :depth='0'></vue-nav-item>
      </ul>
    </slot>
  </nav>
</template>

<script>
/* modified from https://inclusive-components.design/menus-menu-buttons/
*/

import Button from '@/components/button/button.vue';
import NavItem from './nav-item.vue';

export default {
  name: 'Nav',
  props: {
    id: {
      type: String,
      required: true
    },
    toggleable: {
      type: Boolean,
      default: false
    },
    navs: {
      type: Array,
      default: () => []
    },
    column: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }
  },
  components: {
    'vue-button': Button,
    'vue-nav-item': NavItem
  }
};
</script>

<style>
.nav-list {
  display: flex;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  background-color: inherit;
  flex-wrap: wrap;
  list-style-type: none;
}

.nav-list.column {
  flex-direction: column;
}

.nav-list[hidden] {
  display: none;
}

.nav-item {
  display: inline-block;
  line-height: 2.5rem;
  text-transform: uppercase;
  /* flex-grow: 1; */
}

.nav-item > a {
  padding: 0 7px 0 5px;
  border-bottom: 2px solid transparent;
  display: block;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: var(--primary-text-light);
  overflow: hidden;
  text-overflow: ellipsis;
  transition: .2s var(--fast-out-linear-in);
}

.nav-item > a.router-link-exact-active, .nav-item > a:target {
  border-bottom: 2px solid var(--primary-color);
  transition: .2s var(--linear-out-slot-in);
}
</style>