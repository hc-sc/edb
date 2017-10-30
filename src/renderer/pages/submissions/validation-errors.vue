<template>
  <ul>
    <li v-for='(error, index) of errors' :key='index'>
      {{error}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    mappedErrors() {

    }
  }
};
</script>