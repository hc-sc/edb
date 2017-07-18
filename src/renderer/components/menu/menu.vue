<template>
  <div class='menu' :id='id'>
    <vue-button type='button' class='btn flat primary'  aria-haspopup='true' :aria-expanded='expanded' @click.native='toggle($event)' @keyup.native.down='open' @keyup.native.up='close($event)'>
      <slot name='label'>
        {{label}}
      </slot>
    </vue-button>
    <div role='menu'>
      <slot name='content'>
        <button type='button' role='menuitem' v-for='(item, index) of items' :key='item' :disabled='item.disabled' tab-index='-1' @keyup.down='next' @keyup.up='prev' @keyup.esc='close' @click='select(index)' :aria-checked='persist && selected === index'>
          <span>
            <slot name='selected-menuitem'>✓</slot>
          </span>
          {{item.label || item}}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
/** Inspired by Heydon Pickering and Hugo Giraudel
 * https://inclusive-components.design/menus-menu-buttons/
 */

import Button from '@/components/button/button.vue';

export default {
  name: 'Menu',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    items: {
      type: Array,
      default: () => []
    },
    persist: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false,
      selected: undefined
    };
  },
  methods: {
    open() {
      this.expanded = true;

      // focus on first item if there is one
      const firstItem = this.$el.querySelector('[role=menuitem]:not([disabled])');
      if (!firstItem) return;
      firstItem.focus();

      // add event listener for closing
      document.addEventListener('click', this.close, true);

      // interrupt scroll events

    },
    close() {
      if (event.target.getAttribute('role') === 'menuitem') return;
      this.expanded = false;

      // focus on the button
      this.$el.firstChild.focus();

      // remove the close listener
      document.removeEventListener('click', this.close, true);

      // reinstate scroll events
    },
    toggle() {
      if (this.expanded) this.close();
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
    select(index) {
      this.selected = index;
      this.$emit('selected', index);
    }
  },
  mounted() {
    const content = this.$el.querySelector('[role=menu]');
    const height = content.getBoundingClientRect().height;

    this.$el.classList.add('mounted');

    const style = document.createElement('style');
    style.textContent = `
      .js .menu.mounted [aria-expanded] + [role=menu] {
        height: ${height}px;
      }
    `;
    this.$el.insertBefore(style, this.$el.firstChild);
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.menu {
  position: relative;
  display: inline-block;
}

.menu [role="menu"] {
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: var(--depth-3);
  overflow: hidden;
}

.js .menu.mounted [role=menu] {
  height: 0;
  opacity: .2;
  transition: .2s var(--fast-out-slow-in);
}

.js .menu.mounted [aria-expanded] + [role=menu] {
  opacity: 1;
  transition: .2s var(--fast-out-slow-in);
}

.menu [role^="menuitem"] {
  position: relative;
  text-align: left;
  padding: 0 2rem;
  min-width: 100%;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  background-color: var(--background-color);
  line-height: 1.75rem;
  cursor: pointer;
}

.menu [role^="menuitem"]:hover, .menu [role^="menuitem"]:focus {
  background: lightgray;
}

.menu [role^='menuitem'] > span {
  opacity: 0;
  position: absolute;
  left: 1rem;
  color: var(--primary-color);
}

.menu [role^='menuitem'][aria-checked='true'] > span {
  opacity: 1;
  background-color: var(--selected-color);
}

.menu [role=option][aria-disabled] {
  color: var(--disabled-color);
}
</style>
