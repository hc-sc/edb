<docs>
## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions

</docs>

<template>
  <div class='toolbar' :class='[color, display]'>
    <span class='toolbar-left'>
      <slot name='left'></slot>
    </span>
    <span class='toolbar-middle'>
      <slot>
        <span>{{title}}</span>
      </slot>
    </span>
    <span class='toolbar-right'>
      <slot name='right'></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
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
    },
    display: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['main', 'normal', 'status'].includes(value);
      }
    }
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';
@import '../../assets/css/fonts.css';

.toolbar {
  display: flex;
  justify-content: center;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  font-weight: 300;
}

.toolbar > span {
  padding: 0 5px;
  line-height: inherit;
}

.toolbar > span:last-child {
  margin-left: auto;
}

.toolbar-middle {
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.toolbar.main {
  font-size: 2.5rem;
  line-height: 3rem;
}

.toolbar:not(.none) h1 {
  color: inherit;
}

.toolbar.status {
  font-size: .8rem;
  line-height: 1rem;
}
</style>