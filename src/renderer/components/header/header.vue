<docs>
## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections. For use as toolbars, see the Toolbar component

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)

</docs>

<template>
  <header class='header'>
    <slot name='superheader'></slot>
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