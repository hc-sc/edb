<template>
  <vue-tooltip class='icon-wrapper' :id='id' :label='label'>
    <button type='button'>
      <slot>
        <i class='material-icons' :class='classes'>{{icon}}</i>
      </slot>
    </button>
  </vue-tooltip>
</template>

<script>
import Button from '@/components/button/button.vue';
import Tooltip from '@/components/tooltip/tooltip.vue';

export default {
  name: 'Icon',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    classes: {
      type: String
    },
    icon: {
      type: String
    }
  },
  components: {
    'vue-button': Button,
    'vue-tooltip': Tooltip
  }
};
</script>

<style>
.icon-wrapper {
  position:relative;
}

.icon-wrapper > button {
  background-color: transparent;
  outline: none;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>