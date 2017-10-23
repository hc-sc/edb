<docs>
## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element

</docs>

<template>
  <div class='chips'>
    <div class='chips-group'>
      <ul class='chips-list' :class='{focused}' @keydown='handleKeyboardEvent' @focusout='focusedIndex = null' :id='id'>
        <li class='chips-item' :key='index' v-for='(chip, index) of chips' tabindex='-1' @click='focus(index)'>
          {{chip}}
          <span v-if='deletable && !disabled' class='chip-delete' @click='deleteItem(index)'>
            <slot name='deleteIcon'>x</slot>
          </span>
        </li>
        <li class='chips-input-group'>
          <label :for='`${id}-input`' class='v-hidden'>{{label}}</label>
          <input :id='`${id}-input`' ref='input' :name='compName' class='chips-input' :placeholder='label' @focus='focusedIndex = focusable.length - 1' @keydown.enter.prevent.stop='addItem' :value='currValue' @input='updateCurrValue($event.target.value)' :autocomplete='autocomplete' :list='`${id}-options`' :disabled='disabled' :maxlength='maxLength'>
        </li>
      </ul>
      <div class='chips-actions' v-if='!disabled' :aria-controls='id'>
        <slot name='actions'>
          <vue-button v-if='sortable' @click.native='sort' display='flat'>sort</vue-button>
          <vue-button @click.native='clear' display='flat'>clear</vue-button>
        </slot>
      </div>
      <slot name='options'>
        <datalist :id='`${id}-options`'>
          <option v-for='(option, index) of items' :key='index'>{{option}}</option>
        </datalist>
      </slot>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chip from '@/components/chips/chip.vue';
import {focusable} from '@/mixins/focusable.js';

export default {
  name: 'Chips',
  mixins: [focusable],
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
    value: {
      type: Array,
      default: () => []
    },
    onAdd: {
      type: Function,
      default(value) {
        this.$emit('input', value);
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
    getItems: {
      type: Function,
    },
    displayValue: {
      type: Function,
      default(value) {
        return value;
      }
    },
    unique: {
      type: Boolean,
      default: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
    sortBy: {
      type: Function,
      default(a, b) {
        return a.localeCompare(b.toLowerCase());
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number
    },
    maxLength: {
      type: Number
    }
  },
  data() {
    return {
      currValue: '',
    };
  },
  methods: {
    deleteItem(index) {
      if (
        this.disabled
         || !this.deletable ||
        index == null ||
        index < 0 ||
        index >= this.chips.length
      ) return;
      if (this.chips.length === 1) this.clear();
      else {
        this.$emit('input', this.chips.slice(0, index).concat(this.chips.slice(index + 1)));
      }
    },

    updateCurrValue(value) {
      if (this.maxLength == null || value.length > this.maxLength) {
        value = value.splice(this.maxLength);
        console.log(typeof value);
        this.currValue = '' + value;
      }
      else {
        this.currValue = value;
      }
    },

    addItem() {
      if (this.max != null && this.chips.length >= this.max) return;
      if (this.disabled) return;
      const text = this.currValue.trim();
      if (text.length === 0) return;
      if (this.unique && this.chips.some(item => {
        return item.toLowerCase() === this.currValue.toLowerCase();
      })) return;

      this.onAdd(this.chips.concat(this.currValue));
      ++this.focusedIndex;
      this.currValue = '';
    },
    sort() {
      this.$emit('input', this.chips.sort(this.sortBy));
    },
    clear() {
      this.$emit('input', []);
    },
    handleKeyboardEvent(event) {
      if (this.focusedIndex == null) this.focus(0);
      else if (event.keyCode === 37) {
        this.focus(this.focusedIndex - 1);
      }
      else if (event.keyCode === 39) {
        this.focus(this.focusedIndex + 1);
      }
      else if (event.keyCode === 46) {
        this.deleteItem(this.focusedIndex);
      }
    }
  },
  computed: {
    focused() {
      return this.focusedIndex != null;
    },
    compName() {
      return this.name || this.id;
    },
    chips() {
      return this.value.slice();
    },
    items() {
      if (this.getItems) {
        this.getItems().then(items => {
          this.loading = false;
          return items;
        });
      }
      else return this.options;
    }
  },
  watch: {
    chips() {
      // this updates the DOM, need to wait
      this.$nextTick(() => {
        this.getFocusableNodes('.chips-item, input:not([disabled])');
      });
    }
  },
  mounted() {
    this.getFocusableNodes('.chips-item, input:not([disabled])');
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';

.chips {
  width: 100%;
  box-shadow: none;
  outline: none;
  padding-bottom: 5px;
  transition: .2s ease-in;
}

.chips-group {
  min-height: 1.75rem;
}

.chips-actions {
  display: flex;
  justify-content: flex-start;
}

.chips-list {
  list-style-type: none;
  margin-bottom: 3px;
  box-shadow: none;
  padding-bottom: 3px;
  border-bottom: 1px solid var(--divider);
}

.chips-list.focused {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
  transition: var(--toggle);
}

.chips-item {
  outline: none;
  display: inline-block;
  line-height: 1.75rem;
  padding: 0 12px;
  margin: 0 2px;
  border-radius: 16px;
  background-color: #e4e4e4;
}

.chips-item:focus {
  background-color: var(--primary-color);
  color: var(--primary-text);
}

.chips-item > span {
  padding-left: 5px;
  cursor: pointer;
}

.chips-input-group {
  display: inline-block;
  line-height: 1.75rem;
}

.chips-input {
  padding-top: 6px;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: inherit;
}
</style>