<docs>
## Chips

Used for list items of short text. Can be configured to allow duplicates, sort, delete, edit, and add new items. If read-only, only displays values.

### Inputs

-
</docs>

<template>
  <div class='chips' :class='[editable]'>
    <div class='chips-group'>
      <ul class='chips-list'>
        <li class='chips-item' :key='index' v-for='(chip, index) of items'>
          {{chip}}
          <span v-if='deletable && !readonly' class='chip-delete' @click='deleteItem(index)'>x</span>
        </li>
        <li v-if='!readonly' class='chips-input-group'>
          <label :for='id' hidden>{{label}}</label>
          <input :id='id' :name='name || id' class='chips-input' :placeholder='label' @keydown.enter.prevent.stop='addItem' v-model='value' :autocomplete='autocomplete'>
        </li>
      </ul>
      <div class='chips-actions'>
        <slot name='actions'>
          <vue-button v-if='sortable' @click.native='sort' display='flat'>sort</vue-button>
          <vue-button @click.native='clear' display='flat'>clear</vue-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';

export default {
  name: 'Chips',
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
    items: {
      type: Array,
      default: () => []
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator(value) {
        return ['on', 'off'].includes(value);
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
    editable: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    deleteItem(index) {
      if (
        this.readonly || !this.deletable ||
        index == null ||
        index < 0 ||
        index >= this.items.length
      ) return;

      this.$emit('update:items', this.items.splice(index, 1));
    },
    addItem() {
      if (this.readonly) return;
      const text = this.value.trim();
      if (text.length === 0) return;
      if (this.unique && this.items.some(item => {
        return item.toLowerCase() === this.value.toLowerCase();
      })) return;

      this.$emit('update:items', this.items.concat(this.value));
      this.value = '';
    },
    sort() {
      this.$emit('update:items', this.items.sort((a, b) => {
        return a.localeCompare(b.toLowerCase());
      }));
    },
    clear() {
      this.$emit('update:items', []);
    }
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
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
}

.chips-item {
  display: inline-block;
  line-height: 1.75rem;
  padding: 0 12px;
  margin: 0 2px;
  border-radius: 16px;
  background-color: #e4e4e4;
}

.chips-item.selected {
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
