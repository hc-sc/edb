<docs>
## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- tabindex (Number): the tab index of the input
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label

</docs>

<template>
  <div class='input f-container' @focusout='touched = true'>
    <div class='input-group'>
      <template v-if='isTextField'>
        <div>
          <input class='input-field' :class='{empty, invalid}' :type='type' :id='id' :name='compName' @input='cb($event.target.value)' :value='value' :required='required' :disabled='disabled' :tabindex='tabindex'>
          <label :for='id'>
            <slot>
              {{label}}
            </slot>
            <span v-if='required' class='error-text'>*</span>
          </label>
          <div class='input-info' v-if='showErrors'>
            <small v-if='isTextField && max' class='input-info-right' :class='[value.length > max ? "error-text" : ""]'>
              {{value.length}}/{{max}}
            </small>
            <p class='error-text' v-if='required && touched && this.value.length === 0'>Required</p>
            <p class='error-text' v-if='touched && !validBounds'>Invalid length</p>
            <p class='error-text' v-if='touched && !validPattern'>{{message | errorMessage}}</p>
          </div>
        </div>
      </template>

      <template v-else-if='type === "number"'>
        <input type='number' :id='id' :name='compName' class='input-field' @input='cb($event.target.value)' :value='value' :class='{empty}' :min='min' :max='max' :tabindex='tabindex' :disabled='disabled'>
        <label :for='id'>
          {{label}}<span v-if='required' class='error-text'> *</span>
        </label>
        <div class='input-info' v-if='showErrors'>
          <p class='error-text' v-if='required && touched && this.value.length === 0'>Required</p>
          <p class='error-text' v-if='touched && !validBounds'>Invalid value</p>
        </div>
      </template>

      <template v-else-if='type === "range"'>
        <div class='input-range'>
          <div class='input-range-group'>
            <input type='range' :id='id' :name='compName' class='input-field' @input='cb($event.target.value)' :value='value' :min='min || 0' :max='max || 100' :required='required' :disabled='disabled' :tabindex='tabindex'>
            <label :for='id'>{{label}}</label>
            <div class='input-info'>
              <small class='input-info-left'>{{min || 0}}</small>
              <small class='input-info-right'>{{max || 100}}</small>
            </div>
          </div>
          <div class='input-range-value'>
            {{value || '-'}}
          </div>
        </div>
      </template>

      <template v-else-if='type === "checkbox"'>
        <input type='checkbox' :id='id' :name='compName' @change='cb(!value)' :value='value' :required='required' :disabled='disabled' :tabindex='compTab'>
        <label :for='id'>{{label}}</label>
      </template>

      <template v-else-if='type === "radio"'>
        <input type='radio' :id='id' :name='compName' @change='cb(id)' :value='id' :required='required' :disabled='disabled' :tabindex='compTab'>
        <label :for='id'>{{label}}</label>
      </template>

      <template v-else-if='type === "date"'>
        <input type='date' :id='id' :name='compName' class='input-field' @input='cb($event.target.value)' :value='toDate(value)' :min='toDate(min)' :max='toDate(max)' :required='required' :disabled='disabled' :tabindex='compTab'>
        <label :for='id'>
          {{label}}<span v-if='required' class='error-text'> *</span>
        </label>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'email', 'password', 'url', 'tel', 'range', 'number', 'checkbox', 'radio', 'date'].includes(value);
      }
    },
    name: {
      type: String,
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    pattern: {
      type: RegExp
    },
    message: {
      type: String
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    value: {
      type: String | Boolean | Number | Boolean,
      default: ''
    },
    cb: {
      type: Function,
      default(value) {
        this.$emit('input', value);
      }
    },
    tabindex: {
      type: Number
    }
  },
  data() {
    return {
      touched: false,
    };
  },
  computed: {
    compName() {
      return this.name || this.id;
    },
    compTab() {
      return this.tabindex === 0 ? false : this.tabindex;
    },
    isTextField() {
      return (
        ['text', 'email', 'password', 'url', 'tel'].includes(this.type)
      );
    },
    empty() {
      return this.value == null || this.value.length === 0;
    },
    invalid() {
      return this.touched && (
        !this.validBounds ||
        !this.validPattern ||
        (this.required && this.value.length === 0)
      );
    },
    validBounds() {
      if (this.isTextField) {
        if (this.max && this.value.length > this.max) return false;
      }
      if (this.type === 'number') {
        if ((this.max && this.value > this.max) || (this.min && this.value < this.min)) return false;
      }
      return true;
    },
    validPattern() {
      if (this.isTextField && this.pattern) {
        return this.pattern.test(this.value);
      }
      return true;
    }
  },
  methods: {
    toDate(value) {
      if (!moment(value, [moment.ISO_8601], true).isValid()) return;
      return moment(value).format('YYYY-MM-DD');
    },
    reset() {
      this.cb('');
      this.touched = false;
    }
  },
  filters: {
    errorMessage(message) {
      return message ? message : 'Invalid pattern';
    }
  }
};

