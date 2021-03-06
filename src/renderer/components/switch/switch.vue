<docs>
## Switch

Used to represent on/off toggles

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- checked (Boolean, required): the state of the checkbox
- showValues (Boolean, default = true): if the on/off values should be shown
- on-value (String, default = 'true'): the on value text
- off-value (String, default = 'false'): the off value text
- disabled (Boolean, default = false): if it is interactive
- value (String): the value passed down
- cb (Function, default = emit('change')): cb for click
- required (Boolean): if the field is required

#### Data

- on (Boolean): the state of the checkbox

#### Computed

- displayValue (String): the on/off value
</docs>

<template>
  <div class='switch'>
    <div class='switch-group'>
      <input type='checkbox' class='switch-checkbox' :id='id' @keydown.space='cb(value)'  :value='value' :disabled='disabled' :checked='checked' @change='cb()'>
      <label :for='id'>
        <div class='switch-background' aria-hidden='true'>
          <div class='switch-knob'></div>
        </div>
        {{label}}
        <span class='error-text' v-if='required'> *</span>
        <span v-if='showValues'>({{displayValue}})</span>
      </label>
    </div>
  </div>
</template>

<script>
/** Based off of https://material-components-web.appspot.com/switch.html */
export default {
  name: 'Switch',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    },
    showValues: {
      type: Boolean,
      default: true
    },
    'on-value': {
      type: String,
      default: 'true'
    },
    'off-value': {
      type: String,
      default: 'false'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
    },
    cb: {
      type: Function,
      default() {
        this.$emit('change', !this.checked);
      }
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      on: this.checked
    };
  },
  computed: {
    displayValue() {
      return this.checked ? this.onValue : this.offValue;
    }
  },
  watch: {
    value() {
      this.checked = this.value;
    }
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';
@import '../../assets/css/animations.css';

/* modified from the switch component of material.io
https://material-components-web.appspot.com/switch.html
 */
.switch {
  display: block;
}

.switch-group {
  position: relative;
  padding: .5rem 0 1rem 10px;
}

.switch-checkbox {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 20px;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
}

.switch-background {
  display: inline-block;
  position: relative;
  width: 34px;
  height: 14px;
  border-radius: 7px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: .09s var(--fast-out-slow-in);
}

.switch-background::before {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 7px;
  background-color: #000;
  content: '';
  opacity: .38;
  transition: .09s var(--fast-out-slow-in);
}

.switch-checkbox,
.switch-checkbox[disabled] + label,
.switch-checkbox[disabled] + label .switch-background {
  color: var(--disabled-text);
  cursor: not-allowed;
}

.switch-checkbox:checked + label .switch-background {
  background-color: var(--primary-color);
  opacity: 1;
  transition: opacity .09s var(--fast-out-slow-in), background-color .09s var(--fast-out-slow-in);
}

.switch-checkbox:checked + label .switch-background::before {
  opacity: 0;
  transition: .09s var(--fast-out-slow-in);
}

.switch-knob {
  display: block;
  position: absolute;
  top: -3px;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fafafa;
  box-shadow: var(--depth-1);
  z-index: 1;
  transform: translateX(0);
  transition: .2s var(--fast-out-slow-in);
}

.switch-checkbox + label .switch-knob::before {
  content: '';
  position: absolute;
  top: -14px;
  left: -14px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: transparent;
  opacity: .2;
  transform: scale(0);
  transition: var(--toggle);
}

.switch-checkbox:focus + label .switch-knob::before {
  opacity: 1;
  transform: scale(1);
  background-color: rgba(0, 0, 0, .12);
  transition: var(--toggle);
}

.switch-checkbox:checked + label .switch-background > .switch-knob {
  transform: translateX(15px);
  transition: .2s var(--fast-out-slow-in);
}

.switch-checkbox:active + label .switch-background > .switch-knob {
  box-shadow: var(--depth-3);
}

</style>