<template>
  <div :id='id + "-select"' class='select-wrapper'>
    <div class='select-dropdown' role='listbox' :aria-controls='id'>
      <button type='button' class='select-button' aria-haspopup='true' :aria-expanded='expanded' @click='toggle' @keyup.down='open' @keyup.up='close'>
        <span v-if='!selected.length'>{{label}}</span>
        <span v-else>{{options[selected]}}</span>
        <span class='a-right'>▼</span>
      </button>
      <ul class='select-list'>
        <slot name='content'>
          <li role='option' aria-disabled :aria-selected='!selected.length'>{{label}}</li>
          <li role='option' v-for='(option, index) of options' :key='option.value || option' :disabled='option.disabled' tab-index='-1' @keyup.down='next' @keyup.up='prev' @keyup.tab='close' @click='selectOption(index)' :aria-selected='isSelected(index)'>
            {{option.label || option}}
          </li>
        </slot>
      </ul>
    </div>
    <select :id='id' :name='name || id' class='select-field' v-model='value' :multiple='multiple'>
      <slot name='options'>
        <option value='' disabled :selected='!selected.length'>{{label}}</option>
        <option v-for='(option, index) of options' :value='option.value || option' :key='index' :selected='isSelected(index)'>{{option.label || option}}</option>
      </slot>
    </select>
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
    name: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data() {
    return {
      expanded: false,
      selected: []
    };
  },
  computed: {
    compName() {
      return this.name || this.id;
    }
  },
  methods: {
    open() {
      this.expanded = true;
      const firstItem = this.$el.querySelector('[role=option]:not([disabled])');
      if (!firstItem) return;
      firstItem.focus();
      document.addEventListener('click', this.close, true);
    },
    close(event) {
      if (this.multiple && event.target.getAttribute('role') === 'option' && event.keyCode !== 9) return;
      this.expanded = false;
      this.$el.firstChild.focus();
      document.removeEventListener('click', this.close, true);
    },
    toggle(event) {
      if (this.expanded) this.close(event);
      else this.open();
    },
    next(event) {
      if (event.target.nextSibling == null) {
        event.target.parentElement.firstChild.focus();
      }
      else {
        event.target.nextSibling.focus();
      }
    },
    prev(event) {
      if (event.target.previousSibling == null) {
        event.target.parentElement.lastChild.focus();
      }
      else {
        event.target.previousSibling.focus();
      }
    },
    selectOption(optionIndex) {
      if (this.multiple) {
        const index = this.selected.indexOf(optionIndex);
        if (index >= 0) {
          this.selected.splice(index, 1);
        }
        else this.selected.push(index);
      }
      else {
        this.selected = [optionIndex];
      }

      this.$emit('input', this.multiple ? this.selected : this.selected[0]);

      // copy setting to underlying select box
      const nodes = this.$el.querySelectorAll('option');
      for (let i = 0; i < nodes.length; ++i) {
        if (i === optionIndex + 1) nodes[i].setAttribute('selected', '');
        else nodes[i].removeAttribute('selected');
      }
    },
    isSelected(index) {
      return this.selected.includes(index);
    }
  },
  mounted() {
    const content = this.$el.querySelector('.select-list');
    const height = content.getBoundingClientRect().height;

    this.$el.firstChild.classList.add('mounted');

    const style = document.createElement('style');
    style.textContent = `
      .js #${this.id}-select .mounted [aria-expanded] + .select-list {
        height: ${height}px;
      }
    `;
    this.$el.insertBefore(style, this.$el.firstChild);
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.select-wrapper {
  min-height: 2.5rem;
  padding: 1.2rem 0 1rem 0;
}

.select-field {
  background-color: inherit;
  border: none;
  border-bottom: 1px solid var(--divider);
  border-radius: 2px;
  outline: none;
  display: inline-block;
  width: 100%;
  font-size: 1rem;
  line-height: inherit;
  padding: 0 0 2px 0;
  cursor: pointer;
}

.js .select-field {

}

.select-button {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--divider);
  padding-bottom: 2px;
  text-align: left;
  font-size: 1rem;
}

.select-button > span {
  padding-bottom: 2px;
}

.select-dropdown {
  display: none;
  width: 100%;
  position: relative;
  display: inline-block;
}

.select-dropdown .select-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  box-shadow: var(--depth-3);
  max-height: 400px;
  overflow-y: hidden;
  z-index: 2;
}

.js .select-dropdown.mounted .select-list {
  height: 0;
  opacity: .2;
  transition: .2s var(--fast-out-slow-in);
}

.js .select-dropdown.mounted [aria-expanded] + .select-list {
  overflow-y: auto;
  opacity: 1;
  transition: .2s var(--fast-out-slow-in);
}

.select-dropdown [role^="option"] {
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
  cursor: pointer;
}

.select-dropdown [role^="option"]:hover, .select-dropdown [role^="option"]:focus {
  background: lightgray;
}

/*.select-dropdown [role^="option"][aria-selected="true"]::before {
  position: absolute;
  left: 1rem;
  background-color: var(--selected-color);
  content: '\2713\0020';
}*/

.select-dropdown [role=option][aria-disabled] {
  color: var(--disabled-color);
}
</style>
