<template>
  <div role='tooltip' :id='id'>{{label}}</div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    id: {
      type: String,
    }
  }
};
</script>