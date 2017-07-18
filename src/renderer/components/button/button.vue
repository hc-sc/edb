<docs>
## Button

Used for dynamic activity. It has a single default  slot for providing a custom label/icon, and falls back to the provided `label` prop.

### Inputs

- type (String): default 'button'. Native button types. Must be one of 'button', 'submit', or 'reset'.
- label (String): the display label used in case no transclusion is used.
- display (String): default = 'raised'. The form the button takes. Must be one of 'fab', 'flat', or 'raised', which follow Material Design.
- disabled (Boolean): whether the button is disabled
- color (String): default = 'primary'. The theme used. Must be one of 'primary', 'accent', 'info', 'warn', or 'error'
</docs>

<template>
    <button :type='type' class='btn' :class='[display, color]' :disabled='disabled'>
      <slot>
        <span>
          {{label}}
        </span>
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
    label: {
      type: String
    },
    display: {
      type: String,
      default: 'raised',
      validator(value) {
        return ['fab', 'flat', 'raised'].includes(value);
      }
    },
    disabled: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'accent', 'info', 'warn', 'error'].includes(value);
      }
    }
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.btn {
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 36px;
  padding: 0 1rem;
  text-transform: uppercase;
  transition: var(--out);
}

.btn.fab {
  box-shadow: var(--depth-3);
  border-radius: 100%;
  height: 44px;
  width: 44px;
  transition: var(--out);
}

.btn.fab:active {
  box-shadow: var(--depth-4);
  transition: var(--in);
}

.btn > i {
  transform: translate(-25%, 25%);
}

.btn.flat, .btn.raised {
  border-radius: 3px;
}

.btn.flat {
  background-color: inherit;
  box-shadow: var(--depth-0);
  color: inherit;
}

.btn.flat:hover {
  background: var(--hover-color);
  transition: var(--toggle);
}

.btn.flat.primary {
  color: var(--primary-color);
}

.btn.raised {
  box-shadow: var(--depth-1);
}

.btn.raised:active {
  box-shadow: var(--depth-3);
  transition: var(--toggle);
}

.btn[disabled] {
  cursor: not-allowed;
}

.btn.flat[disabled] {
  color: var(--disabled-text);
}

.btn.raised[disabled], .btn.fab[disabled] {
  box-shadow: none;
  background-color: var(--disabled-color);
  color: var(--disabled-text);
}
</style>
