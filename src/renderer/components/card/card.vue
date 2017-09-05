<template>
  <div class='card' :class='{hover}'>
    <slot name='top'></slot>
    <slot></slot>
    <slot name='bottom'></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: String
    },
    hover: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/animations.css';

.card {
  box-shadow: var(--depth-1);
  border-radius: 2px;
  transition: var(--toggle);
  margin-bottom: 12px;
}

.card.hover:hover {
  box-shadow: var(--depth-3);
  transition: var(--toggle);
}
</style>
