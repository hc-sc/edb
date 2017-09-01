<template>
  <header class='header'>
    <vue-toolbar :title='title' :color='color' display='main'>
      <span slot='left'>
        <slot name='left'></slot>
      </span>
      <span>
        <slot></slot>
      </span>
      <span slot='right'>
        <slot name='right'></slot>
      </span>
    </vue-toolbar>
    <slot name='subheader'></slot>
  </header>
</template>

<script>
import Toolbar from '@/components/toolbar/toolbar.vue';

export default {
  name: 'Header',
  props: {
    title: {
      type: String
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'accent', 'info', 'warn', 'error', 'none'].includes(value);
      }
    }
  },
  components: {
    'vue-toolbar': Toolbar
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';

.header {
  flex: 0;
  border: none;
  box-shadow: var(--depth-1);
  z-index: 1000;
}
</style>
