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