</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.input {
  display: flex;
  width: 100%;
}

.input-group {
  position: relative;
  min-height: 2.5rem;
  padding: 1.2rem 0 1rem 0;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.input-prefix {
  margin-top: .4rem;
}

.input-field {
  width: 100%;
  padding-bottom: 2px;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid var(--divider);
  box-shadow: none;
  outline: none;
  font-size: 1rem;
  overflow: hidden;
  transition: .2s var(--fast-out-linear-in);
}

.input-field + label {
  cursor: text;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  filter: blur(0);
  transform-origin: left;
  transition: .2s var(--linear-out-slow-in);
}

.input-field[disabled] {
  border-bottom: 1px dotted var(--divider);
  cursor: not-allowed;
}

.input-field[disabled] + label {
  color: var(--disabled-text);
  cursor: not-allowed;
}

.input-field:focus {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color)
}

.input-field.invalid,
.input-field[type=date]:invalid,
.input-field[type=number]:invalid,
body:not(.js) .input-field:invalid {
  border-bottom: 1px solid var(--error-color);
}

.input-field.invalid:focus,
.input-field[type=date]:invalid:focus,
.input-field[type=number]:invalid:focus,
.input-field.invalid:active,
.input-field[type=date]:invalid:active,
.input-field[type=number]:invalid:active,
body:not(.js) .input-field:focus:invalid,
body:not(.js) .input-field:active:invalid {
  border-bottom: 1px solid var(--error-color);
  box-shadow: 0 1px 0 0 var(--error-color)
}

.input-field.invalid + label,
.input-field[type=number]:invalid + label {
  color: var(--error-color);
}

.js .input-field + label {
  transform: scale(1) translate3d(0, 1rem, 0);
}

.js .input-field:focus + label,
.js .input-field:not(.empty) + label,
.input-field[type=number]:invalid + label {
  transform: scale(.7) translate3d(0, 0, 0);
}

.input-info {
  position: relative;
}

.input-info-right, .input-info-left {
  position: absolute;
  top: 0;
  transition: .1s var(--fast-in-slow-out);
}

.input-info-left {
  left: 5px;
}

.input-info-right {
  right: 5px;
}

.input-info small.error-text {
  animation: pop .2s;
  transform-origin: center center;
}

input[type=date] {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--divider);
  font-size: 1rem;
}

input[type=date] + label {
  position: absolute;
  top: 0;
  left: 0;
  transform: none;
}

.input-group [type=checkbox], .input-group [type=radio] {
  padding: 5px;
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  border: none;
}

.input-group [type=checkbox] ~ label, .input-group [type=radio] ~ label {
  font-size: 1rem;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
}

.input-group [type=checkbox][disabled] ~ label, .input-group [type=radio][disabled] ~ label {
  cursor: not-allowed;
  color: var(--disabled-text);
}

.input-group [type=radio] ~ label::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 16px;
  height: 16px;
  border: 2px solid var(--divider);
  border-radius: 50%;
}

.input-group [type=radio] ~ label::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px 0 0 4px;
  width: 8px;
  height: 8px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: transparent;
  transform: scale(0);
  transition: .2s ease;
}

