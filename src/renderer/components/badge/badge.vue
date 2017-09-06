<docs>
## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed

</docs>

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
      default: 'none',
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