<template>
  <vue-tooltip class='icon' :id='id' :label='label'>
    <button type='button' :disabled='disabled'>
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
    },
    disabled: {
      type: Boolean
    }
  },
  components: {
    'vue-button': Button,
    'vue-tooltip': Tooltip
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
.icon {
  position:relative;
}

.icon > button {
  background-color: transparent;
  outline: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.icon [disabled] {
  color: var(--disabled-text);
  cursor: not-allowed;
}
</style>