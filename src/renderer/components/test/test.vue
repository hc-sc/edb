<template>
  <ul>
    <li class='item' v-for='(item, index) of items' :key='index'>{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Test',
  props: {
    items: {
      type: Array
    }
  },
  mounted: function() {
    const nodes = Array.from(this.$el.querySelectorAll('.item'));
    nodes.forEach(node => {
      node.textContent += ' test';
    });
  }
};
</script>
