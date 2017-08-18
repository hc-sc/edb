<template>
  <div>
    <slot :aria-labelledby='id'>ICON</slot>
    <vue-tooltip :id='id'></vue-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Icon'
};
</script>