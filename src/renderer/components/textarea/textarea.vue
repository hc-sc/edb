<docs>
## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- inputEvent(value: String): calls cb and resize
- resize(): resize the box to the height of the text content
- reset(): resets the textarea

</docs>

<template>
  <div class='textarea-group' @focusout='touched = true'>
    <textarea ref='input' class='textarea-field' :class='{empty, invalid}' :id='id' :name='compName' :value='value' @input='inputEvent($event)' :required='required' :disabled='disabled'></textarea>
    <label :for='id' :class='{"error-text": invalid}'>
      {{label}}
      <span v-if='required' class='error-text'> *</span>
    </label>
    <div class='textarea-info'>
      <small v-if='max' class='textarea-info-right' :class='[value.length > max ? "error-text" : ""]'>
        {{value.length}}/{{max}}
      </small>
      <p class='error-text' v-if='required && touched && this.value.length === 0'>Required</p>
      <p class='error-text' v-if='touched && !validLength'>Invalid length</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Textarea',
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
      },
      label: {
        type: String,
        required: true
      },
      required: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      max: {
        type: Number
      },
      autoresize: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
      },
      cb: {
        type: Function,
        default(value) {
          this.$emit('input', value);
        }
      }
    },
    data() {
      return {
        touched: false
      };
    },
    computed: {
      compName() {
        return this.name || this.id;
      },
      empty() {
        return this.value.length === 0;
      },
      invalid() {
        return this.touched && (!this.validLength || this.required && this.value.length === 0);
      },
      validLength() {
        if (this.max && this.value.length > this.max) return false;
        return true;
      }
    },
    methods: {
      inputEvent(event) {
        this.cb(event.target.value);
      },
      resize() {
        let input = this.$refs.input;
        input.style.overflowY = 'hidden';
        input.style.height = 'auto';
        input.style.height = `${input.scrollHeight}px`;
      },
      reset() {
        this.touched = false;
        if (this.autoresize) this.resize();
      }
    },
    mounted() {
      if (this.autoresize) this.resize();
    },
    updated() {
      if (this.autoresize) this.resize();
    }
  };
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.textarea-group {
  position: relative;
  min-height: 2.5rem;
  padding: 1.2rem 0 1rem 0;
  width: 100%;
}

.textarea-field {
  width: 100%;
  padding-bottom: 2px;
  background-color: inherit;
  resize: none;
  display: block;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--divider);
  box-shadow: none;
  height: auto;
  font-size: 1rem;
  transition: .2s var(--fast-out-slow-in);
}

.textarea-field + label {
  color: var(--label-text);
  cursor: text;
  position: absolute;
  top: 0;
  font-size: 1rem;
  transform-origin: left;
  transition: .2s var(--fast-out-slow-in);
}

.textarea-field[disabled] {
  border-bottom: 1px dotted var(--divider);
  cursor: not-allowed;
}

.textarea-field[disabled] + label {
  color: var(--disabled-text);
  cursor: not-allowed;
}

.textarea-field:focus {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
}

.textarea-field.invalid,
body:not(.js) .textarea-field:invalid {
  border-bottom: 1px solid var(--error-color);
}

.textarea-field.invalid:focus,
.textarea-field.invalid:active,
body:not(.js) .textarea-field:focus:invalid,
body:not(.js) .textarea-field:active:invalid {
  border-bottom: 1px solid var(--error-color);
  box-shadow: 0 1px 0 0 var(--error-color);
}

.js .textarea-field + label {
  transform: scale(1) translateY(1rem);
}

.js .textarea-field:focus + label, .js .textarea-field:not(.empty) + label {
  transform: scale(.7) translateY(0);
}

.textarea-info {
  position: relative;
}

.textarea-info-right, .textarea-info-left {
  position: absolute;
  top: 0;
  transition: .1s var(--fast-in-slow-out);
}

.textarea-info-left {
  left: 5px;
}

.textarea-info-right {
  right: 5px;
}

.textarea-info small.error-text {
  animation: pop .2s;
  transform-origin: center center;
}

</style>