<docs>
## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable

</docs>

<template>
  <div
    class='select'
    :id='id'
    :class='{disabled, required, selected: selectedIndexes.length > 0}'
    @focusout='touched = true'>
      <input
        ref='search'
        type='search'
        role='search'
        hidden
        novalidate>
      <button
        ref='button'
        type='button'
        aria-haspopup='true'
        :aria-expanded='expanded'
        @click='toggle'>
          <span
            :id='`${id}-label}`'>
              {{label}}
          </span>
          <span
            :id='`${id}-label`'
            aria-hidden>
              {{selectedValues}}
          </span>
          <span aria-hidden>▼</span>
      </button>
      <ul
        ref='listbox'
        role='listbox'
        :aria-labelledby='`${id}-label`'
        :aria-multiselectable='multiple' :aria-activedescendant='activeDescendant'>
          <li
            v-for='(option, index) of options'
            :key='index'
            :id='`${id}-option-${index}`'
            role='option'
            :aria-selected='isSelected(index)'
            :disabled='disabled || isDisabled(option)'
            tabindex='-1'
            @keydown.stop.prevent='handleKeyPress($event, index)'
            @click.stop='handleClick($event, index)'>
              {{getOptionLabel(option)}}
          </li>
      </ul>
      <div
        ref='overlay'
        class='overlay'
        @click.stop='close'>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Select',
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        default: () => []
      },
      value: {
        type: Array | String
      },
      displayValue: {
        type: Function,
        default(option) {
          return option == null ? this.label : (option.label || option);
        }
      },
      matchValue: {
        type: Function,
        default(options, value) {
          return options.findIndex(o => o == value);
        }
      },
      onSelect: {
        type: Function,
        default(option) {
          this.$emit('input', option);
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean
      },
      isDisabled: {
        type: Function,
        default(option) {
          return option.disabled;
        }
      },
      required: {
        type: Boolean
      }
    },
    data() {
      return {
        touched: false,
        dirty: false,
        expanded: false,
        nodes: [],
        focusedIndex: -1,
        selectedIndexes: [],
        searchTerm: '',
        offsets: {}
      };
    },
    computed: {
      invalid() {
        return this.touched && this.required && this.selectedValues.lenght === 0;
      },
      activeDescendant() {
        return this.focusedIndex < 0 ? false : this.options[this.focusedIndex].id;
      },
      selectedValues() {
        return this.selectedIndexes.map(index => {
          return this.getOptionLabel(this.options[index]);
        }).join(',');
      }
    },
    methods: {
      isSelected(index) {
        return this.selectedIndexes.includes(index);
      },

      toggle() {
        this.expanded ? this.close() : this.open();
      },

      open() {
        this.selectedIndexes.sort();
        this.offsets = this.getContainerTranslationOffsets();
        this.setOverlayProperties();
        this.setListboxProperties();
        this.expanded = true;
        this.$nextTick(() => {
          if (this.selectedIndexes.length) {
            this.focusIndex(this.selectedIndexes[0]);
            console.log(this.focusedIndex);
          }
          else {
            for (let i = 0; i < this.$refs.listbox.children; ++i) {
              console.log(this.$refs.listbox.children[i]);
              if (!this.$refs.listbox.children[i].hasAttribute('disabled')) {
                this.focusIndex(i);
                break;
              }
            }
          }
        });

        window.addEventListener('resize', this.setListboxProperties);
      },

      close() {
        window.removeEventListener('resize', this.setListboxProperties);
        this.expanded = false;
        this.focused = -1;
      },

      getOptionLabel(option) {
        return this.displayValue(option);
      },

      setListboxProperties() {
        let {width, height} = window.getComputedStyle(this.$refs.listbox);
        width = parseInt(width);
        height = parseInt(height);
        let dims = this.$refs.button.getBoundingClientRect();
        let offsetX = dims.left - this.offsets.x;
        let offsetY = dims.top - this.offsets.y;

        if (dims.top + height > window.innerHeight) {
          offsetY = offsetY - (Math.abs(dims.top - height));
        }

        if (dims.left + width > window.innerWidth) {
          offsetX = offsetX - (Math.abs(dims.left - width));
        }

        this.$refs.listbox.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        this.$refs.listbox.style.width = `${dims.width}px`;
      },

      setOverlayProperties() {
        this.$refs.overlay.style.transform = `translate(-${this.offsets.x}px, -${this.offsets.y}px)`;
      },

      getContainerTranslationOffsets() {
        const dims = this.findContainers().firstTransform.getBoundingClientRect();

        return {
          x: dims.x || dims.left,
          y: dims.y || dims.top
        };
      },

      findContainers() {
        let node = this.$el;
        const result = {
          firstTransform: document.body,
        };
        while (node != document.body) {
          const style = window.getComputedStyle(node);
          if (
            style.transform != 'none' ||
            style.perspective != 'none'
          ) {
            result.firstTransform = node;
            break;
          }
          node = node.parentElement;
        }
        return result;
      },

      handleClick(event, index) {
        if (this.isDisabled(this.options[index])) return;
        this.focusIndex(index);
        if (!this.multiple) {
          this.selectIndex(index);
          this.close();
          this.$refs.button.focus();
        }
        else {
          this.toggleIndex(index);
        }
      },

      handleKeyPress(event, index) {
        const key = event.keyCode || event.which;

        // up
        if (key === 38) {
          this.focusPrevious();
          if (!this.multiple || event.shiftKey) this.selectIndex(this.focusedIndex);
        }

        // down
        else if (key === 40) {
          this.focusNext();
          if (!this.multiple || event.shiftKey) this.selectIndex(this.focusedIndex);
        }

        // esc
        else if (key === 27) {
          this.close();
          this.$refs.button.focus();
        }

        // tab
        else if (key === 9) {
          this.close();
          this.$el.nextElementSibling.focus();

          if (event.shiftKey) {
            this.$refs.button.focus();
          }
        }

        // space
        else if (key === 32) {
          if (this.multiple) this.toggleIndex(index);
        }

        // enter
        else if (key === 13) {
          if (!this.multiple) {
            this.selectIndex(index);
            this.close();
            this.$refs.button.focus();
          }
        }
      },

      toggleIndex(option) {
        // emit the event to change
        let index = this.selectedIndexes.indexOf(option);
        if (index >= 0) this.selectedIndexes.splice(index, 1);
        else this.selected.push(option);
      },

      selectIndex(index) {
        // emit the event to change, NOTE right now expects single string
        if (!this.multiple) {
          this.onSelect(this.options[index]);
        }
        else {
          this.toggleIndex(index);
        }
      },

      focusIndex(index) {
        this.focusedIndex = index;
        this.$refs.listbox.children[index].focus();
      },

      focusNext() {
        let index = this.focusedIndex + 1;
        if (index >= this.options.length) return;
        let curr = this.$refs.listbox.children[index];
        while (curr.hasAttribute('disabled')) {
          curr = curr.nextElementSibling;
          ++index;
          if (index >= this.options.length) return;
        }
        this.focusIndex(index);
      },

      focusPrevious() {
        let index = this.focusedIndex - 1;
        if (index < 0) return;
        let curr = this.$refs.listbox.children[index];
        while (curr.hasAttribute('disabled')) {
          curr = curr.previousElementSibling;
          --index;
          if (index < 0) return;
        }
        this.focusIndex(index);
      },

      getFirstSelectedNode() {
        return this.$refs.listbox.querySelector('[aria-selected=true]');
      },

      mapValuesToSelected() {
        let match = this.matchValue(this.options, this.value);
        if (match >= 0) this.selectedIndexes = [match];
        else this.selectedIndexes = [];
      }
    },
    watch: {
      value() {
        this.mapValuesToSelected();
      },
      options() {
        this.mapValuesToSelected();
      }
    },
    created() {
      this.mapValuesToSelected();
    }
  };
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';
@import '../../assets/css/animations.css';

