<docs>
## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge

</docs>

<template>
  <ul class='list' :class='{selectable}'>
    <slot name='list-items'>
      <li class='list-item' v-for='(item, index) of items' :key='index' @click='onSelect(item)' :class='{selected: matchSelected(item)}'>
        <slot name='prefix'></slot>
        <slot name='content'>
          <div class='list-item-content'>
            {{displayValue(item)}}
            <small v-if='item.sublabel'>{{item.sublabel}}</small>
          </div>
        </slot>
        <slot name='postfix'></slot>
      </li>
    </slot>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    id: {
      type: String
    },
    items: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Boolean,
      default: false
    },
    onSelect: {
      type: Function,
      default(value) {
        if (this.selectable) this.$emit('select', value);
      }
    },
    selectedItem: {
      type: Object,
    },
    matchSelected: {
      type: Function,
      default(item) {
        if (item != null && item._id && this.selectedItem != null && this.selectedItem._id) {
          return item._id == this.selectedItem._id;
        }
        return false;
      }
    },
    displayValue: {
      type: Function,
      default(value) {
        return value.label || value;
      }
    }
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.list {
  display: block;
  border: 1px solid var(--divider);
}

.list-item {
  padding: .75rem 1rem;
}

.list.selectable .list-item {
  cursor: pointer;
}

.list-item:hover {
  background-color: var(--hover-color);
}

.list-item:not(:last-child) {
  border-bottom: 1px solid var(--divider);
}

.list-item.selected {
  background-color: var(--primary-color);
  color: var(--primary-text);
}

.list-item-content {
  max-width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-item-postfix {
  float: right;
}
</style>