<docs>
## Chips

For lists of short texts, with easy add, sort, and delete functionality

### Values

#### Props

- id (String, required): the id
- required (Boolean): if at least one chip is required
- value (Array, default = []): the chips
- disabled (Boolean, default = false): if you can edit the list
- deletable (Boolean, default = true): if you can delete the chips
- editable (Boolean, default = true): if you can edit the chips
- unique (Boolean, default = true): can add more than one of the same chip
- sortable (Boolean, default = true): can sort the chips
- onSort (Function, default = sort): what to do when sort is activated
- clearable (Boolean, default = true): can clear chips
- onClear (Function): what to do when clear is activated
- autocomplete (String, default = 'off'): whether to include a datalist of options
- options (Array, default = []): the options to include in the datalist
- type (String, default = 'text'): the type of input field
- novalidate: (Boolean, default = true): whether the input field should be validatable
- label (String): the label
- maxChips (Number, default = Infinity): the maximum number of chips
- maxChipLength (Number, default = Infinity): maxlength of the input

#### Data

- currentChip (String): the current text for an entering chip
- chips (Array): copied array of the value props
- selectedIndex (Number): the currently selected chip
- touched (Boolean): if the chip has received focused
- focused (Boolean): if the chip currently has focus

#### Computed

- invalid (Boolean): if the chip has been touched, and is valid
- compName (String): the name or id
- compLabel (String): the label

### Methods

- applyInputFocus: focused on the input field
- addChip: adds a chip if valid
- deleteChip: deletes a chip if valid
- editChip: removes a chip, and enters its value into the input field
- deleteLastChip: removes the last chip
- getIndex: finds the index of the chip argument
- focusOut: removes focus from the chip, and sets touched


</docs>

<template>
  <div @focusout='focusOut' class='chips-wrapper'>
    <div class='chips' @click='applyInputFocus'>
      <div class='chip-list' :class='{invalid, focused, disabled}'>
        <vue-chip v-for='(chip, index) in chips' :key='index' :id='`${id}-chip-${index}`' :editable='editable' :deletable='deletable' :disabled='disabled' @select='selectChip(chip)' @edit='editChip(chip)' @delete='deleteChip(chip)'>
          <slot name='chip' :value='chip'>{{chip}}</slot>
        </vue-chip>
        <label :for='`${id}-input`' class='v-hidden'>{{label}}</label>
        <input :id='`${id}-input`' class='chip-input' v-model='currentChip'  :name='compName' :disabled='disabled' @keydown.delete.stop='deleteLastChip' @keydown.prevent.stop.enter='addChip' @keydown.prevent.stop.186='addChip' tabindex='0' :maxlength='maxChipLength' :novalidate='novalidate' ref='input' :placeholder='compLabel'>
      </div>
      <slot></slot>
      <div class='chip-actions' v-if='!disabled' :aria-controls='id' role='toolbar'>
        <slot name='actions'>
          <vue-icon icon='sort' :label='$t("sort")' v-if='sortable' @click.native='onSort' position='left' :id='`${id}-sort`'></vue-icon>
          <vue-icon icon='clear' :label='$t("clear")' @click.native='onClear' position='left' :id='`${id}-clear`'></vue-icon>
        </slot>
      </div>
      <slot name='options'>
        <datalist :id='`${id}-options`' v-if='autocomplete'>
          <option v-for='(option, index) of options' :key='index'>{{option}}</option>
        </datalist>
      </slot>
    </div>
    <p v-if='!focused && currentChip.length' class='error-text'>{{$t('UNENTERED_CHIP')}}</p>
    <p v-if='invalid' class='error-text'>{{$t('REQUIRED')}}</p>
  </div>
</template>

<script>
/** Modified from vue-material chips https://github.com/vuematerial/vue-material/blob/master/src/components/mdChips/mdChips.vue */

import Button from '@/components/button/button.vue';
import Chip from '@/components/chips/chip.vue';
import Icon from '@/components/icon/icon.vue';
import {sortByLocale} from '@/services/utils.service.js';

export default {
  name: 'Chips',
  props: {
    id: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    unique: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
    onSort: {
      type: Function,
      default() {
        this.$emit('input', sortByLocale(this.chips));
      }
    },
    clearable: {
      type: Boolean,
      default: true
    },
    onClear: {
      type: Function,
      default() {
        this.$emit('input', []);
      }
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator(value) {
        return ['on', 'off'].includes(value);
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'number', 'email', 'date', 'tel'].includes(value);
      }
    },
    novalidate: {
      type: Boolean,
      default: true
    },
    label: {
      type: String
    },
    maxChips: {
      type: Number,
      default: Infinity
    },
    maxChipLength: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      currentChip: '',
      chips: this.value,
      selectedIndex: -1,
      touched: false,
      focused: false
    };
  },
  computed: {
    invalid() {
      return this.touched && this.required && this.chips.length === 0;
    },

    compName() {
      return this.name || this.id;
    },

    compLabel() {
      return `${this.label}${this.required ? ' *' : ''} (chip)`;
    }
  },
  methods: {
    applyInputFocus() {
      this.focused = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    addChip() {
      if (this.currentChip && this.chips.length < this.maxChips && this.currentChip.length > 0) {
        const value = this.currentChip.trim();

        if (!this.unique || this.chips.indexOf(value) < 0) {
          this.chips.push(value);
          this.currentChip = '';
          this.$emit('input', this.chips);
          this.applyInputFocus();
        }
      }
    },

    deleteChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.$emit('input', this.chips);
      this.applyInputFocus();
    },

    editChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.currentChip = chip;
      this.$emit('input', this.chips);
      this.applyInputFocus();
    },

    deleteLastChip() {
      if (!this.currentChip) {
        this.chips.pop();
        this.$emit('input', this.chips);
        this.applyInputFocus();
      }
    },

    getIndex(chip) {
      return this.chips.indexOf(chip);
    },

    focusOut() {
      this.touched = true;
      this.focused = false;
    }
  },
  watch: {
    value(value) {
      this.chips = value;
    }
  },
  components: {
    'vue-button': Button,
    'vue-chip': Chip,
    'vue-icon': Icon
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';

.chips-wrapper {
  margin-bottom: 5px;
}

.chips {
  width: 100%;
  box-shadow: none;
  outline: none;
  padding-bottom: px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  transition: .2s ease-in;
  min-height: 2rem;
}

.chip-list {
  width: 100%;
  list-style-type: none;
  margin-bottom: 3px;
  box-shadow: none;
  padding-bottom: 3px;
  border-bottom: 1px solid var(--divider);
}

.chip-list.focused {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
  transition: var(--toggle);
}

.chip-list.invalid {
  border-bottom: 1px solid var(--error-color);
  box-shadow: 0 1px 0 0 var(--error-color);
  transition: var(--toggle);
}

.chip-list.disabled {
  border-bottom: 1px dashed var(--disabled-color);
  transition: var(--toggle);
}

.chip-list.disabled.invalid {
  border-bottom: 1px dashed var(--error-color);
  transition: var(--toggle);
}

.chip-actions {
  display: flex;
  flex-direction: flex-row;
  flex-wrap: nowrap;
}

.chip-input {
  padding-top: 6px;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: inherit;
  min-width: 300px;
}

.chip-input::-webkit-placeholder {
  color: var(--label-text);
}

.chip-input:-moz-placeholder {
  color: var(--label-text);
}

.chip-input:-ms-input-placeholder {
  color: var(--label-text);
}
</style>