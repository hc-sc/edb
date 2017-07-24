<template>
  <div class='select'>
    <!-- Listbox -->
    <div :id='`${id}-dropdown`' class='select-dropdown' role='listbox' :aria-controls='id' v-if='!native'>
      <button type='button' class='select-button' aria-haspopup='true' :aria-expanded='expanded' @click='toggle' @keyup.down='open' @keyup.up='close'>
        {{selectedValue}}
        <span class='a-right'>▼</span>
      </button>
      <ul class='select-list'>
        <li role='option' disabled>{{label}}</li>
        <li role='option' v-for='(option, index) of options' :key='(index)' :disabled='option.disabled' tabindex='-1' @keyup.down='next' @keyup.up='prev' @keyup.tab='close' @click='select(option.label || option)' :aria-selected='isSelected(index)'>
          {{displayValue(option)}}
        </li>
      </ul>
    </div>

    <!-- Select  -->
    <select class='select-field' :value='value' :id='id' :name='compName' :disabled='disabled' :required='required' @input='select($event.target.value)' v-show='native'>
      <slot name='select-options'>
        <option value='' disabled selected>
          {{label}}
        </option>
         <option v-for='(option, index) of options' :key='index' :value='option.value || option' >
          {{displayValue(option)}}
        </option>
      </slot>
    </select>
  </div>
</template>

<script>
import Menu from '@/components/menu/menu.vue';

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
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    native: {
      type: Boolean,
      default: false
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
    cb: {
      type: Function,
      default(value) {
        this.$emit('input', value);
      }
    }
  },
  data() {
    return {
      expanded: false,
      selected: undefined
    };
  },
  computed: {
    compName() {return this.name || this.id;},
    selectedValue() {
      return this.selected == null ? this.label : this.displayValue(this.value);
    }
  },
  methods: {
    select(value) {
      this.selected = value;
      this.cb(value);
      if (!this.native) this.close();
    },
    toggle() {
      if (this.expanded) this.close();
      else this.open();
    },
    open() {
      this.expanded = true;
      const firstItem = this.$el.querySelector('[role=option]:not([disabled])');
      if (firstItem) firstItem.focus();

      // close the listbox when clicked outside, during capture
      document.addEventListener('click', this.close, true);
    },
    close() {
      this.expanded = false;
      this.$el.querySelector('.select-button').focus();
      document.removeEventListener('click', this.close, true);
    },
    prev() {},
    next() {},
    isSelected(index) {
      return index === this.selectedIndex;
    }
  },
  mounted() {
    if (this.native) return;
    const content = this.$el.querySelector('.select-list');
    const height = content.getBoundingClientRect().height;

    this.$el.firstChild.classList.add('mounted');

    const style = document.createElement('style');
    style.textContent = `
      .js #${this.id}-dropdown.mounted [aria-expanded] + .select-list {
        height: ${height}px;
      }
    `;
    this.$el.insertBefore(style, this.$el.firstChild);
  },
  components: {
    'vue-menu': Menu
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

.select-field {
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 5px 0;
  width: 100%;
  cursor: pointer;
  background-color: inherit;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--divider);
  box-shadow: none;
  transition: var(--out);
}

.select-field:active, .select-field:focus {
  border-bottom: 1px solid var(--primary-color);
  box-shadow: 0 1px 0 0 var(--primary-color);
  transition: var(--in);
}

.select option, .select [role=option] {
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 10px 5px;
}

.select-field[multiple] {
  outline: none;
  border: 1px solid var(--divider);
  box-shadow: none;
  transition: var(--out);
}

.select-field[multiple]:active, .select select[multiple]:focus {
  border: 1px solid var(--primary-color);
  transition: var(--in);
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
}

.select-dropdown [role^="option"]:not(:first-child):hover, .select-dropdown [role^="option"]:focus {
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
