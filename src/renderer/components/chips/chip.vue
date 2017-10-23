<template>
  <div tabindex='0' class='chip' :class='{deletable, editable, disabled, selected}' @keyup.delete.stop='onDelete()' @click.prevent.stop='selectChip'>
    <div @dblclick='onEdit()'>
      <slot></slot>
      <vue-button type='button' icon v-if='deletable' display='flat' @click.native.stop='onDelete()' color='none' tabindex='-1'>
        <i class='material-icons'>close</i>
      </vue-button>
    </div>
  </div>
</template>

<script>
/** Code modified from vue-material library https://github.com/vuematerial/vue-material/blob/master/src/components/mdChips/mdChip.vue*/
import Button from '@/components/button/button.vue';

export default {
  name: 'Chip',
  props: {
    disabled: {
      type: Boolean
    },
    selected: {
      type: Boolean
    },
    deletable: {
      type: Boolean
    },
    isDeletable: {
      type: Function,
      default() {
        return this.deletable;
      }
    },
    onDelete: {
      type: Function,
      default(chip) {
        if (!this.disabled && this.isDeletable(chip)) {
          this.$emit('delete', chip);
        }
      }
    },
    selectable: {
      type: Boolean
    },
    onSelect: {
      type: Function,
      default(chip) {
        if (!this.disabled) this.$emit('select', chip);
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    isEditable: {
      type: Function,
      default() {
        return this.editable;
      }
    },
    onEdit: {
      type: Function,
      default(chip) {
        if (!this.disabled && this.isEditable(chip)) this.$emit('edit', chip);
      }
    }
  },
  methods: {
    selectChip() {
      this.$el.focus();
    }
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
.chip {
  outline: none;
  display: inline-block;
  line-height: 1.75rem;
  padding: 0 12px;
  margin: 0 2px;
  border-radius: 16px;
  background-color: #e4e4e4;
  transition: var(--out);
}

.chip:not([disabled]):focus, .chip:not([disabled]).selected {
  background-color: var(--primary-color);
  color: var(--primary-text);
}
</style>