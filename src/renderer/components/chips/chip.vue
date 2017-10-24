<template>
  <div tabindex='0' class='chip' :class='{deletable, editable, disabled}'>
    <div @click='!disabled && editable && emit("edit")'>
      <slot></slot>
    </div>
    <vue-button type='button' v-if='deletable' @click='!disabled && emit("delete")' @keyup.native.delete='!disabled && emit("delete")' tabindex='-1'>
      <i class='material-icons'>close</i>
    </vue-button>
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
    deletable: {
      type: Boolean
    },
    isDeletable: {
      type: Function,
      default() {
        return this.deletable;
      }
    },
    editable: {
      type: Boolean
    },
    isEditable: {
      type: Function,
      default() {
        return this.editable;
      }
    }
  },
  components: {
    'vue-button': Button
  }
};
</script>