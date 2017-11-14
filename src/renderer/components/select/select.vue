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
  <div class='select' :id='id' :class='{disabled, required}' @focusout='touched = true'>
    <span :id='`${id}-label`' hidden>{{label}}</span>
    <input ref='search' type='search' role='search' hidden novalidate>
    <span aria-hidden>▼</span>
    <button ref='button' type='button' aria-haspopup='true' :aria-expanded='expanded' @click='toggle'>{{buttonLabel}}</button>
    <ul ref='listbox' role='listbox' :aria-labelledby='`${id}-label`' :aria-multiselectable='multiple' :aria-activedescendant='activeDescendant'>
      <li v-for='(option, index) of options' :key='index' :id='`${id}-option-${index}`' role='option' :aria-selected='isSelected(option)' :disabled='isDisabled(option)' tabindex='-1' @keydown.stop.prevent='handleKeyPress'>{{getOptionLabel(option)}}</li>
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
      required: {
        type: Boolean
      }
    },
    data() {
      return {
        touched: false,
        dirty: false,
        expanded: false,
        selected: null,
        focused: null,
        focusableOptions: [],
        searchTerm: '',
        lastX: undefined,
        lastY: undefined,
        firstTransform: null,
        scrollable: []
      };
    },
    computed: {
      activeDescendant() {
        return this.focused == null ? false : this.focused.id;
      },
      buttonLabel() {
        return this.label;
      }
    },
    methods: {
      toggle() {
        this.expanded ? this.close() : this.open();
      },

      open() {
        this.lastX = window.scrollX;
        this.lastY = window.scrollY;
        this.findContainers();
        this.setListboxPosition();
        this.expanded = true;

        window.addEventListener('resize', this.setListboxPosition);
        document.addEventListener('click', () => {
          if (!this.$refs.listbox.contains(event.target) && !this.$refs.button.contains(event.target)) {
            this.close();
          }
        }, {
          once: true,
          capture: true
        });
      },

      close() {
        this.expanded = false;
      },

      isFocused() {},

      isSelected() {},

      isDisabled(option) {
        return option.disabled;
      },

      getOptionLabel(option) {
        this.displayValue(option);
      },

      handleScroll() {
        console.log('here');
        window.scrollTo(0, this.lastY);
      },

      setListboxPosition() {
        let dims = this.$refs.button.getBoundingClientRect();
        let containerDims = this.firstTransform.getBoundingClientRect();
        let offsetX = (dims.x || dims.left) - (containerDims.x || containerDims.left);
        let offsetY = (dims.y || dims.top) - (containerDims.y || containerDims.top);

        this.$refs.listbox.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      },

      findContainers() {
        let node = this.$el;
        while (node != document.body) {
          let style = window.getComputedStyle(node);
          if (
            this.firstTransform == null &&
            (
              style.transform != 'none' ||
              style.perspective != 'none'
            )
          ) {
            this.firstTransform = node;
          }
          if (node.scrollHeight > parseFloat(style.height)) {
            this.scrollable.push(node);
          }
          node = node.parentElement;
        }
        if (this.firstTransform == null) this.firstTransform = document.body;
      }
    },
    watch: {
      value() {},
      options() {}
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

.select > button + [role=listbox] {
  display: block;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 250px;
  z-index: 9998;
  list-style: none;
  box-shadow: 1px 2px;
  padding: 0;
  max-height: 400px;
  /* overflow: hidden;;
  visibility: hidden;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: .2s linear; */
  display: none;
}

.select > button[aria-expanded=true] + [role=listbox] {
  /* visibility: visible;
  overflow-y: auto;
  opacity: 1;
  transform: scaleY(1);
  transition: opacity .2s .1s linear, transform .4s; */
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