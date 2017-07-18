<template>
    <vue-split-pane>
      <div slot='left-pane'>
        hello
      </div>
      <div slot='right-pane'>
        <h2>{{$tc('document', 2)}}</h2>
      </div>
    </vue-split-pane>
</template>

<script>
import SplitPane from '@/components/split-pane/split-pane.vue';
export default {
  name: 'Documents',
  components: {
    'vue-split-pane': SplitPane
  }
};
</script>
