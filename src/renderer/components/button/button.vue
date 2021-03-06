<docs>
## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- icon (Boolean, default = false): if the button is an icon
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button

</docs>

<template>
    <button :type='type' class='btn' :class='[{icon}, display, color]' :disabled='disabled'>
      <slot>
        {{label}}
      </slot>
    </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value);
      }
    },
    icon: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    display: {
      type: String,
      default: 'raised',
      validator(value) {
        return ['flat', 'raised', 'fab'].includes(value);
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'accent', 'info', 'warn', 'error', 'none'].includes(value);
      }
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.btn {
  white-space: nowrap;
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 36px;
  padding: 0 1rem;
  text-transform: uppercase;
  border: 2px solid transparent;
  transition: var(--out);
}

.btn.icon {
  padding: 0;
  line-height: 0;
}

.btn.flat, .btn.raised {
  border-radius: 3px;
}

.btn.flat {
  box-shadow: var(--depth-0);
}

.btn.flat:hover {
  background: var(--hover-color);
  transition: var(--toggle);
}

.btn.flat:focus {
  border: 2px solid var(--primary-color);
}

.btn.flat.primary {
  color: var(--primary-color);
  background-color: var(--primary-text);
}

.btn.raised {
  box-shadow: var(--depth-1);
}

.btn.raised:active {
  box-shadow: var(--depth-3);
  transition: var(--toggle);
}

.btn.raised:focus {
  background-color: var(--primary-color-light);
  color: var(--primary-text-light);
}

.btn[disabled] {
  cursor: not-allowed;
}

.btn.flat[disabled] {
  color: var(--disabled-text);
}

.btn.raised[disabled] {
  box-shadow: none;
  background-color: var(--disabled-color);
  color: var(--disabled-text);
}

.btn.fab {
  border-radius: 50%;
  padding: 0;
}

.btn.none {
  background-color: inherit;
  color: inherit;
  transition: none;
}
</style>