<template>
  <div class='select' :class='{disabled}'>
    <div :id='id' class='select-dropdown' role='listbox' :aria-controls='id'>
      <input type='text' v-model='searchValue' hidden>
      <button type='button' class='select-button' aria-haspopup='true' :aria-expanded='expanded' @click='toggle' @keydown='handleButtonEvent'>
        <span :class='{selected: selectedValue}'>{{label}}</span>
        <span v-if='selectedValue'>{{selectedValue}}</span>
        <span class='error-text' v-if='required'>(required)</span>
        <span class='a-right' aria-hidden>▼</span>
      </button>
      <ul class='select-list' ref='trap' role='listbox' @keydown.esc.capture='close()' @keydown.tab='close()' :aria-activedescendant='getActiveDescendant()'>
        <li role='option' disabled>{{label}}</li>
        <li role='option' v-for='(option, index) of options' :key='(index)' :id='`${id}-option-${index}`' :disabled='option.disabled' :tabindex='-1' @click='select(index)' :aria-selected='isSelected(index)' @keydown.down='focusNext' @keydown.up='focusPrevious'>
          {{displayValue(option)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {isStringMatch} from '@/services/utils.service.js';

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
      type: Array
    },
    value: {
      type: Array | String
    },
    displayValue: {
      type: Function,
      default(value) {
        return value.label || value;
      }
    },
    matchValue: {
      type: Function,
      default(options, value) {
        return options.findIndex(o => o === value);
      }
    },
    getItems: {
      type: Function
    },
    onSelect: {
      type: Function,
      default(value) {
        this.$emit('input', value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      searchValue: '',
      expanded: false,
      selected: undefined,
      previousFocusedNode: null,
      focusable: [],
      focusIndex: null,
      timer: null
    };
  },
  computed: {
    compName() {return this.name || this.id;},
    items() {
      if (this.getItems) {
        this.loading = true;
        this.getItems().then(items => {
          this.loading = false;
          return items;
        })
        .catch(err => {
          // show snackbar about error
          console.log('error loading items', err);
        });
      }
      else return this.options;
    },
    selectedValue() {
      let val = '';
      if (this.selected != null) {
        let matchIndex = this.matchValue(this.options, this.value);
        if (matchIndex >= 0) val = this.displayValue(this.options[matchIndex]);
      }
      return val;
    }
  },
  methods: {
    isSelected(index) {
      return this.selected === index;
    },
    toggle() {
      if (this.expanded) this.close();
      else this.open();
    },
    open() {
      this.previousFocusedNode = document.activeElement;
      this.expanded = true;
      this.focusable = this.getFocusableNodes();
      if (this.selected) {
        this.focus(this.selected);
      }
      else {
        this.focus(0);
        this.select(0);
      }

      document.addEventListener('keydown', this.handleListEvent, true);
      document.addEventListener('click', this.handleListEvent, true);
    },
    close() {
      document.removeEventListener('keydown', this.handleListEvent, true);
      document.removeEventListener('click', this.handleListEvent, true);
      this.expanded = false;
      if (this.previousFocusedNode) this.previousFocusedNode.focus();
    },
    select(index) {
      if (Number.isNaN(index)) index = 0;
      if (index >= this.items.length || index < 0) return;
      this.selected = index;
      this.onSelect(this.options[index]);
    },
    focus(index) {
      if (!Number.isNaN(index) && this.focusable && index >= 0 && index < this.focusable.length) {
        this.focusIndex = index;
        this.focusable[this.focusIndex].focus();
      }
    },
    focusNext() {
      this.select(this.focusIndex + 1);
      this.focus(this.focusIndex + 1);
    },
    focusPrevious() {
      this.select(this.focusIndex - 1);
      this.focus(this.focusIndex - 1);
    },
    handleListEvent(event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'keydown') {
        if (event.keyCode === 9 || event.keyCode === 27) {
          this.close();
        }
        else if (event.keyCode === 40) {
          this.focusNext();
        }
        else if (event.keyCode === 38) {
          this.focusPrevious();
        }
        else if (event.keyCode === 13) {
          this.select(this.focusIndex);
          this.close();
        }
        else if (event.keyCode >= 65 && event.keyCode <= 90) {
          this.searchValue += event.key;
          this.findBestMatch(true);
        }
      }
      if (event.type === 'click') {
        if (event.target.tagName !== 'LI') {
          this.close();
        }
        else {
          for (let i = 0; i < this.focusable.length; ++i) {
            if (this.focusable[i] === event.target) {
              this.select(i);
              this.close();
            }
          }
        }
      }
    },
    handleButtonEvent(event) {
      if (event.type === 'keydown') {
        if (event.keyCode === 40 || event.keyCode === 38) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (event.keyCode === 40) this.select(this.selected + 1);
        else if (event.keyCode === 38) this.select(this.selected - 1);
        else if (event.keyCode >= 65 && event.keyCode <= 90) {
          this.searchValue += event.key;
          this.findBestMatch();
        }
      }
    },
    getFocusableNodes() {
      return this.$refs['trap'].querySelectorAll('[role=option]:not([disabled])');
    },
    getActiveDescendant() {
      if (this.selected == null) {
        return false;
      }
      else return `${this.id}-option-${this.selected}`;
    },
    findBestMatch(shouldFocus) {
      const matchIndex = this.items.findIndex(item => {
        return isStringMatch(this.displayValue(item), this.searchValue);
      });
      if (matchIndex >= 0) {
        this.select(matchIndex);
        if (shouldFocus) this.focus(matchIndex);
      }

      if (this.timer == null) {
        this.timer = setTimeout(() => {
          this.searchValue = '';
          clearTimeout(this.timer);
          this.timer = null;
        }, 1000);
      }
    }
  },
  watch: {
    value() {
      let match = this.matchValue(this.options, this.value);
      if (match >= 0) this.selected = match;
    },
  },
  mounted() {
    this.getFocusableNodes();
    const content = this.$refs['trap'];
    const height = content.getBoundingClientRect().height;
    this.$el.firstChild.classList.add('mounted');
    const style = document.createElement('style');
    style.textContent = `
      .js #${this.id}.mounted [aria-expanded] + .select-list {
        height: ${height}px;
      }
    `;
    this.$el.insertBefore(style, this.$el.firstChild);
  },
  updated() {
    this.getFocusableNodes();
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';
@import '../../assets/css/animations.css';

.select {
  min-height: 2.5rem;
  min-width: 100px;
  padding: 1.2rem 0 1rem 0;
}

.select [role=option] {
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 10px 5px;
}

.select-button {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--divider);
  padding-bottom: 2px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  outline: none;
  transition: var(--out);
}

.select-button:focus, .select-button:active {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
  transition: var(--in);
}

.select-button > span {
  padding-bottom: 2px;
}

.select-button > span.selected {
  cursor: text;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  transform: scale(0.7) translate3d(0, -2rem, 0);
  transform-origin: left;
  transition: .2s var(--linear-out-slow-in);
}

.select-dropdown {
  display: none;
  width: 100%;
  position: relative;
  display: inline-block;
}

.select-list {
  z-index: 4;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  box-shadow: var(--depth-3);
  min-width: 250px;
  max-height: 400px;
  overflow-y: hidden;
}

.js .select-dropdown.mounted .select-list {
  height: 0;
  opacity: .2;
  transition: var(--out);
}

.js .select-dropdown.mounted [aria-expanded] + .select-list {
  overflow-y: scroll;
  opacity: 1;
  transition: var(--in);
}

.select-dropdown [role^=option] {
  position: relative;
  text-align: left;
  display: block;
  line-height: 1.5rem;
  padding: 14px 16px;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  background-color: var(--background-color);
  line-height: 1.5rem;
}

.select-dropdown [role=option]:not([disabled]):not(:focus):hover {
  background: lightgray;
  cursor: pointer;
}

.select-dropdown [role=option][disabled] {
  color: var(--disabled-color);
}

.select-dropdown [role=option]:focus {
  background-color: var(--primary-color);
  color: var(--primary-text);
}
</style>