.select {
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  min-width: 100px;
  padding: 1.2rem 0 1rem 0;
}

.select > button {
  cursor: pointer;
  width: 100%;
  min-height: 1rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--divider);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  outline: none;
  padding-bottom: 2px;
}

/* triangle */
.select > button > span:last-of-type {
  position: absolute;
  top: 1rem;
  right: 5px;
}

/* label */
.select > button > span:first-of-type {
  color: var(--label-text);
  padding-bottom: 2px;
  cursor: text;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  transform-origin: left;
  transform: scale(1)  translateY(.9rem);
  transition: var(--out);
}

.select.selected > button > span:first-of-type {
  transform: scale(0.7);
  transition: var(--in);
}

/* selected values */
.select > button > span:nth-of-type(2) {
  visibility: hidden;
  z-index: -1;
}

.select.selected > button > span:nth-of-type(2) {
  visibility: visible;
}

.select > button:focus, .select > button:active {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
  transition: var(--in);
}

.select > button.invalid {
  border-bottom: 1px solid var(--error-color);
  box-shadow: none;
  transition: var(--out);
}

.select > button.invalid:focus, .select > button.invalid:active {
  box-shadow: 0 1px 0 0 var(--error-color);
  transition: var(--in);
}

.select > button.disabled {
  border-bottom: 1px dashed var(--disabled-color);
  box-shadow: none;
  transition: var(--out);
}

.select > button.disabled.invalid {
  border-bottom: 1px dashed var(--error-color);
  box-shadow: none;
  transition: var(--out);
}

.select > button ~ .overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 9999;
}

.select > button[aria-expanded=true] ~ .overlay {
  display: block;
}

.select > button + [role=listbox] {
  display: block;
  background-color: white;
  line-height: 1.5rem;
  padding: 14px 16px;
  outline: none;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 250px;
  z-index: 10000;
  list-style: none;
  box-shadow: var(--depth-3);
  padding: 0;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: hidden;
  visibility: hidden;
  opacity: 0;
}

.select > button[aria-expanded=true] + [role=listbox] {
  visibility: visible;
  overflow-y: auto;
  opacity: 1;
  display: block;
}

.select [role=option] {
  padding: 15px 5px;
  cursor: pointer;
  width: 100%;
  border: none;
  background: white;
  text-align: left;
  outline: none;
}

.select [role=option]:not([disabled]):hover,
.select [role=option]:not([disabled]):focus {
  background-color: lightgray;
}

.select [role=option]:not([disabled]):active,
.select [role=option]:not([disabled])[aria-selected=true] {
  background-color: var(--primary-color);
  color: var(--primary-text);
}

.select [role=option][disabled] {
  color: var(--disabled-color);
  cursor: not-allowed;
}
</style>