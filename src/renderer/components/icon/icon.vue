<docs>
## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)

</docs>

<new>
<template>
  <span>
    <slot>
      <i class='material-icons'>{{icon}}</i>
    </slot>
  </span>
</template>
</new>

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
import Icon from '@/components/icon/icon.vue';
import Tooltip from '@/components/tooltip/tooltip.vue';

export default {
  name: 'Icon',
  props: {
    id: {
      type: String,
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
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
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