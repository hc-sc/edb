<template>
  <li class='nav-item'>
    <router-link :id='nav.id || nav.label' :to='nav.path'>
      {{nav.label}}
      <span v-if='nav.children'>▼</span>
    </router-link>
    <ul class='nav-list'>
      <vue-nav-item v-for='(child, index) of nav.children' :key='`${depth}-${index}`' :id='id' :nav='child' :depth='depth + 1'></vue-nav-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    id: {
      type: String,
      required: true
    },
    nav: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: true
    }
  },
  beforeCreate() {
    this.$options.components['vue-nav-item'] = require('./nav-item.vue');
  }
};
</script>
