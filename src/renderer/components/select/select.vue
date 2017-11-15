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
    :class='{disabled, required}'
    @focusout='touched = true'>
      <span
        :id='`${id}-label`'
        hidden>
          {{label}}
      </span>
      <input
        ref='search'
        type='search'
        role='search'
        hidden
        novalidate>
      <span aria-hidden>▼</span>
      <button
        ref='button'
        type='button'
        aria-haspopup='true'
        :aria-expanded='expanded'
        @click='toggle'>
          {{buttonLabel}}
      </button>
      <div
        ref='overlay'
        class='overlay'
        @click.stop='close'>
      </div>
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
        focusedIndex: -1,
        selectedIndexes: [],
        searchTerm: '',
        offsets: {}
      };
    },
    computed: {
      invalid() {
        return false;
      },
      activeDescendant() {
        return this.focusedIndex < 0 ? false : this.options[this.focusedIndex].id;
      },
      buttonLabel() {
        if (this.selectedIndexes == null || this.selectedIndexes.length === 0) return this.label;
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
          let firstSelected = this.getFirstSelectedNode();
          if (firstSelected) firstSelected.focus();
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
        let dims = this.$refs.button.getBoundingClientRect();
        let offsetX = (dims.x || dims.left) - (this.offsets.x);
        let offsetY = (dims.y || dims.top) - (this.offsets.y);

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
        console.log(index);
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
        let option = this.options[index];
        if (this.isDisabled(option)) return;
        this.focusedIndex = index;
        this.$refs.listbox.children[index].focus();
      },

      focusNext(node, index) {
        let curr = node;
        while (curr.hasAttribute('disabled')) {
          curr = curr.nextElementSibling;
          ++index;
          if (index >= this.options.length) return;
        }
        this.focusIndex(index);
      },

      focusPrevious(node, index) {
        let curr = node;
        while (curr.hasAttribute('disabled')) {
          curr = curr.nextElementSibling;
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
        console.log(match);
        if (match >= 0) this.selectedIndexes = [match];
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
}

.select > button + .overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 9999;
}

.select > button[aria-expanded=true] + .overlay {
  display: block;
}

.select > button {
  width: 100%;
  padding: 5px;
  border: 1px solid black;
  background-color: inherit;
}

.select > button {
  padding: 5px 2em 5px 5px;
}

.select > span {
  position: absolute;
  right: .2em;
  top: .1em;
  z-index: -1;
}

.select > button ~ [role=listbox] {
  display: block;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 250px;
  z-index: 10000;
  list-style: none;
  box-shadow: 1px 2px;
  padding: 0;
  max-height: 400px;
  overflow: hidden;;
  visibility: hidden;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  /* transition: .2s linear; */
  display: none;
}

.select > button[aria-expanded=true] ~ [role=listbox] {
  visibility: visible;
  overflow-y: auto;
  opacity: 1;
  transform: scaleY(1);
  /* transition: opacity .2s .1s linear, transform .4s; */
  display: block;
}

[role=option] {
  padding: 15px 5px;
  cursor: pointer;
  width: 100%;
  border: none;
  background: white;
  text-align: left;
}

[role=option]:not([disabled]):hover {
  background-color: lightgray;
}

[role=option]:not([disabled]):focus {
  background-color: blue;
  color: white;
}

[role=option]:not([disabled]):active,
[role=option][aria-selected=true] {
  background-color: black;
  color: white;
}

[role=option][disabled] {
  color: lightgray;
  cursor: not-allowed;
}
</style>