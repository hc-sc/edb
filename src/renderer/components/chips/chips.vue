<template>
  <div class='chip-container' @click='applyInputFocus'>
    <vue-chip v-for='(chip, index) in chips' :key='index' :id='`${id}-chip-${index}`' :editable='editable' :deletable='deletable' :disabled='disabled' @edit='editChip(chip)' @delete='deleteChip(chip)'>
      <slot name='chip' :value='chip'>{{chip}}</slot>
    </vue-chip>
    <input :id='id' v-model='currentChip'  :name='compName' :disabled='disabled' @keydown.delete='deleteLastChip' @keydown.prevent.enter='addChip' @keydown.prevent.186='addChip' tabindex='0' maxlength='maxChipLength' ref='input'>
    <slot></slot>
  </div>
</template>

<script>
/** Modified from vue-material chips https://github.com/vuematerial/vue-material/blob/master/src/components/mdChips/mdChips.vue */
import Button from '@/components/button/button.vue';
import Chip from '@/components/chips/chip.vue';

export default {
  name: 'Chips',
  props: {
    id: {
      type: String
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    unique: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'number', 'email', 'date', 'tel'].includes(value);
      }
    },
    validate: {
      type: Boolean,
      default() {
        return false;
      }
    },
    label: {
      type: String
    },
    maxChips: {
      type: Number,
      default: Infinity
    },
    maxChipLength: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      currentChip: null,
      chips: this.value,
    };
  },
  computed: {
    compName() {
      return this.name || this.id;
    }
  },
  methods: {
    applyInputFocus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    addChip() {
      if (this.currentChip && this.chips.length < this.maxChips) {
        const value = this.currentChip.trim();

        if (!this.unique || this.chips.indexOf(value) < 0) {
          this.chips.push(value);
          this.currentChip = null;
          this.$emit('input', this.chips);
          this.$emit('change', this.chips);
          this.applyInputFocus();
        }
      }
    },
    deleteChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.$emit('change', this.chips);
      this.applyInputFocus();
    },
    editChip(chip) {
      let index = this.getIndex(chip);
      if (index >= 0) {
        this.chips.splice(index, 1);
      }
      this.currentChip = chip;
      this.$emit('change', this.chips);
      this.applyInputFocus();
    },
    deleteLastChip() {
      if (!this.currentChip) {
        this.chips.pop();
        this.$emit('change', this.chips);
        this.applyInputFocus();
      }
    },
    getIndex(chip) {
      return this.chips.indexOf(chip);
    }
  },
  watch: {
    value(value) {
      this.selectedChip = value;
    }
  },
  components: {
    'vue-button': Button,
    'vue-chip': Chip,
  }
};
</script>