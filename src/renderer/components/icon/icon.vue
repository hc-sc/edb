<template>
  <vue-tooltip class='icon' :id='id' :label='label' :position='position'>
    <button type='button' :disabled='disabled' :class='[{fab}, color]'>
      <slot>
        <i class='material-icons' :class='classes'>{{icon}}</i>
      </slot>
    </button>
  </vue-tooltip>
</template>

<script>
import Button from '@/components/button/button.vue';
import Icon from '@/components/icon/icon.vue';
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
    position: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    fab: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'accent', 'info', 'warn', 'error', 'none'].includes(value);
      }
    }
  },
  components: {
    'vue-button': Button,
    'vue-icon': Icon,
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

.icon .fab {
  border-radius: 50%;
  box-shadow: var(--depth-3);
  border-radius: 100%;
  height: 44px;
  width: 44px;
  transition: var(--out);
}

.icon .fab.primary {
  background-color: var(--primary-color);
  color: var(--primary-text);
}

.icon .fab:active {
  box-shadow: var(--depth-4);
  transition: var(--in);
}
</style>