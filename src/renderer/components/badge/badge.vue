<template>
  <div :class='[color]'>
    <span>
      <slot>{{value}}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  functional: true,
  props: {
    color: {
      type: String,
      validator(value) {
        return ['primary', 'accent', 'info', 'warn', 'error', 'none'].includes(value);
      }
    },
    value: {
      type: String
    }
  }
};
</script>