<template>
  <div @focusout='focusOut' class='chips-wrapper'>
    <div class='chips' @click='applyInputFocus'>
      <div class='chip-list' :class='{invalid, focused, disabled}'>
        <vue-chip v-for='(chip, index) in chips' :key='index' :id='`${id}-chip-${index}`' :editable='editable' :deletable='deletable' :disabled='disabled' @select='selectChip(chip)' @edit='editChip(chip)' @delete='deleteChip(chip)'>
          <slot name='chip' :value='chip'>{{chip}}</slot>
        </vue-chip>
        <label :for='`${id}-input`' class='v-hidden'>{{label}}</label>
        <input :id='`${id}-input`' class='chip-input' v-model='currentChip'  :name='compName' :disabled='disabled' @keydown.delete.stop='deleteLastChip' @keydown.prevent.stop.enter='addChip' @keydown.prevent.186='addChip' tabindex='0' :maxlength='maxChipLength' :novalidate='novalidate' ref='input' :placeholder='compLabel'>
      </div>
      <slot></slot>
      <div class='chip-actions' v-if='!disabled' :aria-controls='id' role='toolbar'>
        <slot name='actions'>
          <vue-icon icon='sort' :label='$t("sort")' v-if='sortable' @click.native='onSort'position='left' :id='`${id}-sort`'></vue-icon>
          <vue-icon icon='clear' :label='$t("clear")' @click.native='onClear' position='left' :id='`${id}-clear`'></vue-icon>
          <!-- <vue-button v-if='sortable' @click.native='onSort' display='flat' color='none' icon>
            <i class='material-icons'>sort</i>
          </vue-button>
          <vue-button @click.native='onClear' display='flat' icon color='none'>
            <i class='material-icons'>clear</i>
          </vue-button> -->
        </slot>
      </div>
      <slot name='options'>
        <datalist :id='`${id}-options`' v-if='autocomplete'>
          <option v-for='(option, index) of options' :key='index'>{{option}}</option>
        </datalist>
      </slot>
    </div>
    <p v-if='invalid' class='error-text'>Required</p>
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
        console.log(this.chips);
        this.$emit('change', sortByLocale(this.chips));
      }
    },
    clearable: {
      type: Boolean,
      default: true
    },
    onClear: {
      type: Function,
      default() {
        console.log('clearing');
        this.$emit('change', this.chips = []);
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
      default() {
        return true;
      }
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
      currentChip: null,
      chips: sortByLocale(this.value),
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
      return this.label + (this.required ? ' *' : '');
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
      if (this.currentChip && this.chips.length < this.maxChips) {
        const value = this.currentChip.trim();

        if (!this.unique || this.chips.indexOf(value) < 0) {
          this.chips.push(value);
          this.currentChip = null;
          this.$emit('input', this.chips);
          this.$emit('change', this.chips);
          this.applyInputFocus();
        }
      }
    },

    deleteChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.$emit('change', this.chips);
      this.applyInputFocus();
    },

    editChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.currentChip = chip;
      this.$emit('change', this.chips);
      this.applyInputFocus();
    },

    deleteLastChip() {
      if (!this.currentChip) {
        this.chips.pop();
        this.$emit('change', this.chips);
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
  color: var(--label-color);
}
</style>