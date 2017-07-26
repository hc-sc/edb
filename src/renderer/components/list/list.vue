<template>
  <ul class='list' :class='{selectable}'>
    <slot name='list-items'>
      <li class='list-item' v-for='(item, index) of items' :key='index' @click='onSelect(item)'>
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
      type: Array
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