.input-group [type=radio]:checked ~ label::before {
  border-color: var(--primary-color);
}

.input-group [type=radio]:checked ~ label::after {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  transform: scale(0.8);
  transition: .2s ease;
}

.input-group [type=radio]:focus ~ .radio-button {
  position: absolute;
  border-radius: 50%;
  top: 6px;
  left: -14px;
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.12);
}

/* The box */
.input-group [type=checkbox] + label::before {
  content: '';
  position: absolute;
  top: 0;
  left: 6px;
  margin: 0;
  width: 16px;
  height: 16px;
  border: 2px solid var(--divider);
  transition: .2s ease;
}

.input-group [type=checkbox]:checked + label::before {
  width: 8px;
  border: none;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  transform: rotate(40deg) translate(-2px, 1px);
  transform-origin: bottom right;
  transition: .2s ease;
}

/* The outline */
.input-group [type=checkbox] + label::after {
  content: '';
  position: absolute;
  top: -14px;
  left: -8px;
  width: 48px;
  height: 48px;
  margin: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .12);
  opacity: 0;
  transform: scale(0);
  transition: var(--toggle);
}

.input-group [type=checkbox]:focus + label::after {
  opacity: 1;
  transform: scale(1);
  transition: var(--toggle);
}


/* Ranges, modified from http://danielstern.ca/range.css/#/ */

/* Don't apply label transitions to ranges*/
.js .input-field[type=range] + label {
  transform: none;
}

.input-range {
  display: flex;
  align-items: center;
}

.input-range-group {
  width: 100%;
}

.input-range-value {
  background-color: var(--primary-color);
  color: var(--primary-text);
  border-radius: 4px;
  padding: 5px;
  margin: 0 4px;
  text-align: center;
}

.input-group [type=range] {
  -webkit-appearance: none;
  width: calc(100% - 10px);
  margin-left: 5px;
  border: none;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  z-index: -1;
}

.input-group [type=range]::-webkit-slider-runnable-track {
  width: 100%;
  box-sizing: content-box;
  border-top: 10px solid white;
  border-bottom: 10px solid white;
  height: 2px;
  cursor: pointer;
  background-color: var(--divider);
  border-radius: 2px;
  margin: 0 auto;
  transition: .2s var(--fast-out-linear-in);
}

.input-group:hover [type=range]::-webkit-slider-runnable-track, .input-group [type=range]:focus::-webkit-slider-runnable-track {
  background-color: var(--primary-color);
  transition: .2s var(--linear-out-slow-in);
}

.input-group [type=range]::-webkit-slider-thumb {
  box-sizing: content-box;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -.38rem;
}

.input-group [type=range]:active::-webkit-slider-thumb {
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
}

.input-group [type=range]::-moz-range-track {
  width: 100%;
  box-sizing: content-box;
  height: 2px;
  border-top: 10px solid white;
  border-bottom: 10px solid white;
  cursor: pointer;
  background-color: var(--divider);
  border-radius: 2px;
  transition: .2s var(--fast-out-linear-in);
}

.input-group:hover [type=range]::-moz-range-track {
  background-color: var(--primary-color);
  transition: .2s var(--linear-out-slow-in);
}

.input-group [type=range]::-moz-range-thumb {
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -.38rem;
}

.input-group [type=range]:active::-moz-range-thumb {
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
}

.input-group [type=range]::-ms-track {
  width: 100%;
  box-sizing: content-box;
  border-top: 10px solid white;
  border-bottom: 10px solid white;
  height: 2px;
  cursor: pointer;
  background-color: var(--divider);
  border-radius: 2px;
  margin: 0 auto;
  transition: .2s var(--fast-out-linear-in);
}

.input-group:hover [type=range]::-ms-track {
  background-color: var(--primary-color);
  transition: .2s var(--linear-out-slow-in);
}

.input-group [type=range]::-ms-thumb {
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -.38rem;
}

.input-group [type=range]:active::-ms-thumb {
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
}
</style>