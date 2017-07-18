<template>
  <div class='switch'>
    <label :for='id'>{{label}}</label>
    <div class='switch-group'>
      <input v-model='value' type='checkbox' class='switch-checkbox' :id='id'>
      <div class='switch-background'>
        <div class='switch-knob'></div>
      </div>
      <span v-if='show'>{{displayValue}}</span>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {
      value: false
    };
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

.switch-checkbox:checked ~ .switch-background {
  background-color: var(--primary-color);
  opacity: 1;
  transition: opacity .09s var(--fast-out-slow-in), background-color .09s var(--fast-out-slow-in);
}

.switch-checkbox:checked ~ .switch-background::before {
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

.switch-checkbox:checked ~ .switch-background > .switch-knob {
  transform: translateX(15px);
  transition: .2s var(--fast-out-slow-in);
}

.switch-checkbox:active ~ .switch-background > .switch-knob {
  box-shadow: var(--depth-3);
}

</style>
