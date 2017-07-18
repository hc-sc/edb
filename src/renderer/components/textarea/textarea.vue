<template>
  <div class='textarea-group' @focusout='touched = true'>
    <textarea class='textarea-field' :class='{empty, invalid}' :id='id' :name='compName' v-model='value' @input='resize' :required='required' :disabled='disabled'></textarea>
    <label :for='id' :class='{"error-text": invalid}'>
      {{label}}
      <span v-if='required' class='error-text'> *</span>
    </label>
    <div class='textarea-info'>
      <small v-if='max' class='textarea-char-count' :class='[value.length > max ? "error-text" : ""]'>
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
      }
    },
    data() {
      return {
        value: '',
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
      resize(event) {
        if (this.autoresize) {
          event.target.style.overflowY = 'hidden';
          event.target.style.height = 'auto';
          event.target.style.height = event.target.scrollHeight + 'px';
        }
      },

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

.textarea-char-count {
  position: absolute;
  right: 3px;
  top: 0;
}

.textarea-char-count.error-text {
  animation: pop .2s;
  transform-origin: center center;
}

</style>
