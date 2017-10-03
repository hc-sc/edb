<template>
  <div class='switch'>
    <div class='switch-group'>
      <input :value='value' type='checkbox' class='switch-checkbox' :id='id' @keydown.space='cb(value)' :disabled='disabled'>
      <label :for='id' @click='cb(value)' >
        <div class='switch-background' aria-hidden='true'>
          <div class='switch-knob'></div>
        </div>
        {{label}}
        <span v-if='show'>({{displayValue}})</span>
      </label>
    </div>
  </div>
</template>

<script>
/** Based off of https://material-components-web.appspot.com/switch.html */
export default {
  name: 'Switch',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    'on-value': {
      type: String,
      default: 'on'
    },
    'off-value': {
      type: String,
      default: 'off'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      required: true
    },
    cb: {
      type: Function,
      default(value) {
        this.$emit('input', !value);
      }
    }
  },
  computed: {
    displayValue() {
      return this.value ? this.onValue : this.offValue;
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
  display: inline-block;
}

.switch-group {
  position: relative;
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
  color: var(--disabled-color);
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