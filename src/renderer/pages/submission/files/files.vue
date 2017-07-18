<template>
  <vue-split-pane>
    <div slot='right-pane'>
      <h2>{{$tc("file", 2)}}</h2>
    </div>
  </vue-split-pane>
</template>

<script>
import SplitPane from '@/components/split-pane/split-pane.vue';

export default {
  name: 'Files',
  components: {
    'vue-split-pane': SplitPane
  }
};
</script>
